import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import './FAQ.css';

const faqData = [
  {
    id: 1,
    question: 'What does SELLVANTA help with?',
    answer:
      'SELLVANTA focuses on Amazon and e-commerce growth, including account support, product listing optimization, advertising strategy, product launches, storefronts, and brand content.',
    color: '#00d9ff',
    geometry: 'torus',
  },
  {
    id: 2,
    question: 'How can I request a quote?',
    answer:
      'Share your products, sales channels, and goals through the contact form. We’ll review the information and follow up about the next steps.',
    color: '#78eaff',
    geometry: 'sphere',
  },
  {
    id: 3,
    question: 'Do you offer ongoing support?',
    answer:
      'Support can be shaped around your priorities, whether you need help with a specific project or ongoing e-commerce growth work.',
    color: '#39c8f0',
    geometry: 'knot',
  },
  {
    id: 4,
    question: 'Do you work with Amazon and direct-to-consumer stores?',
    answer:
      'Yes. SELLVANTA’s focus is Amazon and e-commerce growth, including marketplace work and direct-to-consumer storefronts such as Shopify.',
    color: '#a3f2ff',
    geometry: 'box',
  },
  {
    id: 5,
    question: 'Can you work remotely?',
    answer:
      'SELLVANTA is based in East Greenbush, New York. Share your location and project details with us and we can discuss whether the engagement is a fit.',
    color: '#00aeca',
    geometry: 'torus',
  },
  {
    id: 6,
    question: 'How do you decide what my brand needs?',
    answer:
      'We start by understanding your products, audience, current e-commerce presence, and business goals. From there, we can identify priorities and recommend a suitable scope.',
    color: '#63dfff',
    geometry: 'sphere',
  },
];

function GridOverlay() {
  return <div className="section-grid-overlay" />;
}

// --- High Performance Three.js Shape Element ---
function Shape({ type, color, isHovered }) {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      {type === 'sphere' && (
        <Sphere args={[1, 32, 32]} scale={isHovered ? 1.2 : 1}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={4}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      )}
      {type === 'torus' && (
        <mesh scale={isHovered ? 1.2 : 1}>
          <torusGeometry args={[0.8, 0.25, 16, 100]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
      )}
      {type === 'knot' && (
        <mesh scale={isHovered ? 1.1 : 0.9}>
          <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
        </mesh>
      )}
      {type === 'box' && (
        <mesh scale={isHovered ? 1.2 : 1}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </mesh>
      )}
    </Float>
  );
}

function FAQCard({ faq, index, expandedId, toggleExpanded }) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = expandedId === faq.id;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`faq-card ${isExpanded ? 'faq-card--expanded' : ''}`}
      onClick={() => toggleExpanded(faq.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="faq-card__canvas-container">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: true }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Shape type={faq.geometry} color={faq.color} isHovered={isHovered} />
        </Canvas>
      </div>

      <div className="faq-card__content">
        <button
          className="faq-card__header"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded(faq.id);
          }}
          aria-expanded={isExpanded}
        >
          <h3 className="faq-card__question">{faq.question}</h3>
          <motion.div
            className="faq-card__toggle"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ color: faq.color }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              className="faq-card__answer-wrapper"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <p className="faq-card__answer">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FAQ() {
  const [expandedId, setExpandedId] = useState(1);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faqs" className="section faq-section">
      {/* Placed here to span the complete background canvas area */}
      <GridOverlay />
      
      <div className="container">
        <motion.div
          className="section-heading section-heading--center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="section-heading__lg">
            Frequently <span className="text-transparent font-outline">Asked</span> Questions
          </h2>
          <p className="section-heading__sub">
            Answers to common questions about Amazon and e-commerce growth with SELLVANTA.
          </p>
          <div className="section-heading__line" />
        </motion.div>

        <div className="faq-grid">
          {faqData.map((faq, index) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              index={index}
              expandedId={expandedId}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;