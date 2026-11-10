import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminProvider } from './context/AdminContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import NotificationToast from './components/common/NotificationToast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Auto-detect direct non-hash navigation like /admin/login and redirect to hash equivalent
if (typeof window !== 'undefined') {
  const path = window.location.pathname;
  if (path.endsWith('/admin/login') || path.endsWith('/admin/login/')) {
    const basePath = path.replace(/\/admin\/login\/?$/, '');
    window.location.replace(`${window.location.origin}${basePath}/#/admin/login`);
  } else if (path.endsWith('/admin') || path.endsWith('/admin/')) {
    const basePath = path.replace(/\/admin\/?$/, '');
    window.location.replace(`${window.location.origin}${basePath}/#/admin`);
  }
}

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <NotificationToast />
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "admin-site-content" : "main-site-content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          
          {/* Dedicated Separate Admin Management Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <WishlistProvider>
          <HashRouter>
            <AppLayout />
          </HashRouter>
        </WishlistProvider>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
