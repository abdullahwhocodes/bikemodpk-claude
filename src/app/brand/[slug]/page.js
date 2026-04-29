'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BikeCard from '@/components/BikeCard'
import { supabase } from '@/lib/supabase'

const BIKES_PER_PAGE = 5

export default function BrandPage() {
  const params = useParams()
  const [darkMode, setDarkMode] = useState(true)
  const [bikes, setBikes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light'
  }, [darkMode])

  useEffect(() => {
    if (params.slug) {
      fetchBikes()
    }
  }, [params.slug, currentPage])

  const fetchBikes = async () => {
    setLoading(true)
    
    const from = (currentPage - 1) * BIKES_PER_PAGE
    const to = from + BIKES_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from('bikes')
      .select('*', { count: 'exact' })
      .eq('brand', params.slug)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) {
      setBikes(data)
      setTotalPages(Math.ceil(count / BIKES_PER_PAGE))
    }
    setLoading(false)
  }

  const brandTitle = params.slug
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-container">
        <div className="category-header">
          <h1>{brandTitle}</h1>
          <p>{bikes.length > 0 ? `${bikes.length} builds from this brand` : 'No builds yet'}</p>
        </div>

        {loading ? (
          <div className="loading">Loading builds...</div>
        ) : bikes.length === 0 ? (
          <div className="no-builds">
            <p>Is brand ki abhi koi bike nahi hai.</p>
          </div>
        ) : (
          <>
            <div className="bikes-grid">
              {bikes.map(bike => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>

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
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
