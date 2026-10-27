import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  X, 
  Search, 
  Grid, 
  List, 
  Sparkles, 
  Check, 
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';

const METALS_LIST = ['18K Yellow Gold', 'Platinum', '18K Rose Gold', '18K White Gold'];

const ShopPage = () => {
  const { productsList } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Extract query filters
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter') || '';
  const metalParam = searchParams.get('metal') || '';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedMetals, setSelectedMetals] = useState(metalParam ? [metalParam] : []);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync state if URL searchParams change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchTerm(searchParams.get('q') || '');
    if (searchParams.get('metal')) {
      setSelectedMetals([searchParams.get('metal')]);
    }
  }, [searchParams]);

  const toggleMetal = (metal) => {
    setSelectedMetals(prev => 
      prev.includes(metal) ? prev.filter(m => m !== metal) : [...prev, metal]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSelectedMetals([]);
    setMaxPrice(6000);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return productsList.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search keyword filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.shortDesc.toLowerCase().includes(q);
        const matchCat = item.categoryName.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      // Predefined badges filter (e.g. from homepage links)
      if (filterParam === 'bestseller' && item.badge !== 'Bestseller' && item.rating < 4.9) {
        return false;
      }
      if (filterParam === 'new' && !item.isNew && item.badge !== 'New Arrival') {
        return false;
      }

      // Metal filter
      if (selectedMetals.length > 0) {
        const hasMatchingMetal = item.metals.some(m => selectedMetals.includes(m));
        if (!hasMatchingMetal) return false;
      }

      // Price filter
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0; // 'featured' default
    });
  }, [selectedCategory, searchTerm, filterParam, selectedMetals, maxPrice, sortBy, productsList]);

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchTerm ? 1 : 0) +
    selectedMetals.length +
    (maxPrice < 6000 ? 1 : 0);

  return (
    <div className="shop-page">
      {/* Page Header Banner */}
      <div className="shop-hero-header">
        <div className="container">
          <span className="shop-hero-badge">
            <Sparkles size={14} className="inline-icon" /> Haute Joaillerie Catalog
          </span>
          <h1 className="shop-hero-title">
            {selectedCategory !== 'all' 
              ? `${selectedCategory.toUpperCase()} COLLECTION`
              : 'FINE JEWELRY & HIGH CREATIONS'}
          </h1>
          <p className="shop-hero-desc">
            Explore our meticulously sculpted jewels, handcrafted in pure 18K solid gold and platinum with certified conflict-free diamonds.
          </p>

          {/* Quick Category Tabs */}
          <div className="shop-category-pills">
            <button
              className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory('all');
                setSearchParams({});
              }}
            >
              All Creations
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchParams({ category: cat.id });
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container shop-layout-container">
        {/* Top Controls Bar */}
        <div className="shop-controls-bar">
          <div className="controls-left">
            <button
              className="mobile-filter-trigger-btn"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={18} />
              <span>Filter &amp; Refine</span>
              {activeFilterCount > 0 && (
                <span className="filter-count-chip">{activeFilterCount}</span>
              )}
            </button>

            <span className="results-count-text">
              Showing <strong>{filteredProducts.length}</strong> of {productsList.length} creations
            </span>
          </div>

          <div className="controls-right">
            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-buttons hide-mobile">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid with Sidebar */}
        <div className="shop-main-content">
          {/* Desktop Filter Sidebar */}
          <aside className={`shop-sidebar ${isMobileFilterOpen ? 'sidebar-mobile-open' : ''}`}>
            <div className="sidebar-inner">
              <div className="sidebar-header">
                <div className="sidebar-title-group">
                  <SlidersHorizontal size={18} />
                  <h3>Refine Selection</h3>
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="clear-filters-btn">
                    <RefreshCw size={12} /> Reset
                  </button>
                )}
                <button 
                  className="sidebar-close-mobile" 
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Inside Catalog */}
              <div className="filter-group">
                <h4 className="filter-heading">Search Catalog</h4>
                <div className="filter-search-box">
                  <Search size={16} className="filter-search-icon" />
                  <input
                    type="text"
                    placeholder="E.g., Solitaire, Emerald, Tennis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="clear-small-btn">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="filter-heading">Category</h4>
                <div className="filter-options-list">
                  <label className="filter-radio-label">
                    <input
                      type="radio"
                      name="cat-radio"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                    />
                    <span className="custom-radio"></span>
                    <span>All Fine Jewelry ({productsList.length})</span>
                  </label>
                  {CATEGORIES.map(cat => {
                    const count = productsList.filter(p => p.category === cat.id).length;
                    return (
                      <label key={cat.id} className="filter-radio-label">
                        <input
                          type="radio"
                          name="cat-radio"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                        />
                        <span className="custom-radio"></span>
                        <span>{cat.name} ({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Metal & Precious Alloy */}
              <div className="filter-group">
                <h4 className="filter-heading">Precious Metal</h4>
                <div className="filter-options-list">
                  {METALS_LIST.map(metal => {
                    const isChecked = selectedMetals.includes(metal);
                    return (
                      <label key={metal} className="filter-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleMetal(metal)}
                        />
                        <span className="custom-checkbox">
                          {isChecked && <Check size={12} />}
                        </span>
                        <span>{metal}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="filter-group">
                <div className="price-filter-header">
                  <h4 className="filter-heading">Max Price</h4>
                  <span className="price-val-display">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-range-limits">
                  <span>₹1,000</span>
                  <span>₹6,000+</span>
                </div>
              </div>

              {/* Mobile apply button */}
              <div className="mobile-filter-apply-btn hide-desktop">
                <button 
                  className="btn-primary w-full"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredProducts.length} items)
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="shop-products-main">
            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <div className="no-products-icon">
                  <Sparkles size={40} className="text-gold" />
                </div>
                <h3>No Creations Found</h3>
                <p>We could not find any pieces matching your specified refinement criteria.</p>
                <button onClick={resetFilters} className="btn-primary mt-3">
                  <span>Reset All Filters</span>
                  <RefreshCw size={16} />
                </button>
              </div>
            ) : (
              <div className={`catalog-products-container ${viewMode === 'list' ? 'list-layout' : 'grid-layout'}`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopPage;
