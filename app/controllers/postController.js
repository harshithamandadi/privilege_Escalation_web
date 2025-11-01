// app/controllers/postController.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = path.join(__dirname, '../../db/db.sqlite');

function getDb() { return new sqlite3.Database(DB_PATH); }

// GET /api/posts
// If logged in, return up to 2 full posts belonging to req.user (id, title, slug, excerpt).
// If not logged in, return public list of slugs + excerpts only (no ids).
function listPosts(req, res) {
  const db = getDb();
  if (req.user && req.user.id) {
    // Return only the posts owned by the logged in user (limit 2)
    db.all('SELECT id, user_id, title, slug, excerpt FROM posts WHERE user_id = ? ORDER BY id ASC LIMIT 2', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: 'db error' });
      return res.json({ posts: rows.map(r => ({ id: r.id, title: r.title, slug: r.slug, excerpt: r.excerpt })) });
    });
  } else {
    // Public view: return only slug + excerpt (no ids)
    // For anonymous visitors, show only public slugs and excerpts — no owner-only data
db.all(
  "SELECT slug, title, excerpt FROM posts WHERE user_id = 1 ORDER BY id ASC LIMIT 5",
  [],
  (err, rows) => {
    if (err) return res.status(500).json({ error: 'db error' });
    // No internal ids or private content exposed here
    res.json({
      posts: rows.map((r) => ({
        title: r.title,
        slug: r.slug,
        excerpt: r.excerpt,
      })),
    });
  }
);
  }
}

// GET /api/post/slug/:slug  => returns excerpt and metadata only (no private content)
function getPostBySlug(req, res) {
  const slug = req.params.slug;
  const db = getDb();
  db.get('SELECT id, user_id, title, slug, excerpt FROM posts WHERE slug = ?', [slug], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(404).json({ error: 'not found' });
    // Only return excerpt/metadata, no private content
    res.json({ post: { title: row.title, slug: row.slug, excerpt: row.excerpt } });
  });
}

// VULNERABLE: hidden endpoint GET /api/post?id=<id>
// Returns full private content without ownership check (IDOR)
// This endpoint intentionally exists but uses non-sequential ids (1001,1002) to raise difficulty
function getPostById(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'missing id' });
  const db = getDb();
  db.get('SELECT id, user_id, title, slug, excerpt, content_private FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(404).json({ error: 'not found' });
    // INTENTIONAL: no ownership check — returns private content
    res.json({ post: { id: row.id, title: row.title, slug: row.slug, content_private: row.content_private } });
  });
}

module.exports = { listPosts, getPostBySlug, getPostById };
