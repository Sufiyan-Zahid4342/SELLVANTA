import { motion } from 'framer-motion';
import { LuCompass, LuSearch, LuLightbulb } from 'react-icons/lu';
import ThreeBackground from '../components/ThreeBackground';
import './Approach.css';

const steps = [
  {
    icon: LuCompass,
    title: 'Start with your brand',
    description: 'We learn about your products, your customers, and what you want your business to achieve.',
  },
  {
    icon: LuSearch,
    title: 'Find the opportunity',
    description: 'We look at your marketplace presence and e-commerce experience to identify priorities.',
  },
  {
    icon: LuLightbulb,
    title: 'Build a clear plan',
    description: 'You get considered recommendations and a focused path for moving your growth forward.',
  },
];

function Approach() {
  return (
    <div className="approach-page">
      <section className="page-hero">
        <ThreeBackground variant="approach" />
        <div className="page-hero__content container">
          <span className="section-label">Our approach</span>
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your brand leads the way.
          </motion.h1>
          <motion.p
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SELLVANTA pairs a modern, growth-minded perspective with a strategy grounded in your
            products and business priorities.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="approach-grid">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                className="approach-card card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <Icon className="service-icon" aria-hidden="true" />
                <h2 className="service-title">{title}</h2>
                <p className="approach-card__description">{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Approach;
