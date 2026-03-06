export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Decorative background elements */}
      <div className="hero-bg-bubble hero-bg-bubble-1"></div>
      <div className="hero-bg-bubble hero-bg-bubble-2"></div>
      <div className="hero-bg-bubble hero-bg-bubble-3"></div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left content */}
          <div className="hero-content animate-fade-in">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-gradient">
                  Nối dài di sản,
                  <br />
                  Xây dựng tương lai
                </span>
              </h1>
              <p className="hero-description">
                Việt Tích mang đến bộ sưu tập đồ chơi xếp hình chính hãng, kết
                nối niềm đam mê xây dựng với những công trình lịch sử biểu tượng
                của Việt Nam, mỗi bộ đồ chơi là một hành trình khám phá, giáo
                dục và sáng tạo dành cho thế hệ trẻ.
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
          </div>

          {/* Right image */}
          <div className="hero-image-wrapper animate-slide-in">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <div className="image-placeholder">
                <img
                  src="/logo_viettich.jpg"
                  alt="Việt Tích Logo"
                  className="hero-logo"
                />
                <p className="image-title">Việt Tích</p>
                <p className="image-subtitle">Không chỉ là đồ chơi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
