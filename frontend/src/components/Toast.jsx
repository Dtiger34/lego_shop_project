import { useEffect } from 'react';
import './Toast.css';

export default function Toast({ show, message, product, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast-icon">✓</div>
        <div className="toast-content">
          <div className="toast-title">{message}</div>
          {product && (
            <div className="toast-product">
              <span className="toast-product-icon">{product.icon}</span>
              <span className="toast-product-name">{product.name}</span>
            </div>
          )}
        </div>
        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
