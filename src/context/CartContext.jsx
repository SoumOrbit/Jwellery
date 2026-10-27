import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('lumiere_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('lumiere_coupon');
    }
  }, [coupon]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, selectedMetal = null, selectedSize = null, quantity = 1) => {
    const metal = selectedMetal || product.defaultMetal || product.metals[0];
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const itemKey = `${product.id}-${metal}-${size}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            itemKey,
            selectedMetal: metal,
            selectedSize: size,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag`);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LUXE10') {
      const newCoupon = { code: 'LUXE10', discountPercent: 10, description: '10% VIP Atelier Discount' };
      setCoupon(newCoupon);
      showToast('Promo code LUXE10 applied! 10% off', 'success');
      return { success: true, message: 'Promo code applied!' };
    } else if (cleanCode === 'DIAMOND20') {
      const newCoupon = { code: 'DIAMOND20', discountPercent: 20, description: '20% High Jewelry Privilege' };
      setCoupon(newCoupon);
      showToast('Promo code DIAMOND20 applied! 20% off', 'success');
      return { success: true, message: 'Promo code applied!' };
    } else {
      showToast('Invalid promo code. Try "LUXE10"', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shippingFee = subtotal > 5000 || cartItems.length === 0 ? 0 : 500;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08);
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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
        totalPrice,
        totalCount,
        toastMessage,
        setToastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
