import { useState, useEffect } from "react";
import "./HeroBanner.css";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&h=420&fit=crop&q=80",
    alt: "Men Fashion Sale",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1400&h=420&fit=crop&q=80",
    alt: "Women Fashion Sale",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=420&fit=crop&q=80",
    alt: "Women Western Wear",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=420&fit=crop&q=80",
    alt: "Men Casual Wear",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&h=420&fit=crop&q=80",
    alt: "Women Ethnic Wear",
  },
];

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner">
      <div
        className="hero-slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div className="hero-slide" key={slide.id}>
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>


    </section>
  );
}

export default HeroBanner;
