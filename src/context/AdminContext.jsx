import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { api } from '../services/api';

const AdminContext = createContext();

// Helper to guarantee 100% strictly consecutive IDs: lum-01, lum-02, lum-03...
export const resequenceProducts = (list) => {
  return list.map((item, index) => {
    const seq = String(index + 1).padStart(2, '0');
    return {
      ...item,
      id: `lum-${seq}`,
      serialNo: index + 1
    };
  });
};

// Helper to guarantee strictly consecutive orders: ORD-01, ORD-02, ORD-03...
export const resequenceOrders = (list) => {
  return list.map((item, index) => {
    const seq = String(index + 1).padStart(2, '0');
    return {
      ...item,
      id: `ORD-${seq}`,
      serialNo: index + 1
    };
  });
};

// Helper to guarantee strictly consecutive appointments: APT-01, APT-02, APT-03...
export const resequenceAppointments = (list) => {
  return list.map((item, index) => {
    const seq = String(index + 1).padStart(2, '0');
    return {
      ...item,
      id: `APT-${seq}`,
      serialNo: index + 1
    };
  });
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-01',
    customer: 'Duchess Caroline Spencer',
    email: 'c.spencer@mayfair.co.uk',
    date: '2026-09-18',
    total: 7750,
    itemsCount: 2,
    items: [
      { name: 'Seraphina Chandelier Drop Earrings', metal: '18K Rose Gold', price: 3400, qty: 1 },
      { name: 'Verdant Empress Emerald & Diamond Ring', metal: '18K Yellow Gold', price: 4100, qty: 1 }
    ],
    status: 'In Atelier Inspection',
    shippingMethod: 'Armored Overnight',
    paymentStatus: 'Paid'
  },
  {
    id: 'ORD-02',
    customer: 'Jonathan Sterling Esq.',
    email: 'j.sterling@sterlingholdings.com',
    date: '2026-09-17',
    total: 4900,
    itemsCount: 1,
    items: [
      { name: 'Luxe Rivière Diamond Tennis Bracelet', metal: 'Platinum', price: 4900, qty: 1 }
    ],
    status: 'Shipped',
    shippingMethod: 'White-Glove VIP Courier',
    paymentStatus: 'Paid'
  },
  {
    id: 'ORD-03',
    customer: 'Lady Giselle Beaumont',
    email: 'g.beaumont@beaumont.fr',
    date: '2026-09-15',
    total: 2850,
    itemsCount: 1,
    items: [
      { name: 'The Celestial Solitaire Ring', metal: '18K Yellow Gold', price: 2850, qty: 1 }
    ],
    status: 'Delivered',
    shippingMethod: 'Armored Overnight',
    paymentStatus: 'Paid'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-01',
    name: 'Princess Natalia Romanova',
    email: 'natalia.r@monaco.mc',
    phone: '+377 98 06 20 00',
    boutique: 'Paris Flagship (Place Vendôme)',
    date: '2026-09-24',
    serviceType: 'Bespoke Engagement Ring',
    message: 'Seeking a 4ct D-Flawless emerald-cut diamond mounted on platinum with baguette side-stones.',
    status: 'Confirmed'
  },
  {
    id: 'APT-02',
    name: 'Lord Arthur Kensington',
    email: 'arthur.k@kensington.uk',
    phone: '+44 20 7123 4567',
    boutique: 'London Mayfair (Old Bond St)',
    date: '2026-09-26',
    serviceType: 'High Jewelry Suite',
    message: 'Anniversary acquisition — interested in reviewing the Ceylon royal sapphire necklace suite.',
    status: 'Pending Review'
  },
  {
    id: 'APT-03',
    name: 'Sophia Laurent',
    email: 'sophia@laurentdesign.com',
    phone: '+1 (212) 555-8902',
    boutique: 'New York Salon (Madison Ave)',
    date: '2026-09-28',
    serviceType: 'Custom Redesign & Heirloom Resetting',
    message: 'Looking to remount grandmother’s Art Deco Colombian emerald into a modern signet ring.',
    status: 'Confirmed'
  }
];

export const AdminProvider = ({ children }) => {
  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('lumiere_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_admin_user');
      return saved ? JSON.parse(saved) : {
        name: 'Eleanor Moreau',
        role: 'Head Gemologist & Atelier Director',
        email: 'admin@lumiere.com'
      };
    } catch {
      return {
        name: 'Eleanor Moreau',
        role: 'Head Gemologist & Atelier Director',
        email: 'admin@lumiere.com'
      };
    }
  });

  // Dynamic Products List (MySQL + Local fallback, strictly consecutive)
  const [productsList, setProductsList] = useState(() => {
    try {
      const CATALOG_VERSION = 'v2_unique_photos';
      if (localStorage.getItem('lumiere_catalog_version') !== CATALOG_VERSION) {
        localStorage.removeItem('lumiere_dynamic_products');
        localStorage.setItem('lumiere_catalog_version', CATALOG_VERSION);
        return resequenceProducts(INITIAL_PRODUCTS);
      }
      const saved = localStorage.getItem('lumiere_dynamic_products');
      return saved ? resequenceProducts(JSON.parse(saved)) : resequenceProducts(INITIAL_PRODUCTS);
    } catch {
      return resequenceProducts(INITIAL_PRODUCTS);
    }
  });

  // Orders List (strictly consecutive)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_orders');
      return saved ? resequenceOrders(JSON.parse(saved)) : resequenceOrders(INITIAL_ORDERS);
    } catch {
      return resequenceOrders(INITIAL_ORDERS);
    }
  });

  // Appointments List (strictly consecutive)
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_appointments');
      return saved ? resequenceAppointments(JSON.parse(saved)) : resequenceAppointments(INITIAL_APPOINTMENTS);
    } catch {
      return resequenceAppointments(INITIAL_APPOINTMENTS);
    }
  });

  // Fetch live from MySQL on mount
  useEffect(() => {
    const fetchLiveMySQLData = async () => {
      // 1. Fetch products from MySQL
      const prodRes = await api.getProducts();
      if (prodRes.success && prodRes.products.length > 0) {
        setProductsList(resequenceProducts(prodRes.products));
      }

      // 2. Fetch orders from MySQL
      const ordRes = await api.getOrders();
      if (ordRes.success && ordRes.orders.length > 0) {
        setOrders(resequenceOrders(ordRes.orders));
      }

      // 3. Fetch appointments from MySQL
      const aptRes = await api.getAppointments();
      if (aptRes.success && aptRes.appointments.length > 0) {
        setAppointments(resequenceAppointments(aptRes.appointments));
      }
    };

    fetchLiveMySQLData();
  }, []);

  // Sync state to localStorage as fallback
  useEffect(() => {
    localStorage.setItem('lumiere_dynamic_products', JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem('lumiere_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumiere_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Auth Functions
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Try live MySQL authentication
    const dbAuth = await api.loginAdmin(cleanEmail, password);
    if (dbAuth.success && dbAuth.user) {
      setIsAdminLoggedIn(true);
      setAdminUser(dbAuth.user);
      localStorage.setItem('lumiere_admin_auth', 'true');
      localStorage.setItem('lumiere_admin_user', JSON.stringify(dbAuth.user));
      return { success: true };
    }

    // Fallback authentication if offline
    if (cleanEmail === 'admin@lumiere.com' && password === 'admin123') {
      const defaultUser = {
        name: 'Eleanor Moreau',
        role: 'Head Gemologist & Atelier Director',
        email: 'admin@lumiere.com'
      };
      setIsAdminLoggedIn(true);
      setAdminUser(defaultUser);
      localStorage.setItem('lumiere_admin_auth', 'true');
      localStorage.setItem('lumiere_admin_user', JSON.stringify(defaultUser));
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid credentials. Use email: admin@lumiere.com and password: admin123' 
    };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('lumiere_admin_auth');
    localStorage.removeItem('lumiere_admin_user');
  };

  // Product Actions
  const addProduct = async (newProduct) => {
    const nextSeq = String(productsList.length + 1).padStart(2, '0');
    const productWithId = {
      ...newProduct,
      id: `lum-${nextSeq}`,
      serialNo: productsList.length + 1,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      images: newProduct.images && newProduct.images.length > 0 
        ? newProduct.images 
        : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'],
      metals: newProduct.metals || ['18K Yellow Gold', 'Platinum'],
      defaultMetal: newProduct.defaultMetal || '18K Yellow Gold',
      sizes: newProduct.sizes || ['Standard']
    };

    // Always resequence so the new product is strictly consecutive
    const updatedList = resequenceProducts([...productsList, productWithId]);
    setProductsList(updatedList);

    // Send to MySQL in background
    api.addProduct(productWithId);

    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    // Preserve consecutive sequence and update fields
    setProductsList(prev => prev.map(p => (p.id === id || p.serialNo === id) ? { ...p, ...updatedFields } : p));
    api.updateProduct(id, updatedFields);
  };

  const deleteProduct = (id) => {
    // Delete and immediately resequence remaining products so IDs are 100% consecutive without gaps
    const remaining = productsList.filter(p => p.id !== id && p.serialNo !== id);
    const resequenced = resequenceProducts(remaining);
    setProductsList(resequenced);
    api.deleteProduct(id);
  };

  const toggleStock = (id) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === id || p.serialNo === id) {
        const updated = { ...p, inStock: !p.inStock };
        api.updateProduct(id, { inStock: updated.inStock });
        return updated;
      }
      return p;
    }));
  };

  // Order Actions
  const addOrder = (orderData) => {
    const nextSeq = String(orders.length + 1).padStart(2, '0');
    const newOrder = {
      ...orderData,
      id: `ORD-${nextSeq}`,
      serialNo: orders.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'In Atelier Inspection',
      paymentStatus: 'Paid'
    };

    const updatedOrders = resequenceOrders([newOrder, ...orders]);
    setOrders(updatedOrders);

    // Send to MySQL
    api.addOrder(newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => (o.id === orderId || o.serialNo === orderId) ? { ...o, status } : o));
    api.updateOrderStatus(orderId, status);
  };

  const deleteOrder = (orderId) => {
    const remaining = orders.filter(o => o.id !== orderId && o.serialNo !== orderId);
    const resequenced = resequenceOrders(remaining);
    setOrders(resequenced);
    api.deleteOrder(orderId);
  };

  // Appointment Actions
  const addAppointment = (appointmentData) => {
    const nextSeq = String(appointments.length + 1).padStart(2, '0');
    const newApt = {
      ...appointmentData,
      id: `APT-${nextSeq}`,
      serialNo: appointments.length + 1,
      status: 'Pending Review'
    };

    const updatedApts = resequenceAppointments([...appointments, newApt]);
    setAppointments(updatedApts);

    // Send to MySQL
    api.addAppointment(newApt);

    return newApt;
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => (a.id === id || a.serialNo === id) ? { ...a, status } : a));
    api.updateAppointmentStatus(id, status);
  };

  const deleteAppointment = (id) => {
    const remaining = appointments.filter(a => a.id !== id && a.serialNo !== id);
    const resequenced = resequenceAppointments(remaining);
    setAppointments(resequenced);
    api.deleteAppointment(id);
  };

  // Computed Totals for Dashboard
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = productsList.length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending Review').length;

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        login,
        logout,
        productsList,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        uploadImage: api.uploadImage,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        metrics: {
          totalRevenue,
          totalOrdersCount,
          totalProductsCount,
          pendingAppointmentsCount
        }
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
