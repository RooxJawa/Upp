const TELEGRAM_TOKEN = '8286555678:AAHD-bxh4JXeFiptzluFwOIMoa7k2I6JNiI';
const CHAT_ID = '8404908109';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  // Kirim ke Telegram
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `🔔 IP Terdeteksi: ${ip}`
    })
  });

  res.status(200).json({ detected_ip: ip });
}
