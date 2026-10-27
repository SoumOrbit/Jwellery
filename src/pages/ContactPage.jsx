import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { FAQS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const BOUTIQUES = [
  {
    city: 'Paris Flagship',
    address: '14 Place Vendôme, 75001 Paris, France',
    phone: '+33 1 42 68 00 12',
    email: 'paris@lumiere-jewels.com',
    hours: 'Monday – Saturday: 10:00 – 19:30',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
  },
  {
    city: 'New York Salon',
    address: '680 Madison Avenue, New York, NY 10065',
    phone: '+1 (212) 555-0198',
    email: 'newyork@lumiere-jewels.com',
    hours: 'Monday – Saturday: 10:00 – 19:00, Sun by Appointment',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
  },
  {
    city: 'London Mayfair',
    address: '28 Old Bond Street, London W1S 4QR, UK',
    phone: '+44 20 7946 0912',
    email: 'london@lumiere-jewels.com',
    hours: 'Monday – Saturday: 10:00 – 18:30',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  }
];

const ContactPage = () => {
  const { showToast } = useCart();
  const { addAppointment } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Bespoke Engagement Ring',
    boutique: 'Paris Flagship',
    preferredDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setSubmitted(true);
    showToast('Your consultation request has been received! Our concierge will reach out within 4 hours.');
  };

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="container text-center">
          <span className="contact-hero-badge">
            <Sparkles size={14} className="inline-icon" /> Private Concierge &amp; Salons
          </span>
          <h1 className="contact-hero-title">At Your Utmost Service</h1>
          <p className="contact-hero-desc">
            Whether seeking guidance on diamond specifications, booking an intimate boutique viewing, or crafting a one-of-a-kind bespoke piece, our jewelry concierge is devoted to you.
          </p>
        </div>
      </section>

      {/* Flagship Boutiques Grid */}
      <section className="boutiques-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">
              <MapPin size={14} className="inline-icon" /> Global Salons
            </span>
            <h2 className="section-title">Our Flagship Destinations</h2>
            <p className="section-desc">
              Experience the weight, luster, and fire of our creations in an atmosphere of refined serenity.
            </p>
          </div>

          <div className="boutiques-grid">
            {BOUTIQUES.map((b, i) => (
              <div key={i} className="boutique-card">
                <div className="boutique-img-wrap">
                  <img src={b.image} alt={b.city} loading="lazy" />
                  <span className="boutique-city-tag">{b.city}</span>
                </div>
                <div className="boutique-info">
                  <h3 className="boutique-name">{b.city}</h3>
                  <div className="boutique-line">
                    <MapPin size={16} className="text-gold" />
                    <span>{b.address}</span>
                  </div>
                  <div className="boutique-line">
                    <Phone size={16} className="text-gold" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="boutique-line">
                    <Mail size={16} className="text-gold" />
                    <span>{b.email}</span>
                  </div>
                  <div className="boutique-line">
                    <Clock size={16} className="text-gold" />
                    <span>{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking & Contact Form */}
      <section className="appointment-section section-padding bg-alt">
        <div className="container">
          <div className="appointment-grid">
            {/* Left explanation */}
            <div className="appointment-text-col">
              <span className="section-subtitle">
                <Calendar size={14} className="inline-icon" /> Private Consultation
              </span>
              <h2 className="section-title">Schedule a Personal Salon Viewing or Virtual Consultation</h2>
              <p className="appointment-p">
                Enjoy champagne and private presentation of high jewelry suites tailored to your personal aesthetic. Our GIA Graduate Gemologists will guide you through diamond selections, custom settings, and heirloom redesigns.
              </p>

              <div className="service-features-list">
                <div className="feature-item">
                  <ShieldCheck size={20} className="text-gold" />
                  <div>
                    <h4>Private Dedicated Viewing Suite</h4>
                    <p>Undivided one-on-one attention with a master jeweler in total discretion.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Sparkles size={20} className="text-gold" />
                  <div>
                    <h4>Loose Diamond Inspections</h4>
                    <p>Compare exceptional color, clarity, and optical scintillation under microscope.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="appointment-form-col">
              <div className="form-card">
                {submitted ? (
                  <div className="form-success-box text-center">
                    <CheckCircle size={48} className="text-gold mb-3 mx-auto" />
                    <h3>Appointment Requested</h3>
                    <p>
                      Thank you, <strong>{formData.name}</strong>. A private concierge liaison will contact you within 4 hours at <strong>{formData.email}</strong> to finalize your appointment details.
                    </p>
                    <button 
                      className="btn-primary mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Book Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="booking-form">
                    <h3 className="form-box-title">Reserve Your Consultation</h3>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Lord / Lady / Mr. / Ms."
                          className="form-control"
                        />
                      </div>
                      <div className="form-field">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@domain.com"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label>Telephone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="form-control"
                        />
                      </div>
                      <div className="form-field">
                        <label>Desired Date</label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label>Consultation Interest</label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Bespoke Engagement Ring">Bespoke Engagement Ring</option>
                          <option value="Diamond Tennis Bracelet / Necklace">Diamond Tennis Bracelet / Necklace</option>
                          <option value="High Jewelry Suite">High Jewelry Suite</option>
                          <option value="Custom Redesign & Heirloom Resetting">Custom Redesign &amp; Heirloom Resetting</option>
                          <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>Preferred Salon</label>
                        <select
                          name="boutique"
                          value={formData.boutique}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Paris Flagship">Paris Flagship (Place Vendôme)</option>
                          <option value="New York Salon">New York Salon (Madison Ave)</option>
                          <option value="London Mayfair">London Mayfair (Old Bond St)</option>
                          <option value="Virtual High-Def Video Salon">Virtual High-Def Video Salon</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Special Requests / Design Vision</label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share any preferred diamond shapes, budget considerations, or special dates..."
                        className="form-control"
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-full submit-booking-btn">
                      <span>Request Private Appointment</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">
              <Sparkles size={14} className="inline-icon" /> Client Assistance
            </span>
            <h2 className="section-title">Frequently Asked Inquiries</h2>
            <p className="section-desc">
              Everything you need to know about our certifications, lifetime warranty, and security.
            </p>
          </div>

          <div className="faq-accordion-container">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-card ${activeFaq === idx ? 'active' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <ChevronDown size={20} className="faq-icon" />
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
