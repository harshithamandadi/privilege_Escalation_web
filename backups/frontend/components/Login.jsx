import React, { useState } from 'react'

export default function Login({ onLogin, setMessage }) {
  // start with empty fields
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMessage('Logging in...')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const j = await res.json()
      if (!res.ok) {
        setMessage('Login failed: ' + (j.error || res.status))
        return
      }
      setMessage('Login successful!')
      onLogin(j.user)
    } catch (err) {
      setMessage('Network error')
    }
  }

  return (
    <form onSubmit={submit} className="form-inline">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        autoComplete="username"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        autoComplete="current-password"
      />

      <button>Login</button>
    </form>
  )
}
