import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const KhueVanCac3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/khue_van_cac-compressed.glb");

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">
            Khuê Văn Các - Cổng Vinh Quang Của Văn Miếu
          </h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Khuê Văn Các</h3>
              <p className="intro-paragraph">
                Khuê Văn Các là cổng vinh quang của Văn Miếu Quốc Tử Giám, một
                trong những công trình kiến trúc cổ nhất và có giá trị nhất của
                Việt Nam. Được xây dựng từ thế kỷ XV, cổng này là biểu tượng của
                học vấn, tri thức và nền giáo dục truyền thống Việt Nam qua
                nhiều thế kỷ.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Khuê Văn Các có kiến trúc trang nhã với chi tiết tinh xảo được
                tạo khắc trên gỗ và đá. Tên gọi "Khuê Văn" mang ý nghĩa "áng mây
                sắc" - biểu trưng cho cái đẹp và thanh cao của học vấn. Cổng này
                được coi là kiệt tác của kiến trúc cổ đại Việt Nam, ghi dấu ấn
                của nhiều thế hệ thợ xây dựng tài ba.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Văn Hóa</h3>
              <p className="intro-paragraph">
                Khuê Văn Các không chỉ là cơ sở vật chất mà còn là biểu tượng
                tinh thần của nền giáo dục Việt Nam. Nơi đây ghi dấu tên của
                hàng vạn nhân tài đã đi qua Văn Miếu Quốc Tử Giám. Hiện nay,
                Khuê Văn Các là di sản thế giới được UNESCO công nhận, thu hút
                du khách từ khắp nơi trên thế giới.
              </p>
            </div>
          </div>

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

export default KhueVanCac3DView;
