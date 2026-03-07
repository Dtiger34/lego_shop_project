import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const DenNgocSon3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/cong_den_ngoc_son-compressed.glb");

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">Đền Ngọc Sơn - Đền Thờ Giữa Hồ Gươm</h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Đền Ngọc Sơn</h3>
              <p className="intro-paragraph">
                Đền Ngọc Sơn là một ngôi đền cổ nằm trên một đảo nhỏ giữa Hồ
                Gươm ở Hà Nội, một trong những địa điểm linh thiêng và yên tĩnh
                nhất của thủ đô. Được xây dựng từ thế kỷ XVII, đền Ngọc Sơn thờ
                cúng các vị thánh hiền như Thánh Tản Viên, Thánh Chu Văn An và
                Trần Hưng Đạo.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Đền Ngọc Sơn có kiến trúc thanh thoát và tinh tế với các đặc
                điểm riêng của kiến trúc đền đạo Việt Nam. Công trình có cây cầu
                Thê Húc thanh nhã bằng gỗ, tạo nên một quang cảnh yên bình. Tên
                "Ngọc Sơn" mang ý nghĩa "núi ngọc" - biểu trưng cho vẻ đẹp và sự
                thanh cao của nơi thờ phụng.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Linh Thiêng</h3>
              <p className="intro-paragraph">
                Đền Ngọc Sơn không chỉ là một công trình kiến trúc cổ kính mà
                còn là một nơi thờ phụng linh thiêng của người dân Hà Nội. Hàng
                năm, đền Ngọc Sơn thu hút hàng vạn du khách và tín đồ đến thăm
                viếng. Nơi đây vẫn giữ được nét truyền thống yên tĩnh của Hà Nội
                xưa giữa sự phát triển hiện đại của thành phố.
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

export default DenNgocSon3DView;
