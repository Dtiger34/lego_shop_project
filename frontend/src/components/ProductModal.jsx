import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../service/config';
import './ProductModal.css';

export default function ProductModal({ show, product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = useCallback(() => {
    setQuantity(1);
    setCurrentImageIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [show, handleClose]);

  if (!show || !product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [];
  const hasMultipleImages = images.length > 1;

  const goToPrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    handleClose();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose} aria-label="Đóng">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-image">
          <img
            src={images[currentImageIndex] ? `${BASE_URL}${images[currentImageIndex]}` : product.icon}
            alt={`${product.name} - ảnh ${currentImageIndex + 1}`}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffe0e0" width="200" height="200"/%3E%3Ctext x="50%25" y="45%25" font-size="40" text-anchor="middle" dy=".3em"%3E%F0%9F%A7%B1%3C/text%3E%3Ctext x="50%25" y="70%25" font-size="13" fill="%23E3000B" text-anchor="middle"%3EH%C3%ACnh%20%E1%BA%A3nh%20kh%C3%B4ng%20t%C3%ACm%20th%C3%A1y%3C/text%3E%3C/svg%3E';
            }}
          />
          {hasMultipleImages && (
            <>
              <button className="carousel-btn carousel-btn-prev" onClick={goToPrevImage} aria-label="Ảnh trước">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="carousel-btn carousel-btn-next" onClick={goToNextImage} aria-label="Ảnh tiếp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="carousel-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`carousel-dot${idx === currentImageIndex ? ' active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    aria-label={`Xem ảnh ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-description">{product.description}</p>
          
          <div className="modal-price">{formatPrice(product.price)}</div>

          <div className="quantity-section">
            <label className="quantity-label">Số lượng:</label>
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Giảm số lượng"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <input 
                type="number" 
                className="quantity-input" 
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  if (val >= 1 && val <= 99) setQuantity(val);
                }}
                min="1"
                max="99"
              />
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 99}
                aria-label="Tăng số lượng"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Thêm vào giỏ hàng
            </button>
            <button className="btn-continue" onClick={handleClose}>
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
