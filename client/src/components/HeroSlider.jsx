import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroTaglines } from '../data/siteData';
import './HeroSlider.css';

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroTaglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className="hero-slider__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
        >
          {heroTaglines[index]}
        </motion.h1>
      </AnimatePresence>
      <div className="hero-slider__dots">
        {heroTaglines.map((_, i) => (
          <button
            key={i}
            className={`hero-slider__dot ${i === index ? 'hero-slider__dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
