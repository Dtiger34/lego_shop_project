import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems, loadUserCart } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();

  // Function to load user from localStorage
  const loadUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    loadUser();

    // Listen for custom auth change events
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    // Save current cart to guest before logout
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.id) {
      const userCart = localStorage.getItem(`lego-cart-${currentUser.id}`);
      if (userCart) {
        // Save user cart as guest cart
        localStorage.setItem('lego-cart-guest', userCart);
      }
      // Remove user-specific cart
      localStorage.removeItem(`lego-cart-${currentUser.id}`);
    }
    
    // Remove user data and token
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    
    // Load guest cart
    loadUserCart();
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="site-header">
      <nav className="header-inner">
        {/* Logo */}
        <Link to="/" className="brand">
          <img src="/logo_viettich.jpg" alt="Việt Tích Logo" className="brand-logo" />
          <span className="brand-name">Việt Tích</span>
        </Link>

        {/* Navigation links - Desktop */}
        <div className="nav nav-desktop">
          <a href="/#features">Tại sao chọn</a>
          <Link to="/products">Sản phẩm</Link>
          <a href="/#contact">Liên hệ</a>
          {isAdmin && <Link to="/admin/dashboard">Quản trị</Link>}
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="header-actions">
          {user ? (
            <>
              <span className="user-greeting">Xin chào, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
            </>
          ) : (
            <a href="/login" className="btn-login">Đăng nhập</a>
          )}
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
          {isAdmin && (
            <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Quản trị</Link>
          )}
          <div className="mobile-actions">
            {user ? (
              <>
                <span className="user-greeting">Xin chào, {user.name}</span>
                <button onClick={handleLogout} className="btn-logout-mobile">Đăng xuất</button>
              </>
            ) : (
              <a href="/login" className="btn-login-mobile">Đăng nhập</a>
            )}
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
