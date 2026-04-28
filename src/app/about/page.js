'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="about-page">
        
        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="about-hero-content">
            <p className="about-label">Introduction</p>
            <h1>About BikeMod PK</h1>
            <p className="about-tagline">Built for Riders. Driven by Passion.</p>
          </div>
          <div className="about-hero-image">
            <img src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800" alt="Bike" />
          </div>
        </section>

        {/* INTRO TEXT */}
        <section className="about-intro">
          <h2>About BikeMod PK</h2>
          <p>
            BikeMod PK is a modern digital platform built for motorcycle enthusiasts and custom bike builders across Pakistan. Our goal is to create a dedicated space where riders can showcase their creativity, explore new ideas, and connect with a growing community of like-minded individuals.
          </p>
          <p>
            Motorcycle modification is rapidly gaining popularity in Pakistan, yet there has been a lack of a centralized platform where builders and enthusiasts can share their work and find inspiration. BikeMod PK aims to bridge this gap by providing a user-friendly and visually engaging environment for the biking community.
          </p>
        </section>

        {/* MISSION BOX */}
        <section className="mission-box">
          <div className="mission-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mission-content">
            <h3>Mission</h3>
            <p>
              Empowering Pakistan's bike culture, creativity, and community. Our community aims to bridge the gap for sharing builds, reviews, customization, and finding inspiration.
            </p>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Share Builds</h3>
              <p>Share your custom bike builds and modifications with the community.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Discover Mods</h3>
              <p>Discover unique designs and ideas from other passionate riders.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Connect with Riders</h3>
              <p>Engage with the community through interactions and valuable feedback.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Explore Trends</h3>
              <p>Stay updated with the latest trends in Pakistan's bike scene.</p>
            </div>

          </div>
        </section>

        {/* COMMUNITY SECTION */}
        <section className="community-section">
          <h2>A Growing Community</h2>
          <p>
            BikeMod PK is more than just a website — it is a community driven by passion for bikes and the art of modification. We believe in empowering Pakistan's bike culture by giving it a strong digital presence and encouraging creativity, innovation, and collaboration among enthusiasts.
          </p>
        </section>

        {/* FUTURE VISION */}
        <section className="vision-section">
          <p className="vision-label">Future Vision</p>
          <h2>Looking Ahead: Our Future Vision</h2>
          <p className="vision-subtitle">Upcoming features and roadmap</p>
          
          <div className="vision-grid">
            
            <div className="vision-card">
              <div className="vision-icon">🛒</div>
              <h3>Dedicated Marketplace</h3>
              <p>Connect buyers and sellers with an exclusive parts marketplace.</p>
            </div>

            <div className="vision-card">
              <div className="vision-icon">🎯</div>
              <h3>Community-Driven Events</h3>
              <p>Organizing local meetups and community riding events across Pakistan.</p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}