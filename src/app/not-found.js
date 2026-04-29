'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Yeh page exist nahi karta. Ghar wapis jao!</p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}
