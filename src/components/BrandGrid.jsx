import { useRef, useState, useEffect } from 'react'
import Card from './Card'
import './BrandGrid.css'

const getVisible = () => {
  if (window.innerWidth <= 600) return 2
  if (window.innerWidth <= 1024) return 3
  return 6
}

const BrandGrid = ({ title, products }) => {
  const sliderRef = useRef(null)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(getVisible())

  useEffect(() => {
    const onResize = () => setVisible(getVisible())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const totalSlides = Math.ceil(products.length / visible)

  const scrollTo = (index) => {
    const cardWidth = sliderRef.current.offsetWidth / visible
    sliderRef.current.scrollTo({ left: index * cardWidth * visible, behavior: 'smooth' })
    setActive(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % totalSlides
        const cardWidth = sliderRef.current.offsetWidth / visible
        sliderRef.current.scrollTo({ left: next * cardWidth * visible, behavior: 'smooth' })
        return next
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [visible, totalSlides])

  return (
    <section className="brandGrid-section">
      <h2 className="brandGrid-title">{title}</h2>
      <div className="brandGrid" ref={sliderRef}>
        {products.map((p, i) => (
          <div key={i} className="brandGrid-card-wrapper">
            <Card {...p} />
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button key={i} className={`slider-dot${active === i ? ' active' : ''}`} onClick={() => scrollTo(i)} />
        ))}
      </div>
    </section>
  )
}

export default BrandGrid