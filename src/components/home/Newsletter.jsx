import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      showToast('Welcome to the LUMIÈRE VIP Circle! Use code LUXE10 for 10% off.');
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <span className="newsletter-badge">
              <Sparkles size={14} className="inline-icon" /> Private Privileges
            </span>
            <h2 className="newsletter-title">Join The Lumière Haute Joaillerie Circle</h2>
            <p className="newsletter-desc">
              Receive private salon invitations, preview upcoming high jewelry collections before public release, and enjoy 10% privilege on your debut acquisition with code <strong>LUXE10</strong>.
            </p>

            {submitted ? (
              <div className="newsletter-joined-box">
                <CheckCircle size={24} className="text-gold" />
                <div>
                  <h4 className="joined-title">Welcome to Our Inner Circle</h4>
                  <p className="joined-desc">Your exclusive privileges have been activated. Use promo code <strong>LUXE10</strong> at checkout.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form-main">
                <div className="form-row">
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="newsletter-text-input"
                    />
                  </div>
                  <button type="submit" className="btn-primary newsletter-submit-btn">
                    <span>Unlock 10% Privilege</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="form-disclaimer">
                  <ShieldCheck size={14} />
                  <span>We honor your privacy. Unsubscribe anytime with a single click.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
