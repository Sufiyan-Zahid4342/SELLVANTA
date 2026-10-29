import { useState } from 'react';
import { serviceOptions } from '../data/siteData';
import './ContactForm.css';
function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    projectDetails: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setForm({ fullName: '', email: '', phone: '', service: '', budget: '', projectDetails: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit} style={{ backgroundImage: 'url(./assets/ai-auto.svg)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="contact-form__grid">
        <div className="contact-form__group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="service">Service Needed</label>
          <select id="service" name="service" value={form.service} onChange={handleChange} required>
            <option value="">Select service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="contact-form__group contact-form__group--full">
          <label htmlFor="projectDetails">Project Details</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={form.projectDetails}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell us about your project goals, timeline, and requirements..."
          />
        </div>
      </div>

      {status.message && (
        <div className={`contact-form__status contact-form__status--${status.type}`}>
          {status.message}
        </div>
      )}

      <button type="submit" className="btn btn-primary contact-form__submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      <p className="contact-form__disclaimer">
        By submitting this form, you agree to be contacted by SELLVANTA regarding your project request.
      </p>
    </form>
  );
}

export default ContactForm;
