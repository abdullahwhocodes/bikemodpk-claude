'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="policy-page">
        
        {/* BANNER */}
        <section className="policy-banner">
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us</p>
        </section>

        {/* CONTENT */}
        <section className="policy-content">
          
          <p className="policy-intro">
            At BikeMod PK, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any details you provide when creating an account, uploading content, or contacting us.
          </p>
          <p>
            We may also collect non-personal information such as browser type, device information, and usage data to improve our platform.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Allow you to upload and share bike-related content</li>
            <li>Improve our website and user experience</li>
            <li>Communicate with you regarding updates or support</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            BikeMod PK may use cookies to enhance your browsing experience. Cookies help us understand user behavior and improve website performance.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We do not sell or trade your personal information. We may share limited data with trusted services (such as analytics or advertising partners) to operate and improve our platform.
          </p>

          <h2>Data Security</h2>
          <p>
            We take reasonable measures to protect your information, but please note that no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can contact us at any time regarding your data.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the privacy practices of those sites.
          </p>

          <h2>Third-Party Transactions Disclaimer</h2>
          <p>
            BikeMod PK is a platform that allows users to connect and share motorcycle-related content, including parts and accessories for sale.
          </p>
          <p>
            We do not own, sell, or directly handle any products listed on the platform. All transactions take place directly between buyers and sellers.
          </p>
          <p>
            BikeMod PK is not responsible for the quality, safety, authenticity, or delivery of any products listed by users. Any disputes, claims, or issues must be resolved directly between the buyer and the seller.
          </p>
          <p>
            Users are strongly advised to verify sellers and products before making any purchase.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
          <p className="contact-details">
            📧 Email: bikemodpk@gmail.com<br/>
            📱 WhatsApp: +92 3078988228
          </p>

        </section>

      </main>

      <Footer />
    </div>
  )
}