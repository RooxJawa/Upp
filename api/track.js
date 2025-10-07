// api/track.js
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './data.js';

const ipAccessCount = new Map();
const blockedIPs = new Set();

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Jika IP sudah diblokir
  if (blockedIPs.has(ip)) {
    return res.status(403).json({ blocked: true, message: 'IP diblokir karena aktivitas mencurigakan.' });
  }

  // Hitung akses
  const count = (ipAccessCount.get(ip) || 0) + 1;
  ipAccessCount.set(ip, count);

  // Kirim notifikasi saat mendeteksi aktivitas
  if (count === 1 || count === 10 || count === 20) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `🚨 Aktivitas terdeteksi dari IP: ${ip}\nTotal hit: ${count}`
      })
    });
  }

  // Blokir otomatis jika hit mencapai 20
  if (count >= 20) {
    blockedIPs.add(ip);
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `⛔ IP ${ip} telah diblokir otomatis karena melebihi 20 request`
      })
    });
    return res.status(403).json({ blocked: true, message: 'IP diblokir otomatis.' });
  }

  res.status(200).json({ blocked: false, hits: count });
}