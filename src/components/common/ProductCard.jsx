import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from './StarRating';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist ? isInWishlist(product.id) : false;
  const metalType = product.defaultMetal || (product.metals && product.metals[0]) || '18K Gold';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, metalType, product.sizes ? product.sizes[0] : null, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-media-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link">
          <div className="product-thumb-wrapper">
            <img 
              src={product.images && product.images[0] ? product.images[0] : ''} 
              alt={product.name} 
              className="product-thumb-image img-primary"
              loading="lazy"
            />
            {product.images && product.images[1] && product.images[1] !== product.images[0] && (
              <img 
                src={product.images[1]} 
                alt={`${product.name} alternate view`} 
                className="product-thumb-image img-secondary"
                loading="lazy"
              />
            )}
          </div>
        </Link>

        {/* Badges */}
        {product.badge && (
          <span className="product-badge">
            <Sparkles size={11} className="mr-1" /> {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          className={`card-action-btn wishlist-toggle ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorite ? '#C5A059' : 'none'} color={isFavorite ? '#C5A059' : '#1A1A1A'} />
        </button>

        {/* Quick View Button */}
        <button
          className="card-quick-view-btn"
          onClick={handleQuickViewClick}
          aria-label="Quick View"
        >
          <Eye size={15} /> <span>Quick View</span>
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-category-meta">
          <span className="product-cat-label">{product.categoryName}</span>
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Single Metal Type Badge */}
        {metalType && (
          <div className="card-metal-single">
            <span className="metal-type-badge">{metalType}</span>
          </div>
        )}

        <div className="product-price-row">
          <div className="price-box">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button 
            className="add-to-bag-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to shopping bag`}
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
