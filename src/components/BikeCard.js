'use client'
import { useState } from 'react'
import Link from 'next/link'
import SliderComparison from './SliderComparison'

export default function BikeCard({ bike }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bike-card-wrapper">
      <div className="bike-card">
        
        {/* SLIDER COMPARISON */}
        <SliderComparison 
          stockImage={bike.stock_image} 
          modifiedImage={bike.modified_image}
        />

        {/* INFO */}
        <div className="bike-info">
          <h3>{bike.title}</h3>
          {bike.brand && (
            <p className="bike-brand-tag">{bike.brand.toUpperCase()}</p>
          )}
          <p className="bike-desc">{bike.description?.substring(0, 120)}...</p>
          
          <Link 
            href={`/build/${bike.id}`}
            className="witness-btn"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? 'Inspect the Build' : `Witness ${bike.title}`}
          </Link>
        </div>

      </div>
      <div className="build-divider"></div>
    </div>
  )
}