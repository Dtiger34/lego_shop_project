import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/logo_viettich.jpg"
                alt="Việt Tích Logo"
                className="footer-logo-img"
              />
              <span className="footer-name">Việt Tích</span>
            </div>
            <p className="footer-description">
              Giữ gìn tinh thần xây dựng của cha ông, truyền cảm hứng cho thế hệ
              tương lai.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61586615862363"
                className="social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://www.tiktok.com/@viettich.project"
                className="social-link"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
              >
                ♪
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-links">
            <h4 className="footer-heading">Liên kết nhanh</h4>
            <ul className="footer-list">
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/products">Sản phẩm</a>
              </li>
              <li>
                <a href="/collection">Bộ sưu tập</a>
              </li>
              <li>
                <a href="/cart">Giỏ hàng</a>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="footer-links">
            <h4 className="footer-heading">Dịch vụ khách hàng</h4>
            <ul className="footer-list">
              <li>
                <a href="/login">Đăng nhập</a>
              </li>
              <li>
                <a href="/signup">Đăng ký</a>
              </li>
              <li>
                <a href="/forgot-password">Quên mật khẩu</a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-contact">
            <h4 className="footer-heading">Liên hệ</h4>
            <div className="contact-info">
              <div className="contact-item">
                <p className="contact-label">Email</p>
                <p>project.viettich@gmail.com</p>
              </div>
              <div className="contact-item">
                <p className="contact-label">Hotline</p>
                <p>
                  0918 684 022 (Mr. Quang Huy)
                </p>
              </div>
              <div className="contact-item">
                <p className="contact-label">Địa chỉ</p>
                <p>TTC Tower, Đường Duy Tân, Phường Cầu Giấy, Hà Nội</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Việt Tích. All rights reserved. Truyền cảm hứng
            xây dựng và sáng tạo cho thế hệ Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
}
