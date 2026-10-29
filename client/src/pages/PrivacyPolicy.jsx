import './Legal.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-legal">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Privacy</span>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__subtitle">This policy describes how SELLVANTA handles information submitted through this website.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Information Collection</h2>
          <p className="section-subtitle">When you contact SELLVANTA, we may receive the information you choose to provide, such as your name, email address, phone number, and project details.</p>

          <h2 className="section-title">Use of Information</h2>
          <p className="section-subtitle">We use submitted information to respond to inquiries and discuss requested services. We do not sell personal information submitted through this website.</p>
        </div>
      </section>
    </div>
  );
}
