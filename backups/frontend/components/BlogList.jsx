import React, { useState, useEffect } from 'react'

export default function BlogList({ onOpen, setMessage }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      setMessage('Loading posts...')
      try {
        const res = await fetch('/api/posts')
        const j = await res.json()
        setPosts(j.posts || [])
        setMessage('')
      } catch (e) {
        setMessage('Failed to load posts')
      }
    }
    load()
  }, [])

  return (
    <div>
      <h3>Recent posts</h3>
      {posts.length === 0 && <div>No posts</div>}
      {posts.map((p, i) => (
        <div key={i} className="card" style={{ marginBottom: 8 }}>
          <h4>{p.title}</h4>
          <p className="muted">{p.excerpt}</p>
          {/* If the API returned an id (meaning logged-in user's post), include a button to fetch by id (for dev). 
              Otherwise, only allow opening by slug (which shows excerpt only). */}
          {p.id ? (
            <div>
              <small className="muted">[your post]</small>
              <button onClick={() => onOpen(p.slug)}>Open (by slug)</button>
              <button onClick={() => onOpen(p.id, true)}>Open private (by id)</button>
            </div>
          ) : (
            <div>
              <button onClick={() => onOpen(p.slug)}>Open (by slug)</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
