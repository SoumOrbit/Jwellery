import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award, 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  HelpCircle,
  Gem,
  Share2,
  Camera
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/common/ProductCard';
import ProductImageManagerModal from '../components/admin/ProductImageManagerModal';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productsList, updateProduct, isAdminLoggedIn } = useAdmin();
  const { addToCart, showToast } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const allProducts = productsList && productsList.length > 0 ? productsList : PRODUCTS;
  const product = allProducts.find(p => 
    String(p.id).toLowerCase() === String(id).toLowerCase() || 
    String(p.serialNo) === String(id) ||
    p.name.toLowerCase() === decodeURIComponent(id).toLowerCase()
  );

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('specs'); // 'specs' | 'shipping' | 'care'
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  // Admin Photo Upload & Management modal state (only accessible if logged in)
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedMetal(product.defaultMetal || product.metals[0]);
      setSelectedSize(product.sizes ? product.sizes[0] : 'Standard');
      setActiveImgIndex(0);
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container not-found-page text-center section-padding">
        <h2>Creation Not Found</h2>
        <p>The masterpiece you are seeking may have been retired or is currently unavailable.</p>
        <Link to="/shop" className="btn-primary mt-4">
          Return to High Jewelry Catalog
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Admin photo update handler (accessible only when authenticated as admin)
  const handleSavePhotos = (newImages) => {
    updateProduct(product.id, { images: newImages });
    setActiveImgIndex(0);
    showToast('Creation gallery & hover flip images updated successfully!', 'success');
  };

  // Related products from same category or featured
  const relatedProducts = allProducts.filter(
    p => p.id !== product?.id && (p.category === product?.category || p.isFeatured)
  ).slice(0, 4);

  return (
    <div className="product-detail-page">
      {/* Atelier Director Admin Ribbon (Visible ONLY if authenticated as Admin) */}
      {isAdminLoggedIn && (
        <div className="admin-product-control-ribbon">
          <div className="container">
            <div className="admin-ribbon-content">
              <div className="admin-ribbon-badge">
                <Sparkles size={14} className="text-gold" />
                <span>Atelier Director Admin Active</span>
              </div>
              <div className="admin-ribbon-actions">
                <button 
                  type="button"
                  className="btn-admin-manage-photos"
                  onClick={() => setShowPhotoModal(true)}
                >
                  <Camera size={15} />
                  <span>Upload &amp; Manage Photos</span>
                </button>
                <Link to="/admin" className="btn-admin-dashboard-link">
                  Admin Dashboard &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <div className="container">
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop">Shop</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
            <ChevronRight size={14} />
            <span className="current-crumb">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container product-detail-main section-padding-sm">
        <div className="detail-layout-grid">
          {/* Left Column: Gallery */}
          <div className="detail-gallery-col">
            <div className="main-image-display">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="main-gallery-img"
              />
              {product.badge && (
                <span className="gallery-badge">
                  <Sparkles size={12} className="inline-icon" /> {product.badge}
                </span>
              )}

              {/* Quick Admin Photo Upload Trigger on Gallery Image (Visible ONLY to authenticated Admin) */}
              {isAdminLoggedIn && (
                <button 
                  type="button"
                  className="gallery-admin-edit-trigger"
                  onClick={() => setShowPhotoModal(true)}
                  title="Upload or change photos for this creation"
                >
                  <Camera size={14} />
                  <span>Upload / Change Photos</span>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="gallery-thumbnails-strip">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb-button ${activeImgIndex === i ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(i)}
                    aria-label={`View angle ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} angle ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Commerce Actions */}
          <div className="detail-info-col">
            <div className="detail-header-meta">
              <span className="detail-category-tag">{product.categoryName}</span>
              <button onClick={handleShare} className="share-btn" aria-label="Share this creation">
                <Share2 size={16} /> <span>Share</span>
              </button>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-reviews-row">
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
              <span className="divider-dot">&bull;</span>
              <span className="in-stock-status">
                <Award size={14} className="text-gold" /> Guaranteed Authentic &amp; In Stock
              </span>
            </div>

            {/* Pricing */}
            <div className="detail-pricing-box">
              <span className="detail-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="detail-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="tax-inclusive-note">Includes Complimentary Insured Delivery &amp; Gift Box</span>
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Metal Selection */}
            {product.metals && product.metals.length > 0 && (
              <div className="detail-choice-block">
                <div className="choice-label-row">
                  <label className="choice-label">Precious Metal:</label>
                  <span className="choice-active-val">{selectedMetal}</span>
                </div>
                <div className="metal-options-list">
                  {product.metals.map((metal) => (
                    <button
                      key={metal}
                      className={`metal-choice-btn ${selectedMetal === metal ? 'selected' : ''}`}
                      onClick={() => setSelectedMetal(metal)}
                    >
                      <span className={`swatch-circle swatch-${metal.toLowerCase().replace(/\s+/g, '-')}`}></span>
                      <span>{metal}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="detail-choice-block">
                <div className="choice-label-row">
                  <label className="choice-label">Select Size / Length:</label>
                  <button 
                    type="button" 
                    className="size-guide-link"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                  >
                    <HelpCircle size={14} /> Size Guide
                  </button>
                </div>
                <div className="size-options-list">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-choice-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size guide dropdown snippet */}
                {showSizeGuide && (
                  <div className="size-guide-tip">
                    <p><strong>Unsure of your size?</strong> We provide a complimentary ring sizer kit mailed to your doorstep, or our concierge can arrange free post-purchase resizing within 60 days.</p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="detail-purchase-actions">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="step-val">{quantity}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button className="btn-primary flex-1" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add To Shopping Bag</span>
              </button>

              <button
                className={`wishlist-icon-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isFavorite ? '#C5A059' : 'none'} color={isFavorite ? '#C5A059' : '#1A1A1A'} />
              </button>
            </div>

            <button className="btn-buy-now" onClick={handleBuyNow}>
              Instant Luxury Checkout &rarr;
            </button>

            {/* Quick Guarantees */}
            <div className="detail-trust-pills">
              <div className="trust-pill">
                <Truck size={18} className="text-gold" />
                <span>Complimentary Armored Delivery</span>
              </div>
              <div className="trust-pill">
                <ShieldCheck size={18} className="text-gold" />
                <span>Lifetime Atelier Warranty</span>
              </div>
              <div className="trust-pill">
                <RefreshCw size={18} className="text-gold" />
                <span>30-Day Discreet Returns</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="detail-accordions">
              {/* Accordion 1: Specifications */}
              <div className={`accordion-card ${activeAccordion === 'specs' ? 'open' : ''}`}>
                <button
                  className="accordion-trigger"
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                >
                  <span className="accordion-title">
                    <Gem size={18} className="mr-2 inline" /> Gemstone &amp; Diamond Specifications
                  </span>
                  <ChevronDown size={18} className="accordion-icon" />
                </button>
                {activeAccordion === 'specs' && (
                  <div className="accordion-content">
                    <div className="specs-table">
                      <div className="spec-row">
                        <span className="spec-name">Carat Weight</span>
                        <span className="spec-val">{product.specs.carat}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-name">Clarity Grade</span>
                        <span className="spec-val">{product.specs.clarity}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-name">Color Grade</span>
                        <span className="spec-val">{product.specs.color}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-name">Cut Quality</span>
                        <span className="spec-val">{product.specs.cut}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-name">Accreditation</span>
                        <span className="spec-val">{product.specs.certification}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping */}
              <div className={`accordion-card ${activeAccordion === 'shipping' ? 'open' : ''}`}>
                <button
                  className="accordion-trigger"
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                >
                  <span className="accordion-title">
                    <Truck size={18} className="mr-2 inline" /> Insured Delivery &amp; Discreet Packaging
                  </span>
                  <ChevronDown size={18} className="accordion-icon" />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="accordion-content">
                    <p>
                      Every order is enclosed in our signature emerald-leather keepsake box, tied with grosgrain ribbon, and accompanied by the GIA dossier. The shipping exterior is completely unbranded for your privacy and security, shipped via insured priority courier requiring an adult signature.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care & Maintenance */}
              <div className={`accordion-card ${activeAccordion === 'care' ? 'open' : ''}`}>
                <button
                  className="accordion-trigger"
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                >
                  <span className="accordion-title">
                    <ShieldCheck size={18} className="mr-2 inline" /> Lifetime Care &amp; Resizing
                  </span>
                  <ChevronDown size={18} className="accordion-icon" />
                </button>
                {activeAccordion === 'care' && (
                  <div className="accordion-content">
                    <p>
                      Your creation includes complimentary annual prong inspection, deep ultrasonic cleaning, and rhodium rejuvenation at any of our global boutiques or via insured mail-in concierge service.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Pieces */}
        {relatedProducts.length > 0 && (
          <div className="related-creations-section section-padding">
            <div className="section-header text-center">
              <span className="section-subtitle">
                <Sparkles size={14} className="inline-icon" /> Harmonious Complements
              </span>
              <h2 className="section-title">You May Also Admire</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Photo Upload & Management Modal (Rendered ONLY if authenticated as Admin) */}
      {isAdminLoggedIn && (
        <ProductImageManagerModal
          isOpen={showPhotoModal}
          onClose={() => setShowPhotoModal(false)}
          product={product}
          onSave={handleSavePhotos}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
