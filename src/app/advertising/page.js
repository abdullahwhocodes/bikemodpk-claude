'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdvertisingPage() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="advertising-page">
        
        {/* HERO SECTION */}
        <section className="ad-hero">
          <div className="ad-hero-overlay"></div>
          <div className="ad-hero-content">
            <h1>Advertise With BikeMod PK</h1>
            <p>Reach a growing community of bike enthusiasts across Pakistan.</p>
          </div>
        </section>

        {/* INTRO */}
        <section className="ad-intro">
          <p className="ad-intro-text">
            BikeMod PK is more than just a website — it is a growing digital ecosystem powered by a strong presence across web and social media. From high-traffic pages to engaging short-form content, we help brands connect directly with riders who are passionate about bikes, upgrades, and performance.
          </p>
        </section>

        {/* WHY PARTNER */}
        <section className="why-partner">
          <h2>Why Partner With Us</h2>
          <p className="section-subtitle">We don't just display ads — we create exposure.</p>
          
          <div className="partner-content">
            <p>BikeMod PK offers exclusive advertising opportunities to connect your brand with our dedicated and highly targeted audience of motorcycle enthusiasts across Pakistan, providing unparalleled exposure on both our modern website and thriving social media platforms.</p>
            
            <div className="partner-points">
              <div className="partner-point">
                <span className="point-icon">🎯</span>
                <span>Targeted bike audience</span>
              </div>
              <div className="partner-point">
                <span className="point-icon">📱</span>
                <span>Exposure on website and social platforms</span>
              </div>
              <div className="partner-point">
                <span className="point-icon">🚀</span>
                <span>Growing and engaged community</span>
              </div>
            </div>
          </div>
        </section>

        {/* ADVERTISING OPTIONS */}
        <section className="ad-options">
          <h2>Advertising Options</h2>
          
          <div className="options-grid">
            
            <div className="option-card">
              <div className="option-icon">🎪</div>
              <h3>Banner placements</h3>
              <p>Maximum visibility on key pages with premium banner positions.</p>
            </div>

            <div className="option-card">
              <div className="option-icon">📢</div>
              <h3>In-feed promotions</h3>
              <p>Seamlessly integrated promotions within bike posts and content.</p>
            </div>

            <div className="option-card">
              <div className="option-icon">⭐</div>
              <h3>Featured listings</h3>
              <p>Highlight your brand or product at the top of relevant sections.</p>
            </div>

            <div className="option-card">
              <div className="option-icon">📲</div>
              <h3>Social media promotions</h3>
              <p>Reach thousands through engaging posts, reels, and stories.</p>
            </div>

          </div>

          <p className="ad-options-tagline">Built for brands that want real visibility in the bike community.</p>
        </section>

        {/* IDEAL FOR */}
        <section className="ideal-for">
          <h2>Built for Bike Brands</h2>
          <p className="section-subtitle">BikeMod PK is ideal for:</p>
          
          <div className="ideal-grid">
            <div className="ideal-item">🔧 Accessories and modification brands</div>
            <div className="ideal-item">🛠️ Workshops and service providers</div>
            <div className="ideal-item">🏍️ Dealerships and resellers</div>
            <div className="ideal-item">🧥 Riding gear companies</div>
          </div>

          <p className="ideal-tagline">If your business is related to motorcycles, this is where your audience is.</p>
        </section>

        {/* CTA SECTION */}
        <section className="ad-cta">
          <h2>Call To Action</h2>
          <p>Let's grow together. We work with brands that want more than just impressions — we focus on real engagement and long-term visibility.</p>
          
          <button className="cta-button">Contact Now</button>
          
          <div className="contact-info">
            <div className="contact-item">
              <span>📧</span> bikemodpk@gmail.com
            </div>
            <div className="contact-item">
              <span>📱</span> +92 3078988228
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}