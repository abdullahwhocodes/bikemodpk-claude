'use client'
import { useState } from 'react'
import Link from 'next/link'

const categories = [
  'Classics', 'Cafe Racers', 'Scramblers',
  'Trackers', 'Choppers', 'Bobbers', 'Tour Bikes', 'Heavy Bikes'
]

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">

        {/* LOGO */}
        <Link href="/" className="logo">
          BIKEMOD<span>PK</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <Link href="/">Home</Link>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="header-right">
          {/* Dark/Light Toggle */}
          <button
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {menuOpen && (
        <nav className="mobile-nav">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
