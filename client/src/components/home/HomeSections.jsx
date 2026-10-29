import {
  LuSparkles, LuArrowDown, LuSettings, LuSearch, LuLink2, LuChartColumn,
} from 'react-icons/lu';
import GlassCard from '../GlassCard';
import {
  seoFeatures, webFeatures, graphicDesignFeatures, videoFeatures,
} from '../../data/homeData';
import './HomeSections.css';

const seoIcons = { settings: LuSettings, search: LuSearch, link: LuLink2, chart: LuChartColumn };

function GridOverlay() {
  return <div className="section-grid-overlay" />;
}

export function ExploreServicesSection() {
  return (
    <section className="sticky-section sticky-section--z10">
<div 
  className="sticky-section__bg sticky-section__bg--desktop" 
  style={{ 
    backgroundImage: 'url(/assets/images/graphic3.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center' // Kept centered so it scales nicely
  }} 
/>
      <div className="sticky-section__bg sticky-section__bg--mobile" style={{ backgroundImage: 'url(/assets/Explore-our-service-mobile.svg)' }} />
      <GridOverlay />
      <div className="explore-content">
        <LuSparkles className="explore-content__icon" aria-hidden="true" />
        <h2 className="explore-content__title">
          Sell More<br />
          <span className="explore-content__gradient">Grow Smarter</span>
        </h2>
        <div className="explore-content__scroll">
          <p>Scroll to explore</p>
          <LuArrowDown className="explore-content__arrow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function SeoSection() {
  return (
    <section className="sticky-section sticky-section--z20">
      <div className="sticky-section__bg" style={{ backgroundImage: 'url(/assets/seo.svg)' }} />
      <div className="sticky-section__inner">
           <img src="/assets/images/seomobile.png" alt="Amazon account strategy" className="web-mobile-img sm:rounded-xl sm:shadow-lg sm:shadow-white" loading="lazy" />
        <div className="section-heading section-heading--center">
          <h2 className="section-heading__xl">Amazon Strategy</h2>
          <p className="section-heading__sub">Build a stronger foundation for marketplace growth.</p>
          <div className="section-heading__line" />
        </div>
        <div className="seo-desktop">
          {seoFeatures.map((f, i) => {
            const Icon = seoIcons[f.icon];
            return (
              <div key={f.title} className={`seo-col ${i < 3 ? 'seo-col--border' : ''}`}>
                <div className="seo-col__icon"><Icon aria-hidden="true" /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            );
          })}
        </div>
        <div className="feature-grid feature-grid--2 feature-grid--mobile">
          {seoFeatures.map((f) => (
            <GlassCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WebDevSection() {
  
  return (
    <section className="sticky-section sticky-section--z30 sticky-section--web p-12">
      <div className="sticky-section__bg sticky-section__bg--desktop" style={{ backgroundImage: 'url(/assets/web.svg)', backgroundPosition: 'center' }} />
      <GridOverlay />
      <div className="sticky-section__inner">
        <img src="/assets/lptop1.svg" alt="E-commerce marketplace growth" className="web-mobile-img" loading="lazy" />
        <div className="section-heading section-heading--center ">
          <h2 className="section-heading__lg">Marketplace Growth</h2>
          <p className="section-heading__tech ">Amazon | Shopify | Product Discovery | Channel Strategy</p>
        </div>
        <div className="feature-grid feature-grid--2   lg:invisible ">
          {webFeatures.map((f,i) => (
            <GlassCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GraphicDesignSection() {
  return (
    <section className="sticky-section sticky-section--z35">
      <div className="sticky-section__bg" style={{ backgroundImage: "url('/assets/images/graphic.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', filter: 'brightness(0.6) contrast(1.05)' }} />
      <div className="sticky-section__inner">
        <img src="/assets/images/graphic2.png" alt="Product listing and brand content" className="web-mobile-img" loading="lazy" />

        <div className="section-heading section-heading--center">
          <h2 className="section-heading__lg section-heading__graphic">Product Content</h2>
          <p className="section-heading__sub">Make your product and brand story clear at every touchpoint.</p>
          <div className="section-heading__line" />
        </div>
        <div className="feature-grid feature-grid--2 feature-grid--ai graphic-design-grid flex items-center">
          {graphicDesignFeatures.map((f) => (
            <GlassCard key={f.title} emoji={f.emoji} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section className="sticky-section sticky-section--z40">
      <div className="sticky-section__bg sticky-section__bg--desktop" style={{ backgroundImage: 'url(/assets/video-auto.svg)' }} />
      <div className="sticky-section__bg sticky-section__bg--mobile" style={{ backgroundImage: 'url("")' }} />
      <div className="sticky-section__inner sticky-section__inner--center">
        <img src="/assets/video-auto-mobile1.svg" alt="E-commerce performance strategy" className="video-mobile-img" loading="lazy" />
        <div className="section-heading section-heading--center">
          <h2 className="section-heading__video">E-commerce<br />Performance</h2>
          <div className="section-heading__line section-heading__line--white" />
          <p className="section-heading__tagline">Plan. Optimize. Grow.</p>
        </div>
        <div className="video-desktop-grid">
          {videoFeatures.map((f, i) => (
            <div key={f.title} className={`video-step ${i < 3 ? 'video-step--line' : ''}`}>
              <div className="video-step__icon">{f.emoji}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
        <div className="feature-grid feature-grid--2 feature-grid--mobile">
          {videoFeatures.map((f) => (
            <GlassCard key={f.title} emoji={f.emoji} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
