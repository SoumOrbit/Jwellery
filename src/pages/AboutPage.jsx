import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass, Award, CheckCircle, HeartHandshake } from 'lucide-react';
import { BRAND_STATS } from '../data/products';

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'Gouache Painting & Architectural Conception',
    desc: 'Every creation starts as an intimate gouache watercolor painting, capturing optical reflections, metal thickness, and gemstone dimensions from multiple perspectives.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: '02',
    title: 'Precision 3D CAD & Micro-Engineering',
    desc: 'Our technical artisans translate hand drawings into three-dimensional models, ensuring structural integrity, perfect weight balance, and seamless everyday comfort.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: '03',
    title: 'Lost-Wax Casting in 100% Recycled Gold',
    desc: 'Molten 18K solid yellow gold, rose gold, or 950 platinum is poured into bespoke ceramic investment molds, preserving razor-sharp contours and flawless density.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: '04',
    title: 'Microscopic Gem Setting',
    desc: 'Under 40x magnification stereomicroscopes, master diamond setters sculpt delicate claw prongs and calibrate each pavé stone to secure optimal light reflection.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: '05',
    title: 'Tri-Phase Hand Burnishing & Hallmarking',
    desc: 'Final mirror polishing using walnut shell rouge, followed by official London/Paris assay office hallmarking guarantees purity before passing 12-point quality review.',
    image: 'https://images.unsplash.com/photo-1611591475819-797de2338695?auto=format&fit=crop&w=600&q=80'
  }
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container text-center">
          <span className="about-badge">
            <Sparkles size={14} className="inline-icon" /> Our Atelier Heritage
          </span>
          <h1 className="about-hero-title">The Art of Timeless Haute Joaillerie</h1>
          <p className="about-hero-desc">
            For over four decades, LUMIÈRE has preserved the purest traditions of European high jewelry while pioneering a modern standard of ethical transparency.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="about-story-section section-padding">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="section-subtitle">
                <Sparkles size={14} className="inline-icon" /> Place Vendôme Origins
              </span>
              <h2 className="section-title">A Symphony of Light, Metal, and Intention</h2>
              <p>
                In 1981, master goldsmith Jean-Luc Moreau opened the doors to a modest private salon in Paris, committed to creating pieces that refuse to compromise between sculptural splendor and enduring comfort.
              </p>
              <p>
                Today, LUMIÈRE stands as an independent beacon of haute joaillerie. While other houses turn to mass-casting, every piece that leaves our benches remains individually hand-finished by master craftspeople who have spent decades perfecting their touch.
              </p>
              <div className="about-story-highlights">
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-gold" />
                  <span>Individual bench craftsmanship &mdash; never mass produced</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-gold" />
                  <span>Triple-inspected by certified GIA Graduate Gemologists</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-gold" />
                  <span>100% Conflict-free Kimberley Process certified gems</span>
                </div>
              </div>
            </div>

            <div className="about-story-media">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85"
                alt="Jeweler workbench with gemstones and loupe"
                className="about-story-img"
              />
              <div className="story-experience-tag">
                <span className="years">1981</span>
                <span className="label">Established in Paris</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Steps Craftsmanship Process */}
      <section id="craft" className="craft-process-section section-padding bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">
              <Sparkles size={14} className="inline-icon" /> Handcrafted Rigor
            </span>
            <h2 className="section-title">The 5-Stage Atelier Journey</h2>
            <p className="section-desc">
              From the initial watercolor stroke to final diamond inspection, experience how each heirloom comes to life.
            </p>
          </div>

          <div className="craft-steps-grid">
            {CRAFT_STEPS.map((craft) => (
              <div key={craft.step} className="craft-card">
                <div className="craft-img-wrap">
                  <img src={craft.image} alt={craft.title} loading="lazy" />
                  <span className="craft-step-number">{craft.step}</span>
                </div>
                <div className="craft-card-body">
                  <h3 className="craft-card-title">{craft.title}</h3>
                  <p className="craft-card-desc">{craft.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & Ethics */}
      <section className="sustainability-section section-padding">
        <div className="container">
          <div className="sustainability-box">
            <div className="sustain-content">
              <span className="sustain-badge">
                <HeartHandshake size={16} /> Conscious Luxury Commitment
              </span>
              <h2 className="sustain-title">Purity in Ethics, Beauty in Permanence</h2>
              <p className="sustain-p">
                We believe that the brilliance of a diamond is diminished if its origin causes harm to people or planet. Every piece in our collection is forged from 100% recycled 18K solid gold and 950 platinum, drastically reducing ecological disturbance.
              </p>
              <div className="sustain-grid">
                <div className="sustain-item">
                  <Gem size={24} className="text-gold mb-2" />
                  <h4>Conflict-Free Diamonds</h4>
                  <p>Adhering 100% to the Kimberley Process and audited suppliers.</p>
                </div>
                <div className="sustain-item">
                  <ShieldCheck size={24} className="text-gold mb-2" />
                  <h4>Refined Recycled Gold</h4>
                  <p>Eliminating mining degradation with certified refined alloys.</p>
                </div>
                <div className="sustain-item">
                  <Award size={24} className="text-gold mb-2" />
                  <h4>Artisan Fair Living</h4>
                  <p>Empowering heritage craft guilds with fair compensation &amp; safe ateliers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Stats Banner */}
      <section className="stats-banner-section section-padding-sm">
        <div className="container">
          <div className="brand-stats-row">
            {BRAND_STATS.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-val">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section text-center section-padding bg-alt">
        <div className="container">
          <h2 className="about-cta-title">Ready to Experience Exceptional Artistry?</h2>
          <p className="about-cta-desc">
            Explore our curated catalog of handcrafted fine jewelry or book an appointment with our private concierge.
          </p>
          <div className="about-cta-buttons">
            <Link to="/shop" className="btn-primary">
              <span>Explore High Jewelry</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>Schedule Atelier Viewing</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
