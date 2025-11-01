/**
 * adminController.js
 * For the CTF: show the second half of the flag when admin access is detected.
 */

function adminPanel(req, res) {
  // existing behavior: admin by role OR header backdoor (for teaching)
  const hdr = req.get('x-admin');
  if ((req.user && req.user.role === 'admin') || hdr === 'true') {
    // Second half of the flag (this intentionally completes the GDGC{...} started in Bob's private post)
    return res.send(`<h1>Admin Panel</h1><pre>-admin-creds-are-to-be-changed}</pre>`);
  }
  res.status(403).send('Forbidden');
}

module.exports = { adminPanel };
