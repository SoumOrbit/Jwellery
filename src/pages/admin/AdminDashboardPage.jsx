import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Diamond, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Calendar, 
  LogOut, 
  Plus, 
  Trash2, 
  Search, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Eye, 
  X,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Tag,
  ShieldAlert,
  Pencil
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CATEGORIES } from '../../data/products';

const AdminDashboardPage = () => {
  const { 
    isAdminLoggedIn, 
    adminUser, 
    logout, 
    productsList, 
    addProduct, 
    updateProduct,
    deleteProduct, 
    toggleStock,
    orders, 
    updateOrderStatus,
    deleteOrder,
    appointments, 
    updateAppointmentStatus,
    deleteAppointment,
    metrics 
  } = useAdmin();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'appointments'
  const [productSearch, setProductSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'rings',
    categoryName: 'Rings',
    price: '',
    originalPrice: '',
    badge: 'New Arrival',
    shortDesc: '',
    description: '',
    imageUrl: '',
    carat: '1.50 ct',
    clarity: 'VVS1',
    color: 'E (Colorless)',
    cut: 'Super Ideal',
    certification: 'GIA Certified',
    metals: ['18K Yellow Gold', 'Platinum'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8']
  });

  // Edit product form state
  const [editProductForm, setEditProductForm] = useState(null);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const catObj = CATEGORIES.find(c => c.id === newProductForm.category);

    addProduct({
      name: newProductForm.name,
      category: newProductForm.category,
      categoryName: catObj ? catObj.name : 'Fine Jewelry',
      price: Number(newProductForm.price),
      originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : null,
      badge: newProductForm.badge,
      shortDesc: newProductForm.shortDesc,
      description: newProductForm.description,
      images: [newProductForm.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'],
      specs: {
        carat: newProductForm.carat,
        clarity: newProductForm.clarity,
        color: newProductForm.color,
        cut: newProductForm.cut,
        certification: newProductForm.certification
      },
      metals: newProductForm.metals,
      defaultMetal: newProductForm.metals[0],
      sizes: newProductForm.sizes,
      isNew: true,
      isFeatured: true
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewProductForm({
      name: '',
      category: 'rings',
      categoryName: 'Rings',
      price: '',
      originalPrice: '',
      badge: 'New Arrival',
      shortDesc: '',
      description: '',
      imageUrl: '',
      carat: '1.50 ct',
      clarity: 'VVS1',
      color: 'E (Colorless)',
      cut: 'Super Ideal',
      certification: 'GIA Certified',
      metals: ['18K Yellow Gold', 'Platinum'],
      sizes: ['US 5', 'US 6', 'US 7', 'US 8']
    });
  };

  const handleOpenEditModal = (product) => {
    setEditProductForm({
      id: product.id,
      serialNo: product.serialNo,
      name: product.name,
      category: product.category,
      categoryName: product.categoryName,
      price: product.price,
      originalPrice: product.originalPrice || '',
      badge: product.badge || '',
      shortDesc: product.shortDesc || '',
      description: product.description || '',
      imageUrl: product.images && product.images[0] ? product.images[0] : '',
      carat: product.specs?.carat || '1.50 ct',
      clarity: product.specs?.clarity || 'VVS1',
      color: product.specs?.color || 'E (Colorless)',
      cut: product.specs?.cut || 'Super Ideal',
      certification: product.specs?.certification || 'GIA Certified',
      inStock: product.inStock !== false
    });
    setIsEditModalOpen(true);
  };

  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (!editProductForm) return;

    const catObj = CATEGORIES.find(c => c.id === editProductForm.category);

    updateProduct(editProductForm.id, {
      name: editProductForm.name,
      category: editProductForm.category,
      categoryName: catObj ? catObj.name : editProductForm.categoryName,
      price: Number(editProductForm.price),
      originalPrice: editProductForm.originalPrice ? Number(editProductForm.originalPrice) : null,
      badge: editProductForm.badge,
      shortDesc: editProductForm.shortDesc,
      description: editProductForm.description,
      images: [editProductForm.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'],
      specs: {
        carat: editProductForm.carat,
        clarity: editProductForm.clarity,
        color: editProductForm.color,
        cut: editProductForm.cut,
        certification: editProductForm.certification
      },
      inStock: editProductForm.inStock
    });

    setIsEditModalOpen(false);
    setEditProductForm(null);
  };

  const filteredProducts = productsList.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="admin-dashboard-layout">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <Diamond size={24} className="text-gold" />
          <div className="brand-texts">
            <span className="brand-name">LUMIÈRE</span>
            <span className="brand-tag">Atelier Director Portal</span>
          </div>
        </div>

        <div className="admin-nav-right">
          <Link to="/" target="_blank" className="admin-storefront-btn">
            <ExternalLink size={15} /> <span>View Storefront</span>
          </Link>
          <div className="admin-user-pill">
            <div className="user-avatar">{adminUser.name[0]}</div>
            <div className="user-meta">
              <strong>{adminUser.name}</strong>
              <span>{adminUser.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Grid: Sidebar + Workspace */}
      <div className="admin-main-container">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          <nav className="admin-tabs-list">
            <button
              className={`admin-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              className={`admin-tab-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} />
              <span>Jewelry Inventory ({productsList.length})</span>
            </button>

            <button
              className={`admin-tab-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} />
              <span>Client Orders ({orders.length})</span>
            </button>

            <button
              className={`admin-tab-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar size={18} />
              <span>Salon Inquiries ({appointments.length})</span>
              {metrics.pendingAppointmentsCount > 0 && (
                <span className="tab-pill-badge">{metrics.pendingAppointmentsCount}</span>
              )}
            </button>
          </nav>

          <div className="sidebar-security-badge">
            <ShieldAlert size={14} className="text-gold" />
            <span>Vault Status: Fully Secured</span>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="admin-workspace">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-view overview-view">
              <div className="view-title-bar">
                <div>
                  <h1 className="view-heading">Atelier Performance Overview</h1>
                  <p className="view-subheading">Real-time metrics on high jewelry sales, atelier orders, and client appointments.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary btn-sm">
                  <Plus size={16} /> <span>Add New Creation</span>
                </button>
              </div>

              {/* Stat Metric Cards */}
              <div className="admin-metrics-grid">
                <div className="metric-card">
                  <div className="metric-top">
                    <span className="metric-title">Gross Acquisition Revenue</span>
                    <div className="metric-icon-box text-gold"><DollarSign size={20} /></div>
                  </div>
                  <span className="metric-value">₹{metrics.totalRevenue.toLocaleString('en-IN')}</span>
                  <div className="metric-footer text-success">
                    <TrendingUp size={14} /> <span>+18.4% vs previous quarter</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-top">
                    <span className="metric-title">Active Client Orders</span>
                    <div className="metric-icon-box text-gold"><ShoppingBag size={20} /></div>
                  </div>
                  <span className="metric-value">{metrics.totalOrdersCount}</span>
                  <div className="metric-footer text-muted">
                    <span>100% Insured Priority Transport</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-top">
                    <span className="metric-title">Catalog Masterpieces</span>
                    <div className="metric-icon-box text-gold"><Package size={20} /></div>
                  </div>
                  <span className="metric-value">{metrics.totalProductsCount}</span>
                  <div className="metric-footer text-muted">
                    <span>Consecutive ID Sequencing</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-top">
                    <span className="metric-title">Pending Salon Inquiries</span>
                    <div className="metric-icon-box text-gold"><Calendar size={20} /></div>
                  </div>
                  <span className="metric-value">{metrics.pendingAppointmentsCount}</span>
                  <div className="metric-footer text-gold">
                    <span>Awaiting Concierge Confirmation</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="admin-content-card mt-4">
                <div className="card-heading-row">
                  <h3>Recent Haute Joaillerie Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="view-more-text">
                    View All Orders &rarr;
                  </button>
                </div>
                <div className="admin-table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th># ID</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((ord, index) => (
                        <tr key={ord.id}>
                          <td>
                            <div className="consecutive-id-pill">
                              <span className="id-seq-num">#{index + 1}</span>
                              <span className="id-code-text">{ord.id}</span>
                            </div>
                          </td>
                          <td>
                            <div>{ord.customer}</div>
                            <small className="text-muted">{ord.email}</small>
                          </td>
                          <td>{ord.date}</td>
                          <td><strong>₹{ord.total.toLocaleString('en-IN')}</strong></td>
                          <td>
                            <span className={`status-pill status-${ord.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td>{ord.shippingMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS / INVENTORY */}
          {activeTab === 'products' && (
            <div className="tab-view products-view">
              <div className="view-title-bar">
                <div>
                  <h1 className="view-heading">Jewelry Inventory &amp; Catalog</h1>
                  <p className="view-subheading">Manage prices, descriptions, specifications, and stock availability across all collections.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary btn-sm">
                  <Plus size={16} /> <span>Add New Creation</span>
                </button>
              </div>

              <div className="admin-filter-bar">
                <div className="search-filter-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <span className="table-count-label">
                  Showing {filteredProducts.length} of {productsList.length} items (Strictly Consecutive)
                </span>
              </div>

              <div className="admin-content-card">
                <div className="admin-table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th># ID</th>
                        <th>Preview</th>
                        <th>Creation Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Metals</th>
                        <th>Stock Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p, index) => (
                        <tr key={p.id}>
                          <td>
                            <div className="consecutive-id-pill">
                              <span className="id-seq-num">#{index + 1}</span>
                              <span className="id-code-text">{p.id}</span>
                            </div>
                          </td>
                          <td>
                            <img src={p.images[0]} alt={p.name} className="table-product-thumb" />
                          </td>
                          <td>
                            <strong>{p.name}</strong>
                            {p.badge && <span className="product-table-badge">{p.badge}</span>}
                          </td>
                          <td>{p.categoryName}</td>
                          <td>
                            <strong>₹{p.price.toLocaleString('en-IN')}</strong>
                            {p.originalPrice && (
                              <small className="strike-text ml-1">₹{p.originalPrice.toLocaleString('en-IN')}</small>
                            )}
                          </td>
                          <td>
                            <small>{p.metals.join(', ')}</small>
                          </td>
                          <td>
                            <button
                              onClick={() => toggleStock(p.id)}
                              className={`stock-toggle-btn ${p.inStock ? 'in-stock' : 'out-stock'}`}
                            >
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td>
                            <div className="table-action-btns">
                              <Link 
                                to={`/product/${p.id}`} 
                                target="_blank"
                                className="action-btn-view"
                                title="View live page"
                              >
                                <Eye size={15} />
                              </Link>
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="action-btn-edit"
                                title="Edit creation"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete creation "${p.name}"? Remaining pieces will be resequenced consecutively.`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="action-btn-delete"
                                title="Delete creation"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="tab-view orders-view">
              <div className="view-title-bar">
                <div>
                  <h1 className="view-heading">Client Acquisitions &amp; Orders</h1>
                  <p className="view-subheading">Track fulfillment status, courier dispatch, and atelier inspection for each piece.</p>
                </div>
              </div>

              <div className="admin-content-card">
                <div className="admin-table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th># ID</th>
                        <th>Client Details</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total Value</th>
                        <th>Fulfillment Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord, index) => (
                        <tr key={ord.id}>
                          <td>
                            <div className="consecutive-id-pill">
                              <span className="id-seq-num">#{index + 1}</span>
                              <span className="id-code-text">{ord.id}</span>
                            </div>
                          </td>
                          <td>
                            <div>{ord.customer}</div>
                            <small className="text-muted">{ord.email}</small>
                          </td>
                          <td>{ord.date}</td>
                          <td>
                            <span className="items-chip">{ord.itemsCount || ord.items?.length || 1} Items</span>
                          </td>
                          <td><strong>₹{ord.total.toLocaleString('en-IN')}</strong></td>
                          <td>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="status-select-control"
                            >
                              <option value="In Atelier Inspection">In Atelier Inspection</option>
                              <option value="Crafting in Atelier">Crafting in Atelier</option>
                              <option value="Shipped">Shipped (Insured Courier)</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete order "${ord.id}"? Remaining orders will be resequenced consecutively.`)) {
                                  deleteOrder(ord.id);
                                }
                              }}
                              className="action-btn-delete"
                              title="Delete order"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SALON INQUIRIES */}
          {activeTab === 'appointments' && (
            <div className="tab-view appointments-view">
              <div className="view-title-bar">
                <div>
                  <h1 className="view-heading">Salon Viewings &amp; Consultations</h1>
                  <p className="view-subheading">Private salon requests and bespoke design inquiries submitted by clients.</p>
                </div>
              </div>

              <div className="appointments-list-grid">
                {appointments.map((apt, index) => (
                  <div key={apt.id} className="apt-card">
                    <div className="apt-card-header">
                      <div>
                        <div className="consecutive-id-pill mb-1">
                          <span className="id-seq-num">#{index + 1}</span>
                          <span className="id-code-text">{apt.id}</span>
                        </div>
                        <h3 className="apt-client-name">{apt.name}</h3>
                      </div>
                      <div className="apt-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          value={apt.status}
                          onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                          className={`apt-status-select ${apt.status === 'Confirmed' ? 'confirmed' : 'pending'}`}
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete inquiry "${apt.id}"? Remaining inquiries will be resequenced consecutively.`)) {
                              deleteAppointment(apt.id);
                            }
                          }}
                          className="action-btn-delete"
                          title="Delete inquiry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="apt-details-body">
                      <div className="apt-line">
                        <strong>Salon:</strong> <span>{apt.boutique}</span>
                      </div>
                      <div className="apt-line">
                        <strong>Desired Date:</strong> <span>{apt.date || 'Flexible'}</span>
                      </div>
                      <div className="apt-line">
                        <strong>Interest:</strong> <span>{apt.serviceType}</span>
                      </div>
                      <div className="apt-line">
                        <strong>Contact:</strong> <span>{apt.email} | {apt.phone || 'No phone'}</span>
                      </div>
                      {apt.message && (
                        <div className="apt-message-box">
                          <em>"{apt.message}"</em>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="quickview-dialog admin-add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setIsAddModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-inner-padding">
              <h2 className="form-section-title">Introduce New Haute Joaillerie Creation</h2>
              <p className="text-muted mb-3">Add a new handcrafted piece to the public catalog with pricing and gemological credentials. Next consecutive ID will be automatically assigned.</p>

              <form onSubmit={handleAddProductSubmit} className="add-product-form">
                <div className="form-row-two">
                  <div className="form-field">
                    <label>Creation Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., The Reine Emerald Choker"
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Category *</label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                      className="form-control"
                    >
                      <option value="rings">Rings</option>
                      <option value="necklaces">Necklaces</option>
                      <option value="earrings">Earrings</option>
                      <option value="bracelets">Bracelets</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-three">
                  <div className="form-field">
                    <label>Acquisition Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="3500"
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Original Value / Strikethrough (₹)</label>
                    <input
                      type="number"
                      placeholder="3900"
                      value={newProductForm.originalPrice}
                      onChange={(e) => setNewProductForm({ ...newProductForm, originalPrice: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Collection Badge</label>
                    <input
                      type="text"
                      placeholder="Bestseller / New Arrival"
                      value={newProductForm.badge}
                      onChange={(e) => setNewProductForm({ ...newProductForm, badge: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>High-Resolution Image URL (Unsplash or Direct Link)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newProductForm.imageUrl}
                    onChange={(e) => setNewProductForm({ ...newProductForm, imageUrl: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Diamond / Gem Weight</label>
                    <input
                      type="text"
                      placeholder="1.80 ct"
                      value={newProductForm.carat}
                      onChange={(e) => setNewProductForm({ ...newProductForm, carat: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Grading Certification</label>
                    <input
                      type="text"
                      placeholder="GIA Certified"
                      value={newProductForm.certification}
                      onChange={(e) => setNewProductForm({ ...newProductForm, certification: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Short Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Concise summary for previews and cards..."
                    value={newProductForm.shortDesc}
                    onChange={(e) => setNewProductForm({ ...newProductForm, shortDesc: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-field">
                  <label>Complete Atelier Narrative &amp; Description</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Detailed craftsmanship narrative, metal origin, and prong setting details..."
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-action-row mt-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Plus size={16} /> <span>Publish to Catalog</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {isEditModalOpen && editProductForm && (
        <div className="modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="quickview-dialog admin-add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setIsEditModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-inner-padding">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h2 className="form-section-title" style={{ margin: 0 }}>Edit Haute Joaillerie Creation</h2>
                <div className="consecutive-id-pill">
                  <span className="id-seq-num">#{editProductForm.serialNo}</span>
                  <span className="id-code-text">{editProductForm.id}</span>
                </div>
              </div>
              <p className="text-muted mb-3">Update pricing, gemological specs, narrative, and inventory status. Consecutive ID is preserved.</p>

              <form onSubmit={handleEditProductSubmit} className="add-product-form">
                <div className="form-row-two">
                  <div className="form-field">
                    <label>Creation Name *</label>
                    <input
                      type="text"
                      required
                      value={editProductForm.name}
                      onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Category *</label>
                    <select
                      value={editProductForm.category}
                      onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                      className="form-control"
                    >
                      <option value="rings">Rings</option>
                      <option value="necklaces">Necklaces</option>
                      <option value="earrings">Earrings</option>
                      <option value="bracelets">Bracelets</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-three">
                  <div className="form-field">
                    <label>Acquisition Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editProductForm.price}
                      onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Original Value / Strikethrough (₹)</label>
                    <input
                      type="number"
                      value={editProductForm.originalPrice}
                      onChange={(e) => setEditProductForm({ ...editProductForm, originalPrice: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Collection Badge</label>
                    <input
                      type="text"
                      value={editProductForm.badge}
                      onChange={(e) => setEditProductForm({ ...editProductForm, badge: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>High-Resolution Image URL</label>
                  <input
                    type="url"
                    value={editProductForm.imageUrl}
                    onChange={(e) => setEditProductForm({ ...editProductForm, imageUrl: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Diamond / Gem Weight</label>
                    <input
                      type="text"
                      value={editProductForm.carat}
                      onChange={(e) => setEditProductForm({ ...editProductForm, carat: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-field">
                    <label>Grading Certification</label>
                    <input
                      type="text"
                      value={editProductForm.certification}
                      onChange={(e) => setEditProductForm({ ...editProductForm, certification: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Stock Availability Status</label>
                  <select
                    value={editProductForm.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditProductForm({ ...editProductForm, inStock: e.target.value === 'true' })}
                    className="form-control"
                  >
                    <option value="true">In Stock &amp; Available</option>
                    <option value="false">Out of Stock / In Atelier Crafting</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Short Description</label>
                  <input
                    type="text"
                    required
                    value={editProductForm.shortDesc}
                    onChange={(e) => setEditProductForm({ ...editProductForm, shortDesc: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-field">
                  <label>Complete Atelier Narrative &amp; Description</label>
                  <textarea
                    rows="3"
                    required
                    value={editProductForm.description}
                    onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-action-row mt-3">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Sparkles size={16} /> <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
