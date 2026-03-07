import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const HonTrongMai3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer(
    "/hon_trong_mai-compressed.glb",
  );

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">
            Hòn Trống Mái - Biểu Tượng Tình Yêu Hạ Long
          </h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Hòn Trống Mái</h3>
              <p className="intro-paragraph">
                Hòn Trống Mái là cặp đá nổi tiếng tọa lạc tại Vịnh Hạ Long, tỉnh
                Quảng Ninh. Hai hòn đá có hình dáng đặc biệt giống một đôi gà
                trống và gà mái đang âu yếm nhau, trở thành biểu tượng của tình
                yêu thủy chung son sắt và vẻ đẹp kỳ diệu của thiên nhiên Vịnh Hạ
                Long.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Vẻ Đẹp Thiên Nhiên Kỳ Vĩ</h3>
              <p className="intro-paragraph">
                Hòn Trống Mái được tạo thành bởi quá trình phong hóa và xói mòn
                hàng triệu năm, tạo nên hình dáng độc đáo hiếm có. Hòn Trống cao
                hơn, vươn ra phía trước như đang che chở cho Hòn Mái phía sau,
                tạo nên khung cảnh lãng mạn mà thiên nhiên đã ban tặng cho Vịnh
                Hạ Long.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Huyền Thoại & Di Sản</h3>
              <p className="intro-paragraph">
                Hòn Trống Mái gắn liền với nhiều truyền thuyết dân gian về tình
                yêu bất diệt. Là một phần của Di sản Thiên nhiên Thế giới Vịnh
                Hạ Long được UNESCO công nhận, cặp đá này thu hút hàng triệu du
                khách trong và ngoài nước đến chiêm ngưỡng mỗi năm, trở thành
                một trong những điểm nhấn đặc sắc nhất của Vịnh Hạ Long.
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
                  <svg
                    className="hint-icon hint-icon-rotate"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  <svg
                    className="hint-icon hint-icon-arrows"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="5 9 2 12 5 15" />
                    <polyline points="9 5 12 2 15 5" />
                    <polyline points="15 19 12 22 9 19" />
                    <polyline points="19 9 22 12 19 15" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                  </svg>
                  <span className="hint-label">Kéo chuột để xoay</span>
                  <span className="hint-tooltip">
                    Giữ & kéo chuột để xoay mô hình
                  </span>
                </div>
                <span className="hint-sep">|</span>
                <div className="viewer-hint">
                  <svg
                    className="hint-icon hint-icon-zoom"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span className="hint-label">Cuộn để zoom</span>
                  <span className="hint-tooltip">
                    Lăn bánh chuột để phóng to / thu nhỏ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HonTrongMai3DView;
