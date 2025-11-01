import React, { useState } from 'react'

export default function ProfileViewer({ setMessage }) {
  const [id, setId] = useState('2')
  const [out, setOut] = useState('')

  async function fetchProfile() {
    setMessage('Fetching user profile...')
    try {
      const res = await fetch('/api/user/' + id)
      if (!res.ok) {
        setOut('Error: ' + res.status)
        return
      }
      const j = await res.json()
      setOut(JSON.stringify(j, null, 2))
      setMessage('Profile loaded.')
    } catch (e) {
      setOut('Network error')
      setMessage('Network error')
    }
  }

  return (
    <div>
      <div className="row">
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter user id (e.g. 2)" />
        <button onClick={fetchProfile}>Get Profile</button>
      </div>
      <pre className="output">{out}</pre>
    </div>
  )
}
