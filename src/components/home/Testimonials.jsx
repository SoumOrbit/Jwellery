import React from 'react';
import { Sparkles, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';
import StarRating from '../common/StarRating';

const PRESS_LOGOS = [
  { name: 'VOGUE', quote: '“The new gold standard of modern ethical haute joaillerie.”' },
  { name: 'HARPER’S BAZAAR', quote: '“Flawless diamonds and heirloom-level French craftsmanship.”' },
  { name: 'ELLE LUXURY', quote: '“Sensual silhouettes sculpted with unyielding precision.”' },
  { name: 'FORBES', quote: '“Revolutionizing fine jewelry with 100% recycled metals.”' }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        {/* Press Quotes Bar */}
        <div className="press-bar">
          <span className="press-label">As Celebrated In</span>
          <div className="press-grid">
            {PRESS_LOGOS.map((press, i) => (
              <div key={i} className="press-item">
                <span className="press-name">{press.name}</span>
                <p className="press-quote">{press.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Reviews */}
        <div className="section-header text-center mt-5">
          <span className="section-subtitle">
            <Sparkles size={14} className="inline-icon" /> Client Voices
          </span>
          <h2 className="section-title">Words From Our Connoisseurs</h2>
          <p className="section-desc">
            Nothing honors our atelier more than the everlasting memories our creations accompany.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-top">
                <Quote size={32} className="quote-icon text-gold" />
                <StarRating rating={t.rating} size={16} />
              </div>

              <p className="testimonial-quote">"{t.quote}"</p>

              <div className="testimonial-footer">
                <div className="testimonial-author-info">
                  <h4 className="author-name">{t.author}</h4>
                  <span className="author-loc">{t.location}</span>
                  <div className="author-product">
                    <span className="purchased-label">Purchased:</span>
                    <strong className="purchased-item">{t.product}</strong>
                  </div>
                </div>

                {t.verified && (
                  <div className="verified-badge">
                    <CheckCircle size={14} className="verified-icon" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
