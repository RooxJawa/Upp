// api/unblock.js
const ADMIN_PASSWORD = "R_968415";

import { blockedIPs } from './track.js';

export default function handler(req, res) {
  const { ip, password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, message: 'Password salah' });
  }

  blockedIPs.delete(ip);
  return res.status(200).json({ success: true, message: `IP ${ip} telah dihapus dari blokir.` });
}