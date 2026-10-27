import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMoveToBag = (product) => {
    addToCart(product, product.defaultMetal || product.metals[0], product.sizes ? product.sizes[0] : null, 1);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToBag = () => {
    wishlist.forEach(item => {
      addToCart(item, item.defaultMetal || item.metals[0], item.sizes ? item.sizes[0] : null, 1);
    });
    clearWishlist();
    showToast('All favorites moved to your shopping bag!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container empty-wishlist-container text-center section-padding">
          <div className="empty-icon-box">
            <Heart size={48} className="text-gold" />
          </div>
          <h2 className="empty-title">Your Curated Wishlist is Empty</h2>
          <p className="empty-desc">
            Save your favorite creations by selecting the heart icon on any jewelry piece as you explore our collections.
          </p>
          <Link to="/shop" className="btn-primary mt-4">
            <span>Explore High Jewelry Collections</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container section-padding-sm">
        {/* Wishlist Header */}
        <div className="wishlist-header-bar">
          <div>
            <span className="wishlist-badge">
              <Sparkles size={14} className="inline-icon" /> Curated Desires
            </span>
            <h1 className="wishlist-title">Saved Creations ({wishlist.length})</h1>
          </div>

          <div className="wishlist-top-actions">
            <button 
              onClick={handleMoveAllToBag}
              className="btn-primary btn-sm"
            >
              <ShoppingBag size={16} />
              <span>Move All to Bag</span>
            </button>
            <button 
              onClick={clearWishlist}
              className="btn-text-clear"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="wishlist-grid">
          {wishlist.map(product => (
            <div key={product.id} className="wishlist-item-card">
              <div className="wishlist-media">
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="wishlist-item-body">
                <span className="wishlist-cat">{product.categoryName}</span>
                <h3 className="wishlist-item-title">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />

                <div className="wishlist-price-row">
                  <span className="item-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="item-orig-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <div className="wishlist-card-actions">
                  <button
                    className="btn-primary w-full"
                    onClick={() => handleMoveToBag(product)}
                  >
                    <ShoppingBag size={15} />
                    <span>Move to Shopping Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
