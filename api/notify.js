import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './data.js';

export default async function handler(req, res) {
  try {
    const message = `🚨 Pengunjung baru ke website R_968415!\nIP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengirim pesan', details: err });
  }
}