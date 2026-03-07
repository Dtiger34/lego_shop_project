import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const CotCoHaNoi3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/cot_co_ha_noi-compressed.glb", { highQuality: true });

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        {/* Header */}
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">
            Cột Cờ Hà Nội - Biểu Tượng Của Thủ Đô
          </h2>
        </div>

        {/* Content */}
        <div className="view3d-content">
          {/* Left Side - Introduction */}
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Cột Cờ Hà Nội</h3>
              <p className="intro-paragraph">
                Cột Cờ Hà Nội là một trong những biểu tượng lịch sử và văn hóa
                quan trọng nhất của thủ đô Việt Nam. Được xây dựng vào năm 1812
                dưới thời vua Gia Long, cột cờ nằm tại Thành cổ Hà Nội và chứng
                kiến những thời khắc lịch sử quan trọng nhất của đất nước.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Cột cờ được thiết kế theo phong cách kiến trúc truyền thống Việt
                Nam, với cấu trúc vững chắc để chịu được các điều kiện thời tiết
                khắc nghiệt. Chiều cao của cột cờ là 33,4 mét, đứng vượt lên
                trên các bức tường thành, trở thành một mốc nhân định của thành
                phố.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Lịch Sử</h3>
              <p className="intro-paragraph">
                Cột cờ Hà Nội là nơi lá cờ tổ quốc được kéo lên lần đầu tiên vào
                ngày 10 tháng 10 năm 1954 - ngày Hà Nội được giải phóng. Sự kiện
                này đánh dấu chinh thức kết thúc chiến tranh Việt - Pháp và
                thống nhất đất nước. Vì vậy, cột cờ trở thành biểu tượng vĩ đại
                của tự do và độc lập.
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

export default CotCoHaNoi3DView;
