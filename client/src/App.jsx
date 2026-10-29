import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Approach from './pages/Approach';

function AppContent() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <Preloader />
      {!isHome && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/approach" element={<Approach />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
