import React, { useState, useEffect } from 'react'

export default function PostViewer({ target, setMessage }) {
  // target can be slug (string) or { id: 1001 } or number
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!target) return
    setPost(null); setError(null)
    async function load() {
      try {
        if (typeof target === 'number' || /^\d+$/.test(String(target))) {
          setMessage('Loading post by id...')
          const res = await fetch('/api/post?id=' + encodeURIComponent(target))
          if (!res.ok) { setError('Not found'); setMessage(''); return }
          const j = await res.json()
          setPost({ title: j.post.title, content_private: j.post.content_private })
          setMessage('Loaded private content (by id)')
        } else {
          setMessage('Loading post by slug...')
          const res = await fetch('/api/post/slug/' + encodeURIComponent(target))
          if (!res.ok) { setError('Not found'); setMessage(''); return }
          const j = await res.json()
          setPost({ title: j.post.title, excerpt: j.post.excerpt })
          setMessage('Loaded excerpt (by slug)')
        }
      } catch (e) {
        setError('Network error')
        setMessage('')
      }
    }
    load()
  }, [target])

  if (!target) return null
  return (
    <div className="card">
      <h3>Post viewer</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      {post ? (
        <>
          <h4>{post.title}</h4>
          {post.content_private ? (
            <pre>{post.content_private}</pre>
          ) : (
            <p className="muted">{post.excerpt}</p>
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}
