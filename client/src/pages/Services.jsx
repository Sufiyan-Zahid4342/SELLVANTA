import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreeBackground from '../components/ThreeBackground';
import { services } from '../data/siteData';
import './Services.css';

function Services() {
  return (
    <div className="services-page">
      <section className="page-hero">
        <ThreeBackground variant="services" />
        <div className="page-hero__content container">
          <span className="section-label">Amazon &amp; e-commerce growth</span>
          <motion.h1
            className="page-hero__title "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Practical strategy for ambitious brands.
          </motion.h1>
          <motion.p
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From Amazon account support and product listings to advertising and e-commerce
            storefronts, SELLVANTA helps you build a stronger online business.
          </motion.p>
          <motion.div
            className="page-hero__actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn btn-primary">Discuss Your Goals</Link>
            <a href="#core-services" className="btn btn-outline">Explore Services</a>
          </motion.div>
        </div>
      </section>

      <section id="core-services" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">What we do</span>
            <h2 className="section-title">Services built around your growth.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Bring us a specific challenge or a bigger growth goal. We’ll shape the right mix of
              support for your brand.
            </p>
          </div>
          <div className="grid-3">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                id={`service-${service.id}`}
                className="card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="section-label">{service.id}</span>
                <h3 className="service-title">{service.title}</h3>
                <p>{service.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        border: '1px solid var(--border-gold)',
                        borderRadius: '20px',
                        color: 'var(--gold-light)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Your Brand. Our Strategy. Greater Growth.</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            Let’s talk about your products, your channels, and what growth could look like for you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link to="/about" className="btn btn-outline">About SELLVANTA</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
