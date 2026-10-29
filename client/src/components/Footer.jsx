import { useEffect, useRef } from 'react';
import {
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';
import { footer } from '../data/siteData';
import './Footer.css';

const iconMap = {
  MapPin: FaMapMarkerAlt,
};

function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1, duration: 0.6 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 10 } },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="footer bg-[#111111] text-slate-200 py-8 px-6"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="footer__content">
        <motion.div className="footer__heading mb-8" variants={itemVariants}>
          <h2 className="text-2xl md:text-6xl font-semibold mb-2">SELLVANTA</h2>
          <p className="text-lg md:text-2xl font-medium">AMAZON &amp; E-COMMERCE GROWTH</p>
        </motion.div>

        <motion.div
          className="footer__layout mb-8 py-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="footer__col">
            <a href="/" aria-label="SELLVANTA home">
              <span className="navbar__brand">SELLVANTA</span>
            </a>
            <p className="font-thin text-[20px] mb-4 mt-4">{footer.description}</p>
          </motion.div>

          {footer.sections.map((section) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className={`${section.columns === 2 ? 'col-span-2' : 'col-span-1'} footer__col`}
            >
              <h3 className="uppercase text-lg text-slate-200 font-bold mb-6">{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <motion.li key={item.name} whileHover={{ x: 5 }} className="mb-4">
                    <a href={item.href} className="text-sm flex items-center hover:text-slate-100 transition-colors">
                      <FaArrowRight className="h-4 w-4 mr-2" aria-hidden="true" />
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="footer__col space-y-6">
            <h3 className="uppercase text-lg mb-6 text-slate-200 font-bold">Find Us</h3>
            <ul className="space-y-4">
              {footer.getInTouch.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <motion.li key={item.text} whileHover={{ x: 5 }} className="mb-4">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center text-sm hover:text-slate-100 transition-colors"
                    >
                      <IconComponent className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                      {item.text}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {footer.followUs.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="w-full mx-auto flex justify-center items-center mt-8"
          >
            <h3 className="uppercase text-md mr-2 p-4">Stay Connected</h3>
            <div className="flex gap-4">
              {footer.followUs.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="hover:text-[#00d9ff] transition-colors"
                  >
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="relative overflow-hidden h-[8vh] md:h-[15vh] flex items-center">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ x: { repeat: Number.POSITIVE_INFINITY, repeatType: 'loop', duration: 20, ease: 'linear' } }}
          >
            {[0, 1].map((item) => (
              <h2
                key={item}
                aria-hidden={item === 1}
                className="text-[4rem] md:text-[5.6rem] uppercase font-black leading-none mb-0 md:-mb-4 lg:-mb-10 px-12"
              >
                <span className="text-transparent font-outline">SELLVANTA</span> {footer.marqueeText} &nbsp;
              </h2>
            ))}
          </motion.div>
        </div>

        <motion.div className="py-6 border-t border-slate-700" variants={itemVariants}>
          <div className="flex flex-col items-center text-center">
            <p className="text-md">
              © {new Date().getFullYear()}{' '}
              <a href="/" className="text-[#00d9ff] font-bold">{footer.copyright.companyName}</a>.
              {' '}{footer.copyright.additionalText}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
