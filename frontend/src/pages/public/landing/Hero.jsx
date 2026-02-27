export default function Hero() {
  return (
    <section className="hero">
      {/* Decorative background elements */}
      <div className="hero-bg-bubble hero-bg-bubble-1"></div>
      <div className="hero-bg-bubble hero-bg-bubble-2"></div>
      <div className="hero-bg-bubble hero-bg-bubble-3"></div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left content */}
          <div className="hero-content animate-fade-in">
            <div className="hero-text">
              <span className="hero-badge">
                🧱 Đồ chơi sáng tạo & Chính hãng toàn cầu
              </span>
              <h1 className="hero-title">
                <span className="hero-gradient">Lego chính hãng,
                  <br />
                Sáng tạo không giới hạn</span>
              </h1>
              <p className="hero-description">
                Khám phá bộ sưu tập Lego đa dạng — từ City, Technic đến Star Wars và Creator. Mỗi bộ đồ chơi là một hành trình sáng tạo thú vị cho mọi lứa tuổi.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <a href="#products" className="btn-primary">
                Xem bộ sưu tập
              </a>
              <a href="#features" className="btn-secondary">
                Tìm hiểu thêm
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat">
                <p className="stat-number">1000+</p>
                <p className="stat-label">Khách hàng hài lòng</p>
              </div>
              <div className="stat">
                <p className="stat-number">100%</p>
                <p className="stat-label">Chính hãng, có tem bảo đảm</p>
              </div>
              <div className="stat">
                <p className="stat-number">200+</p>
                <p className="stat-label">Bộ sản phẩm đa dạng</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="hero-image-wrapper animate-slide-in">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <div className="image-placeholder">
                <div className="bamboo-icon">🧱</div>
                <p className="image-title">Lego Shop</p>
                <p className="image-subtitle">Xây dựng ước mơ từng mảnh ghép</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
