'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'


export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(false)

    // EmailJS configuration
    const serviceID = 'service_dsuz7di'  // ⚠️ APNI SERVICE ID PASTE KARO
    const templateID = 'template_0josgty'  // ⚠️ APNI TEMPLATE ID PASTE KARO
    const publicKey = '7HdzQxxOKqzTg7mjg'  // ⚠️ APNI PUBLIC KEY PASTE KARO

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'bikemodpk@gmail.com'
    }

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent!', response.status, response.text)
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      })
      .catch((error) => {
        console.error('Email failed:', error)
        alert('Failed to send message. Please try again.')
      })
  }

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="contact-page">
        
        {/* BANNER */}
        <section className="contact-banner">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you</p>
        </section>

        <div className="contact-container">
          
          {/* LEFT SIDE - INFO */}
          <aside className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-block">
              <h3>General Inquiries</h3>
              <p>📧 bikemodpk@gmail.com</p>
              <p>📱 +92 3078988228</p>
            </div>

            <div className="info-block">
              <h3>Advertising & Partnerships</h3>
              <p>📧 bikemodpk@gmail.com</p>
              <p>📱 +92 3078988228</p>
            </div>

            <div className="info-block">
              <h3>Submit Your Build</h3>
              <p>Have a custom build you want to showcase?</p>
              <p>📧 bikemodpk@gmail.com</p>
            </div>

            <div className="info-block">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/bikemodpk?igsh=MWZjaXZiMHh0NGE1OA==" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=61579679754995" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.youtube.com/@BIKEMODPK" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://www.tiktok.com/@bikemodpk?_r=1&_t=ZS-95eJIORN6vq" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>

            <div className="info-block">
              <h3>Location</h3>
              <p>📍 MULTAN, Punjab, Pakistan</p>
            </div>
          </aside>

          {/* RIGHT SIDE - FORM */}
          <section className="contact-form-section">
            <h2>Send Us a Message</h2>
            
            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows="6"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>

            </form>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  )
}