import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

const CategoryGrid = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

      // Estimate active index based on scroll position
      const firstCard = scrollRef.current.querySelector('.category-card');
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 16;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveCategoryIndex(Math.min(Math.max(0, index), CATEGORIES.length - 1));
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.category-card');
      const scrollAmount = card ? card.offsetWidth + 16 : 280;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSlide = (index) => {
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll('.category-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        setActiveCategoryIndex(index);
      }
    }
  };

  return (
    <section className="category-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Sparkles size={14} className="inline-icon" /> Curated Collections
          </span>
          <h2 className="section-title">Explore By Category</h2>
          <p className="section-desc">
            Each creation is an exquisite union of rare gemstones and noble precious metals, meticulously hand-finished in our atelier.
          </p>
        </div>

        {/* Purplle/Nykaa Style Circular Story Category Avatars for Mobile */}
        <div className="category-story-strip-wrap">
          <div className="category-story-strip">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                className={`category-story-item ${activeCategoryIndex === idx ? 'active-story' : ''}`}
                onClick={() => scrollToSlide(idx)}
              >
                <div className="story-avatar-ring">
                  <div className="story-avatar-img-wrap">
                    <img src={cat.image} alt={cat.name} className="story-avatar-img" loading="lazy" />
                  </div>
                </div>
                <span className="story-avatar-title">{cat.name}</span>
                <span className="story-avatar-badge">{cat.itemCount.replace(' Designs', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Rail Wrapper with Side Peek and Scroll Snap */}
        <div className="category-rail-container">
          {/* Navigation Arrow Left (visible on desktop or tablet if scrollable) */}
          {canScrollLeft && (
            <button
              type="button"
              className="carousel-side-nav-btn prev"
              onClick={() => handleScroll('prev')}
              aria-label="Previous category"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Navigation Arrow Right */}
          {canScrollRight && (
            <button
              type="button"
              className="carousel-side-nav-btn next"
              onClick={() => handleScroll('next')}
              aria-label="Next category"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div className="categories-grid" ref={scrollRef}>
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className={`category-card group ${activeCategoryIndex === idx ? 'current-active-slide' : ''}`}
              >
                <div className="category-image-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-img"
                    loading="lazy"
                  />
                  <div className="category-overlay" />
                  <span className="category-mobile-tag">Collection {idx + 1} of {CATEGORIES.length}</span>
                </div>

                <div className="category-content">
                  <span className="category-count">{cat.itemCount}</span>
                  <h3 className="category-name">{cat.name}</h3>
                  <p className="category-tagline">{cat.tagline}</p>
                  <div className="category-explore-link">
                    <span>Shop {cat.name}</span>
                    <ArrowRight size={16} className="category-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicators & Progress Dots */}
        <div className="category-mobile-indicators">
          <div className="category-dots-list">
            {CATEGORIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`category-dot-btn ${activeCategoryIndex === idx ? 'active' : ''}`}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to category ${idx + 1}`}
              />
            ))}
          </div>
          <span className="category-swipe-hint">Swipe sideways to browse all categories &rarr;</span>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
