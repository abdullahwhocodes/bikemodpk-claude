'use client'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SubmitPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    builderName: '',
    builderInstagram: '',
    builderEmail: '',
    bikeTitle: '',
    bikeModel: '',
    category: 'cafe-racers',
    description: '',
    additionalInfo: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    setPhotos(files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(false)

    const serviceID = 'service_dsuz7di'
    const templateID = 'template_xyxt3j3'
    const publicKey = '7HdzQxxOKqzTg7mjg'

    // Photos ki list banao
    const photosList = photos.map(f => f.name).join(', ')

    const templateParams = {
      builder_name: formData.builderName,
      builder_instagram: formData.builderInstagram,
      builder_email: formData.builderEmail,
      bike_title: formData.bikeTitle,
      bike_model: formData.bikeModel,
      category: formData.category,
      description: formData.description,
      additional_info: formData.additionalInfo,
      photos_count: photos.length,
      photos_list: photosList,
      to_email: 'bikemodpk@gmail.com'
    }

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Submission sent!', response)
        setSubmitted(true)
        setFormData({
          builderName: '',
          builderInstagram: '',
          builderEmail: '',
          bikeTitle: '',
          bikeModel: '',
          category: 'cafe-racers',
          description: '',
          additionalInfo: ''
        })
        setPhotos([])
        setTimeout(() => setSubmitted(false), 5000)
      })
      .catch((error) => {
        console.error('Submission failed:', error)
        alert('Failed to submit. Please try again.')
      })
  }

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="submit-page">
        
        {/* BANNER */}
        <section className="submit-banner">
          <h1>Submit Your Build</h1>
          <p>Share your custom bike with the community</p>
        </section>

        <div className="submit-container">
          
          {/* LEFT SIDE - GUIDELINES */}
          <aside className="submit-guidelines">
            <h2>Submission Guidelines</h2>
            
            <div className="guideline-block">
              <h3>What We're Looking For</h3>
              <ul>
                <li>Custom motorcycle builds and modifications</li>
                <li>Cafe racers, scramblers, trackers, choppers, classics</li>
                <li>Unique and creative designs</li>
                <li>Quality photos of your build</li>
              </ul>
            </div>

            <div className="guideline-block">
              <h3>Photo Requirements</h3>
              <ul>
                <li>High-resolution images (minimum 1200px width)</li>
                <li>Clear, well-lit photos</li>
                <li>Multiple angles of the bike</li>
                <li>Detail shots of custom parts</li>
              </ul>
            </div>

            <div className="guideline-block">
              <h3>What Happens Next?</h3>
              <p>
                Once you submit your build, our team will review it. If approved, your bike will be featured on BikeMod PK and shared across our social media platforms.
              </p>
              <p>
                We aim to respond within 3-5 business days.
              </p>
            </div>

            <div className="guideline-block">
              <h3>Need Help?</h3>
              <p>
                If you have questions about submitting your build, contact us at:
              </p>
              <p className="contact-link">📧 bikemodpk@gmail.com</p>
            </div>
          </aside>

          {/* RIGHT SIDE - FORM */}
          <section className="submit-form-section">
            <h2>Build Submission Form</h2>
            
            {submitted && (
              <div className="success-message">
                ✓ Build submitted successfully! We'll review it and get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="submit-form">
              
              <div className="form-section-title">Builder Information</div>

              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={formData.builderName}
                  onChange={(e) => setFormData({...formData, builderName: e.target.value})}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Instagram Handle</label>
                <input
                  type="text"
                  value={formData.builderInstagram}
                  onChange={(e) => setFormData({...formData, builderInstagram: e.target.value})}
                  placeholder="@yourhandle (optional)"
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.builderEmail}
                  onChange={(e) => setFormData({...formData, builderEmail: e.target.value})}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-section-title">Bike Information</div>

              <div className="form-group">
                <label>Build Title *</label>
                <input
                  type="text"
                  value={formData.bikeTitle}
                  onChange={(e) => setFormData({...formData, bikeTitle: e.target.value})}
                  required
                  placeholder="e.g., 'The Street Tracker' or 'Black Beauty Cafe'"
                />
              </div>

              <div className="form-group">
                <label>Bike Model & Year *</label>
                <input
                  type="text"
                  value={formData.bikeModel}
                  onChange={(e) => setFormData({...formData, bikeModel: e.target.value})}
                  required
                  placeholder="e.g., Honda CG 125 (2015)"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="cafe-racers">Cafe Racer</option>
                  <option value="scramblers">Scrambler</option>
                  <option value="trackers">Tracker</option>
                  <option value="choppers">Chopper</option>
                  <option value="classics">Classic</option>
                  <option value="cruisers">Cruiser</option>
                  <option value="heavy-bikes">Heavy Bike</option>
                </select>
              </div>

              <div className="form-group">
                <label>Build Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="6"
                  placeholder="Tell us about your build — what inspired it, what modifications you made, any challenges you faced..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Parts & Modifications</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  rows="4"
                  placeholder="List any custom parts, modifications, or special features (optional)"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Bike Photos *</label>
                <p className="field-hint">Upload 3-10 high-quality photos of your build</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  required
                  className="file-input"
                />
                {photos.length > 0 && (
                  <div className="file-preview-list">
                    <strong>Selected: {photos.length} photo(s)</strong>
                    <ul>
                      {photos.map((file, idx) => (
                        <li key={idx}>📷 {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-note">
                <strong>Note:</strong> Your photos will be uploaded along with this form. We'll review your submission and contact you via email within 3-5 business days.
              </div>

              <button type="submit" className="submit-btn">
                Submit Your Build
              </button>

            </form>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  )
}