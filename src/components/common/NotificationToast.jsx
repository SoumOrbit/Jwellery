import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, CheckCircle, Info, AlertCircle, X } from 'lucide-react';

const NotificationToast = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  const getIcon = () => {
    switch (toastMessage.type) {
      case 'info':
        return <Info size={18} className="toast-icon text-gold" />;
      case 'error':
        return <AlertCircle size={18} className="toast-icon text-red" />;
      default:
        return <Sparkles size={18} className="toast-icon text-gold" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast-card toast-${toastMessage.type || 'success'}`}>
        <div className="toast-body">
          {getIcon()}
          <span className="toast-text">{toastMessage.message}</span>
        </div>
        <button
          className="toast-close-btn"
          onClick={() => setToastMessage(null)}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
