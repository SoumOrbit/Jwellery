import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Gem, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    subtitle: 'HAUTE JOAILLERIE PARIS',
    title: 'Timeless Elegance, Sculpted For Eternity',
    description: 'Immerse yourself in exceptional craftsmanship. Pure 18K solid gold and hand-selected rare diamonds designed to celebrate life’s most profound milestones.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Explore The Collection',
    ctaLink: '/shop',
    secondaryCta: 'Book Atelier Consultation',
    secondaryLink: '/contact'
  },
  {
    id: 2,
    subtitle: 'THE 2026 CELESTIAL SUITE',
    title: 'Radiance Beyond Comparison',
    description: 'Discover the newly unveiled Celestial Diamond Suite — featuring flawless laboratory & natural conflict-free diamonds set in bespoke 950 pure platinum.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Discover Celestial Rings',
    ctaLink: '/shop?category=rings',
    secondaryCta: 'Our Craftsmanship',
    secondaryLink: '/about'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="hero-section">
      {/* Background Image Carousel with Fade */}
      <div className="hero-background-wrapper">
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(18, 18, 20, 0.55), rgba(18, 18, 20, 0.7)), url(${s.image})` }}
          />
        ))}
      </div>

      <div className="container hero-content-container">
        <div className="hero-text-content">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>{slide.subtitle}</span>
          </div>

          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>

          <div className="hero-actions">
            <Link to={slide.ctaLink} className="btn-primary">
              <span>{slide.ctaText}</span>
              <ArrowRight size={18} />
            </Link>
            <Link to={slide.secondaryLink} className="btn-secondary">
              <span>{slide.secondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="hero-controls">
          <button 
            className="hero-arrow-btn"
            onClick={() => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="hero-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button 
            className="hero-arrow-btn"
            onClick={() => setCurrentSlide((currentSlide + 1) % SLIDES.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div className="hero-features-bar">
        <div className="container">
          <div className="features-strip">
            <div className="feature-strip-item">
              <Gem size={20} className="strip-icon" />
              <div>
                <strong className="strip-title">100% Conflict-Free</strong>
                <span className="strip-desc">GIA &amp; IGI Certified Gems</span>
              </div>
            </div>

            <div className="feature-strip-item">
              <Award size={20} className="strip-icon" />
              <div>
                <strong className="strip-title">18K Solid Gold &amp; Platinum</strong>
                <span className="strip-desc">Never plated, purely hallmarked</span>
              </div>
            </div>

            <div className="feature-strip-item">
              <Shield size={20} className="strip-icon" />
              <div>
                <strong className="strip-title">Lifetime Atelier Warranty</strong>
                <span className="strip-desc">Complimentary prong &amp; polish care</span>
              </div>
            </div>

            <div className="feature-strip-item">
              <Sparkles size={20} className="strip-icon" />
              <div>
                <strong className="strip-title">Bespoke Custom Orders</strong>
                <span className="strip-desc">One-on-one master jeweler design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
