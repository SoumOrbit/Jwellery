// Lumière Haute Joaillerie - MySQL REST API Client Service
// Connects React frontend to XAMPP PHP/MySQL backend

const API_BASE_URL = window.location.hostname === 'localhost' && window.location.port !== '' && window.location.port !== '80'
  ? 'http://localhost/Jwellery/api'
  : './api';

const fetchWithTimeout = async (url, options = {}, timeoutMs = 4000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

export const api = {
  // Authentication
  loginAdmin: async (email, password) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch {
      // Fallback
      return { success: false, fallback: true };
    }
  },

  // Products
  getProducts: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/products.php`);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        return { success: true, products: data.products };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  addProduct: async (productData) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/products.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  updateProduct: async (id, fields) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/products.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...fields })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/products.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetchWithTimeout(`${API_BASE_URL}/upload.php`, {
        method: 'POST',
        body: formData
      }, 10000);
      const data = await res.json();
      if (data.success && data.url) {
        return { success: true, url: data.url };
      }
    } catch (err) {
      console.warn('Server upload unavailable, converting to local data URI fallback:', err);
    }
    // Fallback: convert to base64 Data URL so upload ALWAYS succeeds
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ success: true, url: reader.result });
      };
      reader.onerror = () => {
        resolve({ success: false, message: 'Could not read image file' });
      };
      reader.readAsDataURL(file);
    });
  },


  // Orders
  getOrders: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/orders.php`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        return { success: true, orders: data.orders };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  addOrder: async (orderData) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/orders.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/orders.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  deleteOrder: async (id) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/orders.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  // Appointments
  getAppointments: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/appointments.php`);
      const data = await res.json();
      if (data.success && Array.isArray(data.appointments)) {
        // Format to match React camelCase state
        const formatted = data.appointments.map(a => ({
          id: a.id,
          name: a.name,
          email: a.email,
          phone: a.phone,
          boutique: a.boutique,
          preferredDate: a.preferred_date,
          serviceType: a.service_type,
          message: a.message,
          status: a.status,
          createdAt: a.created_at
        }));
        return { success: true, appointments: formatted };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  addAppointment: async (appointmentData) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/appointments.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/appointments.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  deleteAppointment: async (id) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/appointments.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  }
};
