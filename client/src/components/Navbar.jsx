import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import './Navbar.css';
import { FaHome, FaUser, FaEnvelope , FaServicestack ,FaCompass } from "react-icons/fa";

const navLinks = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/about", label: "About", icon: FaUser },
  { path: "/contact", label: "Contact", icon: FaEnvelope },
  { path: "/services", label: "Services", icon: FaServicestack },
  { path: "/approach", label: "Our Approach", icon: FaCompass },
];

function Navbar({ embedded = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${embedded ? 'navbar--embedded' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__brand">SELLVANTA</span>
          </Link>

          <div className="navbar__pill">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__link ${
                    location.pathname === link.path ? "navbar__link--active" : ""
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link to="/contact" className="navbar__cta">
              Get in Touch
            </Link>
          </div>

          <div className="navbar__mobile">
            <button
              className="navbar__toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`} onClick={() => setMenuOpen(false)} />

      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-pill">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${
                  location.pathname === link.path ? "navbar__link--active" : ""
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <Link to="/contact" className="navbar__cta">
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
