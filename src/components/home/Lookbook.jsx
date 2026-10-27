import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

const LOOKS = [
  {
    id: 'gala',
    title: 'The Evening Gala Ensemble',
    tagline: 'Cascading brilliance for unforgettable soirees',
    editorialImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    itemIds: ['lum-02', 'lum-03', 'lum-04']
  },
  {
    id: 'bridal',
    title: 'The Royal Bridal Suite',
    tagline: 'Timeless devotion expressed in pure platinum & diamonds',
    editorialImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    itemIds: ['lum-01', 'lum-12', 'lum-07']
  }
];

const Lookbook = () => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const { addToCart } = useCart();

  const currentLook = LOOKS[activeLookIndex];
  const pairedProducts = PRODUCTS.filter(p => currentLook.itemIds.includes(p.id));

  return (
    <section className="lookbook-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Sparkles size={14} className="inline-icon" /> Editorial Styling
          </span>
          <h2 className="section-title">Shop The Look</h2>
          <p className="section-desc">
            Explore harmonic pairings created by our head stylists, bringing effortless glamour to any occasion.
          </p>

          <div className="lookbook-tabs">
            {LOOKS.map((look, i) => (
              <button
                key={look.id}
                className={`look-tab-btn ${activeLookIndex === i ? 'active' : ''}`}
                onClick={() => setActiveLookIndex(i)}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        <div className="lookbook-display-grid">
          {/* Editorial Banner */}
          <div className="lookbook-editorial-col">
            <div className="lookbook-image-card">
              <img
                src={currentLook.editorialImage}
                alt={currentLook.title}
                className="lookbook-main-img"
                loading="lazy"
              />
              <div className="lookbook-editorial-overlay">
                <span className="lookbook-tag">Curated Edit</span>
                <h3 className="lookbook-title">{currentLook.title}</h3>
                <p className="lookbook-tagline">{currentLook.tagline}</p>
                <Link to="/shop" className="lookbook-cta">
                  <span>Explore Full Collection</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Paired Products List */}
          <div className="lookbook-products-col">
            <h4 className="paired-heading">Featured in this ensemble:</h4>
            <div className="paired-items-list">
              {pairedProducts.map(item => (
                <div key={item.id} className="paired-item-card">
                  <Link to={`/product/${item.id}`} className="paired-item-thumb">
                    <img src={item.images[0]} alt={item.name} />
                  </Link>

                  <div className="paired-item-details">
                    <span className="paired-item-cat">{item.categoryName}</span>
                    <h5 className="paired-item-name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h5>
                    <span className="paired-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="paired-item-actions">
                    <button
                      className="paired-add-btn"
                      onClick={() => addToCart(item, item.metals[0], item.sizes ? item.sizes[0] : null, 1)}
                      title="Add to Shopping Bag"
                      aria-label={`Add ${item.name} to bag`}
                    >
                      <ShoppingBag size={16} />
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      className="paired-view-btn"
                      title="View Details"
                      aria-label={`View ${item.name}`}
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="paired-summary-card">
              <div className="summary-left">
                <span className="summary-label">Complete Ensemble Total</span>
                <span className="summary-price">
                  ₹{pairedProducts.reduce((sum, i) => sum + i.price, 0).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                className="btn-primary btn-sm"
                onClick={() => {
                  pairedProducts.forEach(prod => {
                    addToCart(prod, prod.metals[0], prod.sizes ? prod.sizes[0] : null, 1);
                  });
                }}
              >
                <span>Add Full Look To Bag</span>
                <ShoppingBag size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
