'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CommentSection from '@/components/CommentSection'
import { supabase } from '@/lib/supabase'

export default function BuildDetailPage() {
  const params = useParams()
  const [darkMode, setDarkMode] = useState(true)
  const [bike, setBike] = useState(null)
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  useEffect(() => {
    if (params.id) {
      fetchBuildData()
    }
  }, [params.id])

  const fetchBuildData = async () => {
    setLoading(true)

    // Debug bikeId
    console.log('bikeId type:', typeof params.id, params.id)

    // Bike fetch
    const { data: bikeData } = await supabase
      .from('bikes')
      .select('*')
      .eq('id', params.id)
      .single()

    // Parts fetch
    const { data: partsData } = await supabase
      .from('parts')
      .select('*')
      .eq('bike_id', params.id)
      .order('created_at', { ascending: true })

    setBike(bikeData)
    setParts(partsData || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="loading">Loading build...</div>
      </div>
    )
  }

  if (!bike) {
    return (
      <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="loading">Build not found</div>
      </div>
    )
  }

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="build-detail">
        
        {/* HERO IMAGE */}
        <div className="build-hero">
          <img src={bike.modified_image} alt={bike.title} />
        </div>

        {/* BUILDER INFO */}
        <div className="builder-info">
          Built by <strong>{bike.builder_name}</strong> • 
          <a href={`https://instagram.com/${bike.builder_insta}`} target="_blank">
            @{bike.builder_insta}
          </a>
          {bike.brand && (
            <> • <span className="bike-brand">{bike.brand.toUpperCase()}</span></>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="build-description">
          <h1>{bike.title}</h1>
          <p>{bike.description}</p>
        </div>

        {/* PARTS SECTION */}
        {parts.length > 0 && (
          <div className="parts-section">
            <h2>Parts & Mods</h2>
            {parts.map(part => (
              <div key={part.id} className="part-card">
                {part.image && (
                  <img src={part.image} alt={part.name} className="part-image" />
                )}
                <h3>{part.name}</h3>
                <p>{part.description}</p>
                {part.buy_link && (
                  <a 
                    href={part.buy_link} 
                    target="_blank" 
                    className="buy-btn"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIDEO SECTION */}
        {bike.video_url && (
          <div className="video-section">
            <h2>Build Video</h2>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="500"
                src={bike.video_url}
                title="Build Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* COMMENTS */}
        <CommentSection bikeId={params.id} />

      </main>

      <Footer />
    </div>
  )
}