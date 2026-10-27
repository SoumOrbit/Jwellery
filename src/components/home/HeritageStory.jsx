import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Gem, Compass } from 'lucide-react';
import { BRAND_STATS } from '../../data/products';

const HeritageStory = () => {
  return (
    <section className="heritage-section section-padding">
      <div className="container">
        <div className="heritage-grid">
          {/* Visual Showcase */}
          <div className="heritage-media-col">
            <div className="heritage-main-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
                alt="Master Goldsmith at Work in Paris Atelier"
                className="heritage-img-main"
                loading="lazy"
              />
              <div className="heritage-experience-badge">
                <span className="exp-years">45+</span>
                <span className="exp-label">Years of Fine Jewelry Artistry</span>
              </div>
            </div>

            <div className="heritage-accent-box">
              <div className="accent-quote">
                <Sparkles size={16} className="text-gold mb-1" />
                <p>
                  "We do not merely set stones into metal; we give physical form to love, devotion, and eternity."
                </p>
                <span className="accent-author">&mdash; Jean-Luc Moreau, Master Jeweler</span>
              </div>
            </div>
          </div>

          {/* Story Text Content */}
          <div className="heritage-content-col">
            <span className="section-subtitle">
              <Sparkles size={14} className="inline-icon" /> The Art of Haute Joaillerie
            </span>
            <h2 className="section-title">Rooted in Heritage, Dedicated to Conscious Luxury</h2>
            
            <p className="heritage-paragraph">
              Founded in 1981 in the historic Place Vendôme district of Paris, LUMIÈRE was born with a singular ambition: to bridge centuries-old French jewellery traditions with modern ethical responsibility.
            </p>

            <p className="heritage-paragraph">
              Every single ring, pendant, and bracelet is shaped by master artisans who have devoted decades to the nuances of metal casting, micro-pavé prong setting, and hand-burnishing.
            </p>

            <div className="heritage-pillars">
              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Gem size={20} />
                </div>
                <div>
                  <h4 className="pillar-title">Uncompromising Ethical Diamonds</h4>
                  <p className="pillar-desc">
                    100% conflict-free natural diamonds and zero-emission certified laboratory diamonds graded by GIA.
                  </p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="pillar-title">100% Recycled 18K Solid Gold &amp; Platinum</h4>
                  <p className="pillar-desc">
                    We exclusively melt refined recycled precious metals, eliminating the environmental impact of newly mined ores.
                  </p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="pillar-title">Bespoke Custom Atelier</h4>
                  <p className="pillar-desc">
                    Collaborate directly with our master designers to realize your dream engagement ring or family heirloom.
                  </p>
                </div>
              </div>
            </div>

            <div className="heritage-actions">
              <Link to="/about" className="btn-primary">
                <span>Read The Atelier Story</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span>Book a Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
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
  );
};

export default HeritageStory;
