import { motion } from 'framer-motion';
import './ServiceCard.css';

function ServiceCard({ service, index }) {
  return (
    <motion.div
      className="service-card card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="service-card__number">{service.id}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <div className="service-card__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="service-card__tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default ServiceCard;
