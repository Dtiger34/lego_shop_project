import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="banner-section">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h2 className="banner-title">Về chúng tôi</h2>
        <div className="banner-breadcrumb">
          <a href="#hero" className="breadcrumb-link">
            Trang chủ
          </a>
          <span className="breadcrumb-separator">&gt;</span>
          <a href="#hero" className="breadcrumb-current">
            Giới thiệu
          </a>
        </div>
      </div>
    </section>
  );
}
