import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Tag, 
  X,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    coupon, 
    applyCoupon, 
    removeCoupon,
    subtotal, 
    discountAmount, 
    shippingFee, 
    taxAmount, 
    totalPrice 
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError('Invalid coupon. Try code "LUXE10"');
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container empty-cart-container text-center section-padding">
          <div className="empty-cart-icon-circle">
            <ShoppingBag size={48} className="text-gold" />
          </div>
          <h2 className="empty-cart-title">Your Shopping Bag is Empty</h2>
          <p className="empty-cart-desc">
            Your personal jewelry collection awaits. Explore our handcrafted creations in 18K solid gold and certified diamonds.
          </p>
          <div className="empty-cart-actions">
            <Link to="/shop" className="btn-primary">
              <span>Explore High Jewelry Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container section-padding-sm">
        {/* Page Header */}
        <div className="cart-header-title-bar">
          <h1 className="cart-page-title">Shopping Bag ({cartItems.length} {cartItems.length === 1 ? 'Creation' : 'Creations'})</h1>
          <button onClick={clearCart} className="clear-cart-text-btn">
            Clear Shopping Bag
          </button>
        </div>

        <div className="cart-layout-grid">
          {/* Left: Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-items-table-header hide-mobile">
              <span className="col-item">Creation</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Total</span>
              <span className="col-action"></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="cart-item-card">
                  {/* Thumbnail */}
                  <Link to={`/product/${item.id}`} className="cart-item-thumb">
                    <img src={item.images[0]} alt={item.name} />
                  </Link>

                  {/* Info */}
                  <div className="cart-item-details">
                    <span className="cart-item-category">{item.categoryName}</span>
                    <h3 className="cart-item-name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    
                    <div className="cart-item-variants">
                      <span className="variant-tag">Metal: <strong>{item.selectedMetal}</strong></span>
                      <span className="variant-tag">Size: <strong>{item.selectedSize}</strong></span>
                    </div>

                    <div className="cart-item-unit-price hide-desktop">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </div>
                  </div>

                  {/* Unit price desktop */}
                  <div className="cart-item-price hide-mobile">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="cart-item-quantity">
                    <div className="quantity-stepper-sm">
                      <button
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        className="qty-sm-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-sm-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        className="qty-sm-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  {/* Remove Button */}
                  <div className="cart-item-remove">
                    <button
                      onClick={() => removeFromCart(item.itemKey)}
                      className="remove-item-btn"
                      title="Remove from bag"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions-bottom">
              <Link to="/shop" className="btn-back-shop">
                <ArrowLeft size={16} /> <span>Continue Exploring Collections</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary-column">
            <div className="summary-box">
              <h2 className="summary-title">Order Summary</h2>

              {/* Promo code box */}
              <div className="promo-code-wrap">
                {coupon ? (
                  <div className="active-coupon-badge">
                    <div className="coupon-left">
                      <Tag size={16} className="text-gold" />
                      <div>
                        <strong>{coupon.code}</strong>
                        <span className="coupon-desc">{coupon.description}</span>
                      </div>
                    </div>
                    <button onClick={removeCoupon} className="remove-coupon-btn" aria-label="Remove coupon">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="promo-form">
                    <div className="promo-input-group">
                      <Tag size={16} className="promo-icon" />
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. LUXE10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="promo-input"
                      />
                      <button type="submit" className="promo-submit-btn">
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="promo-error-text">{promoError}</p>}
                    <button 
                      type="button" 
                      onClick={() => { setPromoInput('LUXE10'); }}
                      className="try-code-btn"
                    >
                      Tip: Use code <strong>LUXE10</strong> for 10% off
                    </button>
                  </form>
                )}
              </div>

              {/* Breakdown lines */}
              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {coupon && (
                  <div className="summary-line discount-line">
                    <span>VIP Privilege ({coupon.discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Insured Express Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-gold">COMPLIMENTARY</strong> : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                </div>

                <div className="summary-line">
                  <span>Estimated Sales Tax (8%)</span>
                  <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="summary-line summary-total-line">
                  <span className="total-label">Estimated Total (INR)</span>
                  <span className="total-value">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                className="btn-primary w-full checkout-cta-btn"
                onClick={() => navigate('/checkout')}
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="summary-trust-assurances">
                <div className="trust-row">
                  <Truck size={16} className="text-gold" />
                  <span>Complimentary Insured Overnight Delivery</span>
                </div>
                <div className="trust-row">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="trust-row">
                  <Sparkles size={16} className="text-gold" />
                  <span>Signature Emerald Keepsake Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
