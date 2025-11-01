const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = path.join(__dirname, '../../db/db.sqlite');

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// login
async function login(req, res) {
  const { username, password } = req.body;
  const db = getDb();
  db.get('SELECT id, username, password, role FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row || row.password !== password) return res.status(401).json({ error: 'invalid credentials' });
    const userObj = { id: row.id, username: row.username, role: row.role };
    res.cookie('auth', encodeURIComponent(JSON.stringify(userObj)), { httpOnly: false });
    res.json({ ok: true, user: userObj });
  });
}

// IDOR — get any user profile
async function getUser(req, res) {
  const id = req.params.id;
  const db = getDb();
  db.get('SELECT id, username, email, bio FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(404).json({ error: 'not found' });
    // Intentionally missing ownership check
    res.json({ user: row });
  });
}

// vulnerable update
async function updateProfile(req, res) {
  if (!req.user) return res.status(401).json({ error: 'login required' });

  // Require JSON + X-Requested-With header
  const ct = req.get('content-type') || '';
  const hdr = req.get('x-requested-with') || '';
  if (!ct.includes('application/json') || hdr !== 'TinyTasks') {
    return res.status(400).json({ error: 'Must send JSON with X-Requested-With: TinyTasks' });
  }

  const { bio, role } = req.body;
  const db = getDb();
  db.get('SELECT id, username, role FROM users WHERE id = ?', [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    const newRole = role || row.role;
    const newBio = bio || null;
    db.run('UPDATE users SET role=?, bio=? WHERE id=?', [newRole, newBio, req.user.id], function (e) {
      if (e) return res.status(500).json({ error: 'db error' });
      const newUser = { id: row.id, username: row.username, role: newRole };
      res.cookie('auth', encodeURIComponent(JSON.stringify(newUser)), { httpOnly: false });
      res.json({ ok: true, user: newUser });
    });
  });
}

module.exports = { login, getUser, updateProfile };

