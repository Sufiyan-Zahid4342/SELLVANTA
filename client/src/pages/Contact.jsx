import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import ThreeBackground from '../components/ThreeBackground';
import { contactInfo, footer } from '../data/siteData';
import './Contact.css';

function Contact() {
  const addressLink = footer.getInTouch[0].href;

  return (
    <div className="contact-page">
      <section className="page-hero">
        <ThreeBackground variant="contact" />
        <div className="page-hero__content container flex justify-center flex-col items-center">
          <div className="t-section__badge letterspacing flex gap-2">
            <FaMapMarkerAlt aria-hidden="true" />
            <span>Connect with SELLVANTA</span>
          </div>
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let’s talk about growing your brand.
          </motion.h1>
          <motion.p
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tell us what you sell and where you want to go. We’ll start with your goals and explore
            how Amazon and e-commerce strategy can help.
          </motion.p>
          <motion.div
            className="page-hero__actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#contact-form" className="btn btn-primary">Start a Conversation</a>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </motion.div>
        </div>
      </section>

      <section className="section contact-info-section">
        <div className="container">
          <div
            className="contact-info__grid"
            style={{ gridTemplateColumns: 'minmax(0, 680px)', justifyContent: 'center' }}
          >
            <motion.div
              className="contact-info__card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <FaMapMarkerAlt className="contact-info__icon" aria-hidden="true" />
              <h3>Our Location</h3>
              <p>{contactInfo.address}</p>
              <a className="contact-info__hint text-end" href={addressLink} target="_blank" rel="noreferrer">
                View on map
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="section contact-section">
        <div className="container">
          <div className="contact-form-section">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="t-section__badge1 letterspacing">LET’S BUILD GREATER GROWTH</span>
              <h2 className="section-title mt-4">
                Your Brand. <span className="gradient-text">Our Strategy.</span>
              </h2>
              <p className="section-subtitle">
                Share a little about your products, sales channels, and goals. We’ll use that context
                to understand what support could make sense for your business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section contact-location">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="t-section__badge letterspacing flex gap-2">
            <FaMapMarkerAlt aria-hidden="true" />
            <span>East Greenbush, New York</span>
          </div>
          <h2 className="section-title">{contactInfo.address}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            SELLVANTA supports brands looking to build and grow their Amazon and e-commerce business.
          </p>
        </div>
      </section>

      <FAQ />
    </div>
  );
}

export default Contact;
