import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, LayoutGrid, Columns } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useAdmin } from '../../context/AdminContext';
import ProductCard from '../common/ProductCard';
import QuickViewModal from '../common/QuickViewModal';

const FeaturedSection = () => {
  const { productsList } = useAdmin();
  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filterProducts = () => {
    const list = productsList && productsList.length > 0 ? productsList : PRODUCTS;
    switch (activeTab) {
      case 'bestsellers':
        return list.filter(p => p.badge === 'Bestseller' || p.rating >= 4.9).slice(0, 8);
      case 'new':
        return list.filter(p => p.isNew || p.badge === 'New Arrival' || p.badge === 'Limited Edition').slice(0, 8);
      case 'rings':
        return list.filter(p => p.category === 'rings').slice(0, 8);
      default:
        return list.slice(0, 8);
    }
  };

  const displayedProducts = filterProducts();

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(100);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      updateScrollState();
      return () => {
        el.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [displayedProducts, viewMode]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollRail = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.product-card');
      const scrollAmount = card ? card.offsetWidth + 16 : 280;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="featured-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Sparkles size={14} className="inline-icon" /> Selected Haute Joaillerie
          </span>
          <h2 className="section-title">Featured Creations</h2>
          <p className="section-desc">
            Handcrafted with architectural precision and set with brilliant conflict-free gems that hold timeless significance.
          </p>

          {/* Filter Tabs - Horizontally scrollable on mobile */}
          <div className="tab-buttons-wrap">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              All Masterpieces
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'bestsellers' ? 'active' : ''}`}
              onClick={() => handleTabChange('bestsellers')}
            >
              Bestsellers
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => handleTabChange('new')}
            >
              New Arrivals 2026
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'rings' ? 'active' : ''}`}
              onClick={() => handleTabChange('rings')}
            >
              Diamond Rings
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Bar (Swipe Rail vs 2-Column Grid) */}
        <div className="featured-mobile-controls">
          <div className="mobile-view-toggle-group">
            <button
              type="button"
              className={`view-mode-pill-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              aria-label="Swipe Rail View"
            >
              <Columns size={14} />
              <span>Swipe Rail</span>
            </button>
            <button
              type="button"
              className={`view-mode-pill-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="2-Column Grid View"
            >
              <LayoutGrid size={14} />
              <span>2-Col Grid</span>
            </button>
          </div>
          <span className="featured-mobile-count-badge">
            {displayedProducts.length} items
          </span>
        </div>

        {/* Product Display: Swipe Carousel Rail or 2-Col Mobile Grid */}
        {viewMode === 'carousel' ? (
          <div className="featured-carousel-wrapper">
            {/* Arrow Nav Left */}
            {canScrollLeft && (
              <button
                type="button"
                className="carousel-side-nav-btn prev"
                onClick={() => scrollRail('prev')}
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Arrow Nav Right */}
            {canScrollRight && (
              <button
                type="button"
                className="carousel-side-nav-btn next"
                onClick={() => scrollRail('next')}
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div className="products-carousel-rail" ref={scrollRef}>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>

            {/* Mobile Progress Bar & Swipe Hint */}
            <div className="carousel-progress-track-wrap">
              <div className="carousel-progress-track">
                <div
                  className="carousel-progress-fill"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
              <span className="carousel-swipe-hint">
                Swipe sideways to view more creations &rarr;
              </span>
            </div>
          </div>
        ) : (
          <div className="products-grid mobile-grid-2col">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="view-more-container text-center">
          <Link to="/shop" className="btn-outline-luxury">
            <span>View All Creations ({PRODUCTS.length})</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

export default FeaturedSection;
