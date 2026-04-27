'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Simple admin check
    if (credentials.username === 'admin' && credentials.password === 'bikemodpk2026') {
      localStorage.setItem('isAdmin', 'true')
      // Small delay before redirect
      setTimeout(() => {
        router.push('/admin')
      }, 100)
    } else {
      setError('Invalid credentials!')
    }
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <h1>ADMIN LOGIN</h1>
        <p className="login-subtitle">BikeModPK Admin Panel</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="login-input"
          />
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
        </form>

        <p className="login-hint">
          Demo: admin / bikemodpk2026
        </p>
      </div>
    </div>
  )
}