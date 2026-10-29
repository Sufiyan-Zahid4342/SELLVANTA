import { useState, useEffect } from 'react';
import './Preloader.css';

function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${progress >= 100 ? 'preloader--done' : ''}`}>
      <div className="preloader__content">
        <div className="preloader__logo flex justify-center items-center">
          <img src="/sellvanta-mark.svg" alt="" className="h-16 w-16" />
          <span className="sr-only">SELLVANTA</span>
        </div>
        <div className="preloader__bar">
          <div className="preloader__progress" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="preloader__text">
          {progress < 100 ? 'Initializing' : 'Ready'}
        </div>
        <div className="preloader__count">{Math.min(Math.round(progress), 100)}</div>
      </div>
    </div>
  );
}

export default Preloader;
