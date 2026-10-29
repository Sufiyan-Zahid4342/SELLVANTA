import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuStar, LuArrowRight } from 'react-icons/lu';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__inner">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LuStar className="hero__badge-icon" aria-hidden="true" />
            AMAZON & E-COMMERCE GROWTH
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Sell{' '}
            <span className="hero__title-gradient">More.</span> Grow
            <br />
            Faster.
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            SELLVANTA helps brands sell more, grow faster, and build a stronger online business with thoughtful Amazon and e-commerce strategy.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Link to="/contact" className="hero__btn hero__btn--primary">
              <span className="hero__btn-text">
                Let's Grow
                <LuArrowRight className="hero__btn-icon" aria-hidden="true" />
              </span>
              <span className="hero__btn-shine" />
            </Link>
            <Link to="/about" className="hero__btn hero__btn--secondary">
              <span className="hero__btn-text">              Meet SELLVANTA</span>
              <span className="hero__btn-shine" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
