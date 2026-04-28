'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TeamPage() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="team-page">
        
        {/* BANNER */}
        <section className="team-banner">
          <h1>The BikeMod PK Team</h1>
          <p>Meet the people behind the platform</p>
        </section>

        {/* FOUNDER SECTION */}
        <section className="team-content">
          
          <div className="team-member">
            <div className="member-image">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Abdullah Junaid" />
            </div>
            <div className="member-info">
              <h3>Founder</h3>
              <h2>Abdullah Junaid</h2>
            </div>
          </div>

          <div className="founder-story">
            <h2>Founder's Story</h2>
            
            <p>
              I grew up in Khanewal, where my interest in bikes was always strong, but the exposure to unique builds and creative modifications was very limited. I was always curious and passionate about bikes, but there simply wasn't much to see or learn from locally.
            </p>

            <p>
              One of the most memorable moments in my journey was when I first learned how to ride a bike — taught by my younger brother. It was a Honda Pridor 100cc (2018, black), and that experience marked the beginning of something more than just riding.
            </p>

            <p>
              Later, during my university years, my father gifted me my own bike — a Honda Pridor 100cc (2018, red). That's when my interest turned into a deeper passion. I started exploring, researching, and learning everything I could about bike modifications.
            </p>

            <p>
              I spent a lot of time searching online for inspiration — different builds, ideas, and styles — but everything felt scattered. There was no single place where someone like me could find everything in one place.
            </p>

            <p className="highlight">
              That's exactly why I created BikeMod PK.
            </p>

            <p>
              This platform is built for people who share the same passion — riders who want to build, modify, and express themselves through their bikes, but don't always have access to the right resources or community.
            </p>

            <p className="closing">
              BikeMod PK is not just a project. It's built from real experience, real curiosity, and a genuine love for bikes.
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
}