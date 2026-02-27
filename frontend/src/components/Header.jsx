import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="site-header">
      <nav className="header-inner">
        {/* Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">🧱</span>
          <span className="brand-name">Lego Shop</span>
        </Link>

        {/* Navigation links - Desktop */}
        <div className="nav nav-desktop">
          <a href="/#features">Tại sao chọn</a>
          <Link to="/products">Sản phẩm</Link>
          <a href="/#contact">Liên hệ</a>
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="header-actions">
          <a href="/login" className="btn-login">Đăng nhập</a>
          <Link to="/cart" className="btn-cart">
            🛒 Giỏ hàng
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-toggle"
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="nav-mobile">
          <a href="/#features" onClick={() => setIsMenuOpen(false)}>Tại sao chọn</a>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Sản phẩm</Link>
          <a href="/#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
          <div className="mobile-actions">
            <a href="/login" className="btn-login-mobile">Đăng nhập</a>
            <Link to="/cart" className="btn-cart-mobile">
              🛒 Giỏ hàng
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
