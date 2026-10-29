import './Legal.css';

export default function TermsConditions() {
  return (
    <div className="page-legal">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Terms & Conditions</span>
          <h1 className="page-hero__title">Terms & Conditions</h1>
          <p className="page-hero__subtitle">These terms apply to your use of the SELLVANTA website.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">1. Acceptance of Terms</h2>
          <p className="section-subtitle">By accessing this website, you agree to use it in accordance with these terms and applicable laws.</p>

          <h2 className="section-title">2. Use of Site</h2>
          <p className="section-subtitle">Website content is provided for general information about SELLVANTA and its services. You may not use this site in a way that is unlawful, disruptive, or infringes the rights of others.</p>
        </div>
      </section>
    </div>
  );
}
