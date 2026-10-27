import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from './StarRating';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedMetal, setSelectedMetal] = useState(product?.defaultMetal || product?.metals[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quickview-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Gallery side */}
          <div className="quickview-gallery">
            <div className="quickview-main-img-wrap">
              <img 
                src={product.images[activeImgIndex] || product.images[0]} 
                alt={product.name} 
                className="quickview-main-img" 
              />
            </div>
            {product.images.length > 1 && (
              <div className="quickview-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`qv-thumb-btn ${activeImgIndex === i ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(i)}
                  >
                    <img src={img} alt={`Thumb ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details side */}
          <div className="quickview-info">
            <span className="qv-category">{product.categoryName}</span>
            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-meta-row">
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={15} />
              <span className="qv-stock-badge">In Stock &bull; Ready to Ship</span>
            </div>

            <div className="qv-price-row">
              <span className="qv-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="qv-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="qv-desc">{product.shortDesc}</p>

            {/* Metal Selection */}
            {product.metals && (
              <div className="qv-option-group">
                <label className="qv-option-label">Metal: <strong>{selectedMetal}</strong></label>
                <div className="qv-metal-pills">
                  {product.metals.map((m) => (
                    <button
                      key={m}
                      className={`qv-metal-pill ${selectedMetal === m ? 'selected' : ''}`}
                      onClick={() => setSelectedMetal(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="qv-option-group">
                <label className="qv-option-label">Size: <strong>{selectedSize}</strong></label>
                <div className="qv-size-pills">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`qv-size-pill ${selectedSize === s ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="qv-actions-row">
              <div className="qv-quantity-counter">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button className="qv-add-btn" onClick={handleAdd}>
                <ShoppingBag size={18} />
                <span>Add to Shopping Bag</span>
              </button>

              <button 
                className={`qv-wish-btn ${isFav ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={isFav ? '#C5A059' : 'none'} color={isFav ? '#C5A059' : '#1A1A1A'} />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="qv-trust-features">
              <div className="qv-trust-line">
                <Truck size={16} /> <span>Complimentary Insured Overnight Shipping</span>
              </div>
              <div className="qv-trust-line">
                <ShieldCheck size={16} /> <span>Certificate of Authenticity &amp; Lifetime Warranty</span>
              </div>
            </div>

            {/* Full product page link */}
            <div className="qv-full-link-wrap">
              <Link to={`/product/${product.id}`} onClick={onClose} className="qv-full-link">
                View complete specifications &amp; diamond credentials <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
