export default function handler(req, res) {
  // Ambil IP asli pengunjung
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  // IP fallback (kalau nggak dapat)
  const clientIp = ip ? ip.trim() : 'unknown';

  // Simpan / hitung aktivitas IP clientIp
  console.log('IP terdeteksi:', clientIp);

  res.json({ ip: clientIp });
}
