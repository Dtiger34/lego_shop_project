import React from "react";
import use3DViewer from "../../../hooks/use3DViewer.js";
import "./view3d.css";

const NgoMonHue3DView = () => {
  const { containerRef, isLoading, error } = use3DViewer("/ngo_mon_hue-compressed.glb");

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">
            Ngọ Môn Huế - Cổng Chính Hoàng Thành
          </h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Ngọ Môn Huế</h3>
              <p className="intro-paragraph">
                Ngọ Môn là cổng chính của Kiến Trúc Hoàng Thành Huế, một trong
                những công trình kiến trúc tiêu biểu nhất của thời phong kiến
                Việt Nam. Được xây dựng năm 1805 dưới thời vua Gia Long, Ngọ Môn
                là biểu tượng của quyền lực hoàng gia và nền tảng của kiến trúc
                Huế xưa.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Ngọ Môn có kiến trúc hùng vĩ với tháp canh bên trên, từng phía
                ngoài, tạo nên bức tranh kiến trúc ba lớp đẹp mắt. Tên "Ngọ Môn"
                mang ý nghĩa "Cổng Ngọ" - chỉ hướng nam của kinh thành phong
                kiến. Công trình này là biểu hiện của kiến trúc phong kiến Việt
                Nam, kết hợp kỹ thuật xây dựng cao cấp với mỹ học truyền thống.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Lịch Sử</h3>
              <p className="intro-paragraph">
                Ngọ Môn Huế chứng kiến nhiều sự kiện lịch sử quan trọng của đất
                nước. Từ thời phong kiến cho đến hiện đại, Ngọ Môn vẫn đứng vững
                như một biểu tượng của lịch sử Huế. Năm 1975, lá cờ Việt Nam
                được kéo lên trên tháp cờ Ngọ Môn, đánh dấu thống nhất đất nước.
                Hiện nay, Ngọ Môn là phần mềm trong di sản thế giới Huế.
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

export default NgoMonHue3DView;
