const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/db.sqlite');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT, email TEXT, bio TEXT)');
  db.run('CREATE TABLE posts (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, slug TEXT UNIQUE, excerpt TEXT, content_private TEXT)');

  // users: alice (given), bob (new password), admin (new password)
  db.run("INSERT INTO users (username,password,role,email,bio) VALUES ('alice','password123','user','alice@example.com','Alice bio')");
  db.run("INSERT INTO users (username,password,role,email,bio) VALUES ('bob','xyzabcbob','user','bob@example.com','Bob bio')");
  db.run("INSERT INTO users (username,password,role,email,bio) VALUES ('admin','admin@123','admin','admin@example.com','admin bio')");

  // posts: non-sequential ids (1001 = alice, 1002 = bob)
  db.run(`INSERT INTO posts (id, user_id, title, slug, excerpt, content_private) VALUES (1001, 1, 'Alice public post','alice-public','A short excerpt by Alice...','Alice private content - nothing interesting')`);
  // Bob's private contains the first half of the flag
  db.run(`INSERT INTO posts (id, user_id, title, slug, excerpt, content_private) VALUES (1002, 2, 'Bob private diary','bob-diary','A small excerpt of Bob''s diary...','GDGC{you-rocked-idor')`);
});
db.close(() => console.log('Database seeded:', dbPath));
