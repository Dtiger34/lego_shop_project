import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const ThapRua3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/thap_rua-compressed.glb");

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">Tháp Rùa - Biểu Tượng Của Tuổi Thọ</h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Tháp Rùa</h3>
              <p className="intro-paragraph">
                Tháp Rùa là một tháp cổ nằm giữa Hồ Gươm, xây dựng từ thế kỷ XIX
                với mục đích tôn vinh con rùa thần - biểu tượng của sự khôn
                ngoan, tuổi thọ và may mắn trong văn hóa Việt Nam. Tháp này mang
                theo những câu chuyện thần kỳ và là nơi mệnh danh là di sản văn
                hóa vô cùng ý nghĩa.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Tháp Rùa được xây dựng với kiến trúc độc đáo, tạo hình dáng
                giống như một chiếc tháp hẹp để dễ dàng bước qua Hồ. Công trình
                được xây dựng bằng gạch và vữa truyền thống, với chi tiết trang
                trí tinh xảo. Thân tháp có chi tiết hình rùa, biểu trưng cho ý
                nghĩa sâu xa của nó trong văn hóa dân gian.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Văn Hóa</h3>
              <p className="intro-paragraph">
                Tháp Rùa không chỉ là một công trình kiến trúc mà còn là một
                biểu tượng linh thiêng của tín ngưỡng dân gian Việt Nam. Người
                dân tin rằng con rùa là biểu tượng của may mắn, sức khỏe và sự
                sống lâu dài. Hiện nay, tháp vẫn được giữ gìn kỹ lưỡng, là một
                phần không thể tách rời của cảnh quan Hồ Gươm và lịch sử Hà Nội.
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

export default ThapRua3DView;
