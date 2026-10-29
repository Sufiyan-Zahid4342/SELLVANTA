import Navbar from '../components/Navbar';
import ThreeBackground from '../components/ThreeBackground';
import Hero from '../components/Hero';
import MarqueeBar from '../components/MarqueeBar';
import {
  ExploreServicesSection,
  SeoSection,
  WebDevSection,
  GraphicDesignSection,
  VideoSection,
} from '../components/home/HomeSections';
import FAQ from '../components/FAQ';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-hero-wrap">
        <div className="home-hero-wrap__bg">
          <ThreeBackground variant="home" />
        </div>
        <Navbar embedded />
        <Hero />
        <div className="home-hero-wrap__gradient" />
      </div>

      <MarqueeBar />

      <article className="home-services-stack">
        <ExploreServicesSection />
        <SeoSection />
        <WebDevSection />
        <GraphicDesignSection />
        <VideoSection />
      </article>

      <FAQ />
    </div>
  );
}

export default Home;
