import { useRef, useState, useEffect } from 'react'
import Card from './Card'
import './ProductGrid.css'

const VISIBLE = 5

const ProductGrid = ({ title, products }) => {
  const sliderRef = useRef(null)
  const [active, setActive] = useState(0)

  const totalSlides = Math.ceil(products.length / VISIBLE)

  const scrollTo = (index) => {
    const cardWidth = sliderRef.current.offsetWidth / VISIBLE
    sliderRef.current.scrollTo({ left: index * cardWidth * VISIBLE, behavior: 'smooth' })
    setActive(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % totalSlides
        const cardWidth = sliderRef.current.offsetWidth / VISIBLE
        sliderRef.current.scrollTo({ left: next * cardWidth * VISIBLE, behavior: 'smooth' })
        return next
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="productGrid-section">
      <h2 className="productGrid-title">{title}</h2>
      <div className="productGrid" ref={sliderRef}>
        {products.map((p, i) => (
          <Card key={i} {...p} />
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

export default ProductGrid