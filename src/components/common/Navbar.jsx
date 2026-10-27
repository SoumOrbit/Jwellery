import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Diamond, 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  PhoneCall,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';

const Navbar = () => {
  const { totalCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setShopDropdownOpen(false);
  }, [location.pathname]);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.categoryName.toLowerCase().includes(q) ||
             p.shortDesc.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(matched);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Luxury Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content container">
          <span className="announcement-item">
            <Sparkles size={13} className="inline-icon" /> Complimentary Insured Express Shipping Over ₹5,000
          </span>
          <span className="announcement-item hide-mobile">
            <ShieldCheck size={13} className="inline-icon" /> 100% Conflict-Free Certified Diamonds &amp; 18K Recycled Gold
          </span>
          <span className="announcement-item hide-tablet">
            <PhoneCall size={13} className="inline-icon" /> Concierge Hotline: +1 (800) 589-LUXE
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="nav-main-wrapper">
        <div className="container nav-main">
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Lumière Haute Joaillerie Home">
            <div className="logo-emblem">
              <Diamond size={24} strokeWidth={1.8} className="gem-icon" />
            </div>
            <div className="logo-text-group">
              <span className="brand-name">LUMIÈRE</span>
              <span className="brand-tagline">HAUTE JOAILLERIE PARIS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>

            {/* Shop with Dropdown */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <NavLink to="/shop" className={({ isActive }) => `nav-link has-dropdown ${isActive ? 'active' : ''}`}>
                Shop <ChevronDown size={14} className={`dropdown-arrow ${shopDropdownOpen ? 'rotate' : ''}`} />
              </NavLink>

              {shopDropdownOpen && (
                <div className="dropdown-mega-menu">
                  <div className="dropdown-inner">
                    <div className="dropdown-column">
                      <h4 className="dropdown-heading">Fine Jewelry</h4>
                      <Link to="/shop" className="dropdown-link">Explore All Pieces</Link>
                      <Link to="/shop?category=rings" className="dropdown-link">Rings &amp; Solitaires</Link>
                      <Link to="/shop?category=necklaces" className="dropdown-link">Necklaces &amp; Pendants</Link>
                      <Link to="/shop?category=earrings" className="dropdown-link">Earrings &amp; Huggies</Link>
                      <Link to="/shop?category=bracelets" className="dropdown-link">Bracelets &amp; Tennis Cuffs</Link>
                    </div>

                    <div className="dropdown-column">
                      <h4 className="dropdown-heading">Curated Edits</h4>
                      <Link to="/shop?filter=bestseller" className="dropdown-link">The Bestsellers</Link>
                      <Link to="/shop?filter=new" className="dropdown-link">New Arrivals 2026</Link>
                      <Link to="/shop?metal=Platinum" className="dropdown-link">The Platinum Suite</Link>
                      <Link to="/shop?metal=18K+Yellow+Gold" className="dropdown-link">18K Solid Gold</Link>
                    </div>

                    <div className="dropdown-featured-card">
                      <img 
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80" 
                        alt="The Celestial Solitaire" 
                        className="dropdown-card-img"
                      />
                      <div className="dropdown-card-overlay">
                        <span className="dropdown-card-sub">Iconic Solitaire</span>
                        <p className="dropdown-card-title">The Celestial Ring</p>
                        <Link to="/shop?category=rings" className="dropdown-card-cta">
                          Discover <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Atelier &amp; Story
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Concierge &amp; Boutiques
            </NavLink>
          </nav>

          {/* Right Utilities (Search, Wishlist, Cart) */}
          <div className="nav-utilities">
            {/* Search Toggle */}
            <button 
              className="utility-btn search-toggle" 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search catalog"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="utility-btn wishlist-btn" aria-label="View Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="counter-badge pulse-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart Bag Link */}
            <Link to="/cart" className="utility-btn cart-btn" aria-label="Shopping Bag">
              <div className="cart-icon-wrap">
                <ShoppingBag size={20} />
                {totalCount > 0 && (
                  <span className="counter-badge">{totalCount}</span>
                )}
              </div>
              <div className="cart-subtotal hide-mobile">
                <span className="cart-subtotal-label">Bag</span>
                <span className="cart-subtotal-val">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Live Search Overlay */}
        {searchOpen && (
          <div className="search-overlay" ref={searchContainerRef}>
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search size={22} className="search-form-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for diamonds, emeralds, engagement rings, tennis bracelets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={18} />
                  </button>
                )}
                <button type="submit" className="search-submit-btn">
                  Search
                </button>
                <button 
                  type="button" 
                  className="close-search-overlay"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={22} />
                </button>
              </form>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="search-dropdown-results">
                  <div className="search-results-header">
                    <span>Suggested Creations ({searchResults.length})</span>
                    <Link 
                      to={`/shop?q=${encodeURIComponent(searchQuery)}`} 
                      onClick={() => setSearchOpen(false)}
                      className="view-all-results"
                    >
                      View all results &rarr;
                    </Link>
                  </div>
                  <div className="search-results-grid">
                    {searchResults.map(item => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="search-item-card"
                        onClick={() => setSearchOpen(false)}
                      >
                        <img src={item.images[0]} alt={item.name} className="search-item-img" />
                        <div className="search-item-info">
                          <span className="search-item-cat">{item.categoryName}</span>
                          <h5 className="search-item-name">{item.name}</h5>
                          <span className="search-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Responsive Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="drawer-panel">
          <div className="drawer-header">
            <div className="drawer-logo">
              <Diamond size={20} className="gem-icon" />
              <span className="drawer-brand">LUMIÈRE</span>
            </div>
            <button 
              className="drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="drawer-body">
            <nav className="mobile-nav-links">
              <NavLink to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/shop" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Explore All Jewelry
              </NavLink>

              <div className="mobile-category-list">
                <span className="mobile-cat-header">Categories</span>
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/shop?category=${cat.id}`}
                    className="mobile-sub-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <span className="mobile-cat-count">{cat.itemCount}</span>
                  </Link>
                ))}
              </div>

              <NavLink to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Atelier Heritage &amp; Craft
              </NavLink>
              <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Concierge &amp; Boutiques
              </NavLink>
              <NavLink to="/wishlist" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Saved Wishlist ({wishlistCount})
              </NavLink>
              <NavLink to="/cart" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Shopping Bag ({totalCount}) - ₹{subtotal.toLocaleString('en-IN')}
              </NavLink>
            </nav>

            <div className="drawer-footer">
              <p className="drawer-concierge-title">Bespoke Concierge</p>
              <p className="drawer-concierge-phone">+1 (800) 589-LUXE</p>
              <p className="drawer-concierge-hours">Mon - Sat: 9:00 AM - 8:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
