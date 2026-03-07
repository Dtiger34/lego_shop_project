import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Function to load user from localStorage
  const loadUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, []);

  const handleLogout = () => {
    // Save current cart to guest before logout
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser.id) {
      const userCart = localStorage.getItem(`lego-cart-${currentUser.id}`);
      if (userCart) {
        // Save user cart as guest cart
        localStorage.setItem("lego-cart-guest", userCart);
      }
      // Remove user-specific cart
      localStorage.removeItem(`lego-cart-${currentUser.id}`);
    }

    // Remove user data and token
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to home and reload
    window.location.href = "/";
  };

  const isAdmin = user?.role === "admin";

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <nav className="header-inner">
        {/* Logo */}
        <a href="/#banner" className="brand">
          <img
            src="/logo_viettich.jpg"
            alt="Việt Tích Logo"
            className="brand-logo"
          />
          <span className="brand-name">Việt Tích</span>
        </a>

        {/* Navigation links - Desktop */}
        <div className="nav nav-desktop">
          <a href="/#features">Giới thiệu</a>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/collection">Bộ sưu tập</Link>
          <a href="/#contact">Liên hệ</a>
          {isAdmin && <Link to="/admin/dashboard">Quản trị</Link>}
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="header-actions">
          {user ? (
            <>
              <span className="user-greeting">Xin chào, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </>
          ) : (
            <a href="/login" className="btn-login">
              Đăng nhập
            </a>
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
          <span className={isMenuOpen ? "active" : ""}></span>
          <span className={isMenuOpen ? "active" : ""}></span>
          <span className={isMenuOpen ? "active" : ""}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="nav-mobile">
          <a href="/#features" onClick={handleNavClick}>
            Giới thiệu
          </a>
          <Link to="/products" onClick={handleNavClick}>
            Sản phẩm
          </Link>
          <Link to="/collection" onClick={handleNavClick}>
            Bộ sưu tập
          </Link>
          <a href="/#contact" onClick={handleNavClick}>
            Liên hệ
          </a>
          {isAdmin && (
            <Link to="/admin/dashboard" onClick={handleNavClick}>
              Quản trị
            </Link>
          )}
          <div className="mobile-actions">
            {user ? (
              <>
                <span className="user-greeting">Xin chào, {user.name}</span>
                <button onClick={handleLogout} className="btn-logout-mobile">
                  Đăng xuất
                </button>
              </>
            ) : (
              <a href="/login" className="btn-login-mobile">
                Đăng nhập
              </a>
            )}
            <Link
              to="/cart"
              className="btn-cart-mobile"
              onClick={handleNavClick}
            >
              🛒 Giỏ hàng
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
