import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuCompass, LuTarget, LuTrendingUp } from 'react-icons/lu';
import ThreeBackground from '../components/ThreeBackground';
import { values } from '../data/siteData';
import './About.css';

const approach = [
  {
    icon: LuCompass,
    title: 'Understand the opportunity',
    description: 'We learn about your products, customers, current channels, and ambitions before recommending a direction.',
  },
  {
    icon: LuTarget,
    title: 'Focus the strategy',
    description: 'We prioritize the work that fits your brand, from stronger product detail pages to a more intentional campaign plan.',
  },
  {
    icon: LuTrendingUp,
    title: 'Keep improving',
    description: 'We review what is working, share clear recommendations, and help you make informed next moves.',
  },
];

function About() {
  return (
    <div className="about">
      <section className="page-hero">
        <ThreeBackground variant="about" />
        <div className="page-hero__content container flex justify-center items-center flex-col text-center">
          <div className="t-section__badge flex flex-row letterspacing">
            <LuCompass className="hero__badge-icon" aria-hidden="true" />
            About SELLVANTA
          </div>
          <motion.h1
            className="page-hero__title mt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your brand deserves a smarter path to growth.
          </motion.h1>
          <motion.p
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            SELLVANTA is an Amazon and e-commerce growth agency. We bring marketplace strategy,
            product storytelling, and practical optimization together to help brands build stronger
            online businesses.
          </motion.p>
          <motion.div
            className="page-hero__actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn btn-primary">Talk About Your Goals</Link>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </motion.div>
        </div>
      </section>

      <section className="section about-problem">
        <div className="container">
          <div className="about-problem__grid">
            <div className="about-problem__content">
              <div className="t-section__badge flex items-center gap-2 letterspacing">
                <LuTarget aria-hidden="true" />
                What SELLVANTA Represents
              </div>
              <h2 className="section-title mt-2">A name built around momentum.</h2>
              <p className="about-problem__text">
                SELL speaks to helping brands sell products and grow revenue. VANTA gives the name
                a distinctive, modern feel. Together, SELLVANTA stands for helping brands sell more,
                grow faster, and build a stronger online business.
              </p>
              <p className="about-problem__text">
                Our promise is simple: <strong>Your Brand. Our Strategy. Greater Growth.</strong>
              </p>
            </div>

            <div className="about-problem__services">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  className="about-service card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <h3 className="service-title">{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-values__header text-center">
            <span className="section-label">How we work</span>
            <h2 className="section-title">Strategy that starts with your brand.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              No one-size-fits-all playbook. We shape our work around your products, priorities,
              and the customers you want to reach.
            </p>
          </div>
          <div className="grid-3" style={{ marginTop: '40px' }}>
            {approach.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                className="card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="service-icon" aria-hidden="true" />
                <h3 className="service-title">{title}</h3>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to grow your online business?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            Tell us what you sell and where you want to go. We’ll explore how SELLVANTA can help.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
            <Link to="/services" className="btn btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
