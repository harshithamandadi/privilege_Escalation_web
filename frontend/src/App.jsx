import React, { useState } from 'react'
import Login from './components/Login'
import ProfileViewer from './components/ProfileViewer'
import BlogList from './components/BlogList'
import PostViewer from './components/PostViewer'
import './styles/app.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [target, setTarget] = useState(null)

  return (
    <div className="container">
      <h1>TinyTasks Blog - Priv Esc CTF</h1>
      <p className="muted">Find GDGC flags by reasoning about ownership and hidden endpoints.</p>

      <section className="card">
        <h2>Login</h2>
        <Login onLogin={(u) => setUser(u)} setMessage={setMessage} />
        <div className="status">
          {user ? <strong>Logged in as {user.username} ({user.role})</strong> : <em>Not logged in</em>}
        </div>
      </section>

      <section className="card">
        <h2>Blog</h2>
        <BlogList onOpen={(v) => setTarget(v)} setMessage={setMessage} />
        <PostViewer target={target} setMessage={setMessage} />
      </section>

      {/* <!-- Profile update UI removed to increase difficulty --> */}

      <section className="card">
        <h2>Admin Panel</h2>
        <a href="/admin" target="_blank" rel="noreferrer">Open /admin</a>
      </section>

      <footer className="card small muted">
        <div>{message}</div>
      </footer>
    </div>
  )
}
