import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const LangBac3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/langbac-compressed.glb", { highQuality: true });

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        {/* Header */}
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">Lăng Chủ Tịch Hồ Chí Minh</h2>
        </div>

        {/* Content */}
        <div className="view3d-content">
          {/* Left Side - Introduction */}
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về chủ tịch Hồ Chí Minh</h3>
              <p className="intro-paragraph">
                Lăng chủ tịch Hồ Chí Minh là nơi an nghỉ của người sáng lập nước
                Cộng hòa Xã hội Chủ nghĩa Việt Nam. Được xây dựng vào năm 1973,
                lăng là biểu tượng trang nghiêm của sự tôn kính và nhân dân Việt
                Nam dành cho vị lãnh tụ vĩ đại. Nơi đây là di tích lịch sử quốc
                gia đặc biệt quan trọng nhất của cả nước.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Lăng chủ tịch Hồ Chí Minh được thiết kế theo phong cách kiến
                trúc truyền thống Việt Nam, kết hợp với yếu tố hiện đại. Công
                trình được xây dựng trên một khuôn viên rộng lớn tại Hà Nội, với
                kiến trúc hình bình hành, tạo nên sự trang nghiêm và uy tín.
                Lăng được sơn màu đỏ tượng trưng cho máu của những người anh
                hùng.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Lịch Sử</h3>
              <p className="intro-paragraph">
                Lăng chủ tịch Hồ Chí Minh không chỉ là nơi an nghỉ cuối cùng của
                Chủ tịch Hồ Chí Minh, mà còn là biểu tượng của tinh thần độc
                lập, tự do và yêu nước của dân tộc Việt Nam. Hàng triệu du khách
                trong và ngoài nước đến viếng lăng hàng năm, thể hiện sự tôn
                kính đối với vị lãnh tụ vĩ đại này.
              </p>
            </div>
          </div>

          {/* Right Side - 3D Viewer */}
          <div className="view3d-viewer">
            <div className="viewer-frame">
              <div className="view3d-main">
                {isLoading && (
                  <div className="view3d-loading">
                    <div className="spinner"></div>
                    <p>Đang tải mô hình 3D...</p>
                  </div>
                )}

                {error && (
                  <div className="view3d-error">
                    <p>{error}</p>
                  </div>
                )}

                <div
                  ref={containerRef}
                  className="view3d-canvas"
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
              <div className="viewer-footer">
                <div className="viewer-hint">
                  <svg className="hint-icon hint-icon-rotate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                  <svg className="hint-icon hint-icon-arrows" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 9 2 12 5 15"/>
                    <polyline points="9 5 12 2 15 5"/>
                    <polyline points="15 19 12 22 9 19"/>
                    <polyline points="19 9 22 12 19 15"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <line x1="12" y1="2" x2="12" y2="22"/>
                  </svg>
                  <span className="hint-label">Kéo chuột để xoay</span>
                  <span className="hint-tooltip">Giữ & kéo chuột để xoay mô hình</span>
                </div>
                <span className="hint-sep">|</span>
                <div className="viewer-hint">
                  <svg className="hint-icon hint-icon-zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                  <span className="hint-label">Cuộn để zoom</span>
                  <span className="hint-tooltip">Lăn bánh chuột để phóng to / thu nhỏ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LangBac3DView;
