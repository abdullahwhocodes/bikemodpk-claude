'use client'
import { useState } from 'react'

export default function SliderComparison({ stockImage, modifiedImage }) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSlider = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  return (
    <div 
      className="slider-comparison"
      onMouseMove={handleSlider}
      onTouchMove={(e) => {
        const touch = e.touches[0]
        const rect = e.currentTarget.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.min(Math.max(percentage, 0), 100))
      }}
    >
      {/* MODIFIED IMAGE (TOP LAYER) */}
      <div className="comparison-layer">
        <img src={modifiedImage || '/placeholder.jpg'} alt="Modified" />
        <div className="label label-left">MODIFIED</div>
      </div>

      {/* STOCK IMAGE (BOTTOM LAYER) */}
      <div 
        className="comparison-layer"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={stockImage || '/placeholder.jpg'} alt="Stock" />
        <div className="label label-right">STOCK</div>
      </div>

      {/* SLIDER HANDLE */}
      <div 
        className="slider-handle"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-line"></div>
        <div className="slider-circle">⇔</div>
      </div>
    </div>
  )
}