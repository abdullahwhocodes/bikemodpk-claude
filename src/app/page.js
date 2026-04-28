'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BikeCard from '@/components/BikeCard'
import { supabase } from '@/lib/supabase'

const BIKES_PER_PAGE = 5

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true)
  const [bikes, setBikes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // Dark/Light mode body class
  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  // Bikes fetch karo
  useEffect(() => {
    fetchBikes()
    
    // ✅ REALTIME SUBSCRIPTION
    const channel = supabase
      .channel('bikes-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'bikes' 
        },
        (payload) => {
          console.log('Bike change detected:', payload)
          fetchBikes() // Auto-refresh when admin makes changes
        }
      )
      .subscribe()

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentPage])

  const fetchBikes = async () => {
    setLoading(true)
    
    const from = (currentPage - 1) * BIKES_PER_PAGE
    const to = from + BIKES_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from('bikes')
      .select('*', { count: 'exact' })
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) {
      setBikes(data)
      setTotalPages(Math.ceil(count / BIKES_PER_PAGE))
    }
    setLoading(false)
  }

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-container">
        <div className="hero-text">
          <h1>BUILD. <span>RIDE.</span> REPEAT.</h1>
          <p>Pakistan ka #1 Bike Modification Platform</p>
        </div>

        {/* BIKES GRID */}
        {loading ? (
          <div className="loading">Loading builds...</div>
        ) : (
          <div className="bikes-grid">
            {bikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="page-btn"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}