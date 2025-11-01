import React, { useState } from 'react'

export default function UpdateProfile({ onUpdated, setMessage }) {
  const [bio, setBio] = useState('')
  const [role, setRole] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMessage('Updating profile...')
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'TinyTasks' // required header for challenge
        },
        body: JSON.stringify({ bio, role })
      })
      const j = await res.json().catch(() => ({ raw: 'non-json' }))
      if (!res.ok) {
        setMessage('Update failed: ' + (j.error || res.status))
        return
      }
      setMessage('Profile updated successfully!')
      onUpdated(j.user)
    } catch (err) {
      setMessage('Network error')
    }
  }

  return (
    <form onSubmit={submit} className="form-vertical">
      <label>Bio</label>
      <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter bio" />
      <label>Role (try 'admin')</label>
      <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="admin" />
      <button>Update Profile</button>
      <div className="hint small">
        This sends JSON with header <code>X-Requested-With: TinyTasks</code>
      </div>
    </form>
  )
}
