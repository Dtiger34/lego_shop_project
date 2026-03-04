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
                🧱 Tinh thần xây dựng & Tâm huyết truyền thống
              </span>
              <h1 className="hero-title">
                <span className="hero-gradient">Nối dài di sản,
                  <br />
                Xây dựng tương lai</span>
              </h1>
              <p className="hero-description">
                Kế thừa tinh thần kiên trì của tổ tiên - từng viên gạch xây nên đền đài trường tồn, chúng tôi mang đến những bộ Lego chính hãng để thế hệ trẻ học hỏi về sự sáng tạo, kiên nhẫn và khéo léo của cha ông.
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
                <p className="stat-label">Gia đình tin tưởng</p>
              </div>
              <div className="stat">
                <p className="stat-number">100%</p>
                <p className="stat-label">Chính hãng, nguồn gốc rõ ràng</p>
              </div>
              <div className="stat">
                <p className="stat-number">200+</p>
                <p className="stat-label">Mô hình đa dạng</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="hero-image-wrapper animate-slide-in">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <div className="image-placeholder">
                <img src="/logo_viettich.jpg" alt="Việt Tích Logo" className="hero-logo" />
                <p className="image-title">Việt Tích</p>
                <p className="image-subtitle">Từng viên gạch - Một tương lai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
