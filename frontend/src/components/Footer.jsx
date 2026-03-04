import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo_viettich.jpg" alt="Việt Tích Logo" className="footer-logo-img" />
              <span className="footer-name">Việt Tích</span>
            </div>
            <p className="footer-description">
              Giữ gìn tinh thần xây dựng của cha ông, truyền cảm hứng cho thế hệ tương lai.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">f</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="Instagram">📸</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-links">
            <h4 className="footer-heading">Liên kết nhanh</h4>
            <ul className="footer-list">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/products">Sản phẩm</a></li>
              <li><a href="/about">Về chúng tôi</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="footer-links">
            <h4 className="footer-heading">Dịch vụ khách hàng</h4>
            <ul className="footer-list">
              <li><a href="/help">Trợ giúp</a></li>
              <li><a href="/contact">Liên hệ chúng tôi</a></li>
              <li><a href="/shipping">Vận chuyển</a></li>
              <li><a href="/returns">Đổi trả</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-contact">
            <h4 className="footer-heading">Liên hệ</h4>
            <div className="contact-info">
              <div className="contact-item">
                <p className="contact-label">Địa chỉ</p>
                <p>Phục vụ tại khắp mọi miền đất nước</p>
              </div>
              <div className="contact-item">
                <p className="contact-label">Email</p>
                <p><a href="mailto:info@legoshop.vn">info@legoshop.vn</a></p>
              </div>
              <div className="contact-item">
                <p className="contact-label">Điện thoại</p>
                <p><a href="tel:+84901234567">+84 90 123 4567</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Việt Tích. All rights reserved. Truyền cảm hứng xây dựng và sáng tạo cho thế hệ Việt Nam.
          </p>
          <div className="footer-legal">
            <a href="/privacy">Chính sách riêng tư</a>
            <a href="/terms">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
