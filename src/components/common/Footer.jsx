import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Gem
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Welcome to the LUMIÈRE VIP Circle! Check your inbox for your 10% code: LUXE10');
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      {/* Pre-footer Trust Value Propositions */}
      <div className="footer-values-bar">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <Gem className="value-icon" size={26} />
              <div className="value-text">
                <span className="value-title">Conflict-Free Diamonds</span>
                <p className="value-desc">Kimberley Process certified with GIA verification</p>
              </div>
            </div>

            <div className="value-item">
              <Truck className="value-icon" size={26} />
              <div className="value-text">
                <span className="value-title">Complimentary Insured Shipping</span>
                <p className="value-desc">Discreet, armored overnight delivery worldwide</p>
              </div>
            </div>

            <div className="value-item">
              <RefreshCw className="value-icon" size={26} />
              <div className="value-text">
                <span className="value-title">30-Day Atelier Guarantee</span>
                <p className="value-desc">Complimentary resizing &amp; hassle-free returns</p>
              </div>
            </div>

            <div className="value-item">
              <ShieldCheck className="value-icon" size={26} />
              <div className="value-text">
                <span className="value-title">Lifetime Care &amp; Polish</span>
                <p className="value-desc">Annual inspection, cleaning &amp; prong warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Diamond size={24} className="gem-icon" />
              <span className="footer-brand-name">LUMIÈRE</span>
            </div>
            <p className="footer-brand-desc">
              Since 1981, Lumière has pioneered exceptional haute joaillerie. Handcrafted in our Paris and London ateliers using only recycled 18K solid gold and rare ethically sourced natural and lab diamonds.
            </p>
            <div className="footer-contact-items">
              <div className="footer-contact-line">
                <MapPin size={16} className="contact-icon" />
                <span>Flagship: Place Vendôme, 75001 Paris, France</span>
              </div>
              <div className="footer-contact-line">
                <Phone size={16} className="contact-icon" />
                <span>+1 (800) 589-LUXE (Private Concierge)</span>
              </div>
              <div className="footer-contact-line">
                <Mail size={16} className="contact-icon" />
                <span>concierge@lumiere-jewels.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div className="footer-col">
            <h4 className="footer-col-title">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=rings">Diamond Rings</Link></li>
              <li><Link to="/shop?category=necklaces">Pendants &amp; Necklaces</Link></li>
              <li><Link to="/shop?category=earrings">Chandelier &amp; Stud Earrings</Link></li>
              <li><Link to="/shop?category=bracelets">Rivière Tennis Bracelets</Link></li>
              <li><Link to="/shop?filter=new">New 2026 Releases</Link></li>
              <li><Link to="/shop?filter=bestseller">The Bestsellers</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="footer-col">
            <h4 className="footer-col-title">Client Concierge</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Book an Atelier Appointment</Link></li>
              <li><Link to="/contact#faq">Ring Sizing &amp; Guide</Link></li>
              <li><Link to="/about#craft">Handcrafting Process</Link></li>
              <li><Link to="/cart">Track Your Bag</Link></li>
              <li><Link to="/wishlist">Your Curated Wishlist</Link></li>
              <li><Link to="/contact">Bespoke Custom Orders</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Join The Lumière Club</h4>
            <p className="newsletter-text">
              Subscribe to receive private invitations to new high jewelry collections, bespoke salon viewings, and 10% off your initial purchase.
            </p>

            {subscribed ? (
              <div className="newsletter-success">
                <ShieldCheck size={20} className="text-gold" />
                <span>Thank you! Code <strong>LUXE10</strong> is active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <div className="newsletter-input-wrap">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <span className="newsletter-note">Complimentary code: Use <strong>LUXE10</strong> for 10% off</span>
              </form>
            )}

            <div className="footer-socials">
              <span className="socials-label">Follow our Atelier</span>
              <div className="social-icons">
                <a href="#instagram" aria-label="Instagram" className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#facebook" aria-label="Facebook" className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#twitter" aria-label="Twitter" className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright & Payment Badges */}
      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} LUMIÈRE HAUTE JOAILLERIE. All rights reserved. Crafted for connoisseurs of fine design.
          </p>
          <div className="payment-badges">
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">MASTERCARD</span>
            <span className="pay-badge">AMEX</span>
            <span className="pay-badge">APPLE PAY</span>
            <span className="pay-badge">PAYPAL</span>
            <span className="pay-badge">SECURE 256-BIT SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
