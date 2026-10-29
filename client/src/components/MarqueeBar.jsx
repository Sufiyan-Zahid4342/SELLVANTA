import { marqueeItems } from '../data/homeData';
import './MarqueeBar.css';

function MarqueeBar() {
  const items = marqueeItems.map((item) => (
    <span key={item} className="marquee-item">{item}</span>
  ));

  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        <div className="marquee-content">{items}</div>
        <div className="marquee-content" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}

export default MarqueeBar;
