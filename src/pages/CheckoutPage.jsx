import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  ChevronRight,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const CheckoutPage = () => {
  const { addOrder } = useAdmin();
  const { 
    cartItems, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    taxAmount, 
    totalPrice, 
    coupon, 
    clearCart 
  } = useCart();

  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 349-2810',
    address: '742 Evergreen Terrace',
    apt: 'Suite 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10021',
    country: 'United States',
    shippingMethod: 'express' // 'express' | 'white-glove'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'Eleanor Vance',
    expiry: '08/28',
    cvv: '888',
    paymentMethod: 'card' // 'card' | 'apple-pay'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const created = addOrder({
        customer: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        total: totalPrice,
        itemsCount: cartItems.length,
        items: cartItems.map(i => ({ name: i.name, metal: i.selectedMetal, price: i.price, qty: i.quantity })),
        shippingMethod: shippingInfo.shippingMethod === 'express' ? 'Armored Overnight' : 'White-Glove VIP Courier'
      });
      setOrderNumber(created.id);
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 1500);
  };

  // If cart is empty and not on success step, redirect to cart
  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="container text-center section-padding">
        <h2>Your Shopping Bag is Empty</h2>
        <p>Please add creations to your shopping bag before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary mt-3">
          Explore Fine Jewelry
        </Link>
      </div>
    );
  }

  // STEP 3: ORDER SUCCESS SCREEN
  if (step === 3) {
    return (
      <div className="checkout-success-page section-padding">
        <div className="container">
          <div className="success-card text-center">
            <div className="success-badge-wrap">
              <CheckCircle2 size={64} className="text-gold" />
            </div>

            <span className="success-sub">Order Confirmed &bull; Haute Joaillerie</span>
            <h1 className="success-title">Thank You For Your Acquisition</h1>
            <p className="order-number-tag">Order Reference: <strong>{orderNumber}</strong></p>

            <p className="success-desc">
              Your order has been assigned to our master jeweler for inspection and preparation in our signature emerald velvet keepsake box. A confirmation email and tracking itinerary have been dispatched to <strong>{shippingInfo.email}</strong>.
            </p>

            <div className="order-timeline-box">
              <div className="timeline-step active">
                <Package size={20} />
                <span>Order Placed</span>
              </div>
              <div className="timeline-line"></div>
              <div className="timeline-step">
                <Sparkles size={20} />
                <span>Atelier Inspection</span>
              </div>
              <div className="timeline-line"></div>
              <div className="timeline-step">
                <Truck size={20} />
                <span>Armored Delivery</span>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/shop" className="btn-primary">
                <span>Continue Exploring Collections</span>
                <ChevronRight size={16} />
              </Link>
              <Link to="/" className="btn-secondary">
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container section-padding-sm">
        {/* Checkout Header / Breadcrumb */}
        <div className="checkout-top-header">
          <Link to="/cart" className="back-to-cart-link">
            <ArrowLeft size={16} /> <span>Return to Bag</span>
          </Link>
          <div className="checkout-steps-indicator">
            <span className={`step-pill ${step === 1 ? 'active' : 'completed'}`}>
              1. Delivery Details
            </span>
            <ChevronRight size={14} />
            <span className={`step-pill ${step === 2 ? 'active' : ''}`}>
              2. Secure Payment
            </span>
          </div>
        </div>

        <div className="checkout-layout-grid">
          {/* Left: Form Area */}
          <div className="checkout-form-column">
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="checkout-form-card">
                <h2 className="form-section-title">Recipient &amp; Delivery Destination</h2>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Email Address for Tracking *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone Number (for Courier Confirmation) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-row-three">
                  <div className="form-field">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>State / Province *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Postal / Zip Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <h3 className="form-sub-title mt-4">Selected Shipping Service</h3>
                <div className="shipping-options-group">
                  <label className={`shipping-radio-box ${shippingInfo.shippingMethod === 'express' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingInfo.shippingMethod === 'express'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-content">
                      <div className="radio-title-row">
                        <strong>Armored Priority Overnight (FedEx / DHL)</strong>
                        <span className="price-tag text-gold">COMPLIMENTARY</span>
                      </div>
                      <p>Discreet, fully-insured delivery requiring direct adult signature.</p>
                    </div>
                  </label>

                  <label className={`shipping-radio-box ${shippingInfo.shippingMethod === 'white-glove' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="white-glove"
                      checked={shippingInfo.shippingMethod === 'white-glove'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-content">
                      <div className="radio-title-row">
                        <strong>White-Glove VIP Courier Presentation</strong>
                        <span className="price-tag">₹1,500</span>
                      </div>
                      <p>Hand-delivered by a bonded concierge liaison at your chosen hour.</p>
                    </div>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                  <span>Continue to Secure Payment</span>
                  <ChevronRight size={18} />
                </button>
              </form>
            ) : (
              /* STEP 2: PAYMENT FORM */
              <form onSubmit={handleCompleteOrder} className="checkout-form-card">
                <div className="payment-step-header">
                  <h2 className="form-section-title">Payment Method</h2>
                  <div className="secure-badge">
                    <Lock size={14} className="text-gold" />
                    <span>256-Bit Encrypted</span>
                  </div>
                </div>

                <div className="delivery-summary-snippet">
                  <div>
                    <span className="snippet-label">Delivering to:</span>
                    <strong>{shippingInfo.firstName} {shippingInfo.lastName}, {shippingInfo.city}, {shippingInfo.state}</strong>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="snippet-edit-btn">
                    Edit
                  </button>
                </div>

                <div className="payment-tabs-row">
                  <button
                    type="button"
                    className={`pay-tab-btn ${paymentInfo.paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: 'card' }))}
                  >
                    <CreditCard size={18} />
                    <span>Credit &amp; Debit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`pay-tab-btn ${paymentInfo.paymentMethod === 'apple-pay' ? 'active' : ''}`}
                    onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: 'apple-pay' }))}
                  >
                    <Sparkles size={18} />
                    <span>Apple Pay / Digital Wallet</span>
                  </button>
                </div>

                <div className="card-fields-container">
                  <div className="form-field">
                    <label>Name on Card</label>
                    <input
                      type="text"
                      name="cardHolder"
                      required
                      value={paymentInfo.cardHolder}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      className="form-control font-mono"
                    />
                  </div>

                  <div className="form-row-two">
                    <div className="form-field">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        value={paymentInfo.expiry}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className="form-control"
                      />
                    </div>
                    <div className="form-field">
                      <label>Security Code (CVV)</label>
                      <input
                        type="password"
                        name="cvv"
                        required
                        maxLength="4"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        className="form-control font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-security-notice">
                  <ShieldCheck size={20} className="text-gold" />
                  <p>
                    Your transaction is safeguarded by bank-level 256-bit encryption. We never retain your payment card details.
                  </p>
                </div>

                <div className="payment-action-buttons">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="btn-secondary"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn-primary flex-1"
                  >
                    {isProcessing ? (
                      <span>Authorizing Acquisition...</span>
                    ) : (
                      <span>Complete Order &bull; ₹{totalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary Preview */}
          <div className="checkout-summary-column">
            <div className="checkout-summary-box">
              <h3 className="summary-box-heading">Your Acquisition ({cartItems.length})</h3>

              <div className="checkout-items-preview">
                {cartItems.map(item => (
                  <div key={item.itemKey} className="checkout-item-row">
                    <img src={item.images[0]} alt={item.name} className="checkout-item-img" />
                    <div className="checkout-item-meta">
                      <h4 className="checkout-item-title">{item.name}</h4>
                      <span className="checkout-item-spec">{item.selectedMetal} &bull; {item.selectedSize}</span>
                      <span className="checkout-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="checkout-item-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-breakdown-lines">
                <div className="checkout-line">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {coupon && (
                  <div className="checkout-line discount-text">
                    <span>VIP Privilege ({coupon.discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="checkout-line">
                  <span>Insured Shipping</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="checkout-line">
                  <span>Estimated Tax</span>
                  <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="checkout-line total-checkout-line">
                  <span>Grand Total (INR)</span>
                  <span className="gold-total">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
