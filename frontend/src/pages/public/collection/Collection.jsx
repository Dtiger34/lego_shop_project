import { useNavigate } from "react-router-dom";
import "./Collection.css";

const items = [
  {
    id: 1,
    name: "Chùa Một Cột",
    desc: "Kiệt tác kiến trúc thế kỷ XI, ngôi chùa độc trụ nổi tiếng nhất Việt Nam",
    image: "/chuamotcot.jpg",
    badge: "Lịch sử",
    route: "/3d-viewer/chua-mot-cot",
  },
  {
    id: 2,
    name: "Cột Cờ Hà Nội",
    desc: "Biểu tượng thủ đô, nơi lá cờ Tổ quốc tung bay lần đầu năm 1945",
    image: "/cotcohanoi.jpg",
    badge: "Biểu tượng",
    route: "/3d-viewer-cot-co",
  },
  {
    id: 3,
    name: "Lăng Chủ Tịch Hồ Chí Minh",
    desc: "Di tích lịch sử đặc biệt quan trọng, nơi yên nghỉ của Chủ tịch Hồ Chí Minh",
    image: "/lang-bac.jpg",
    badge: "Di tích",
    route: "/3d-viewer-lang-bac",
  },
  {
    id: 4,
    name: "Khuê Văn Các",
    desc: "Cổng vinh quang của Văn Miếu Quốc Tử Giám, biểu tượng văn hiến ngàn năm",
    image: "/khue-van-cac.jpg",
    badge: "Văn hóa",
    route: "/3d-viewer-khue-van-cac",
  },
  {
    id: 5,
    name: "Ngọ Môn Huế",
    desc: "Cổng chính Hoàng Thành Huế, kiệt tác kiến trúc thời phong kiến Việt Nam",
    image: "/ngo-mon-hue.jpg",
    badge: "Hoàng thành",
    route: "/3d-viewer-ngo-mon",
  },
  {
    id: 6,
    name: "Đền Ngọc Sơn",
    desc: "Ngôi đền trên đảo nhỏ giữa Hồ Gươm, nét thanh thoát giữa lòng Hà Nội",
    image: "/den-ngoc-son.jpg",
    badge: "Linh thiêng",
    route: "/3d-viewer-den-ngoc-son",
  },
  {
    id: 7,
    name: "Cầu Thê Húc",
    desc: "Cầu gỗ cổ kính với kiến trúc cong thanh nhã, nối liền Đền Ngọc Sơn",
    image: "/cau-the-huc.jpg",
    badge: "Kiến trúc",
    route: "/3d-viewer-cau-the-huc",
  },
  {
    id: 8,
    name: "Hòn Trống Mái",
    desc: "Cặp đá kỳ vĩ hình gà trống gà mái tại Vịnh Hạ Long – biểu tượng tình yêu bất diệt",
    image: "/hon-trong-mai.jpg",
    badge: "Linh thiêng",
    route: "/3d-viewer-hon-trong-mai",
  },
  {
    id: 9,
    name: "Tháp Bút",
    desc: "Tháp cổ hình bút lông, biểu tượng học vấn và tinh thần hiếu học",
    image: "/thap-but.jpg",
    badge: "Văn hóa",
    route: "/3d-viewer-thap-but",
  },
  {
    id: 10,
    name: "Tháp Rùa",
    desc: "Biểu tượng tuổi thọ và may mắn, tháp cổ ngàn năm giữa Hồ Gươm",
    image: "/thap-rua.jpg",
    badge: "Truyền thống",
    route: "/3d-viewer-thap-rua",
  },
];

export default function Collection() {
  const navigate = useNavigate();

  return (
    <div className="collection-page">
      <section className="collection-hero">
        <div className="collection-hero-content">
          <span className="collection-badge-top">BỘ SƯU TẬP</span>
          <h1 className="collection-title">Di Sản Việt Nam 3D</h1>
          <p className="collection-subtitle">
            Khám phá 10 công trình lịch sử nổi tiếng được tái hiện sống động qua
            mô hình 3D tương tác — kéo, xoay, phóng to thỏa thích
          </p>
        </div>
      </section>

      <div className="collection-container">
        <div className="collection-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="collection-card"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(item.route);
              }}
            >
              <div className="collection-card-image">
                <img src={item.image} alt={item.name} />
                <span className="collection-card-badge">{item.badge}</span>
                <div className="collection-card-overlay">
                  <span className="overlay-cta">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>
                    Xem mô hình 3D
                  </span>
                </div>
              </div>
              <div className="collection-card-body">
                <h3 className="collection-card-name">{item.name}</h3>
                <p className="collection-card-desc">{item.desc}</p>
                <button className="collection-card-btn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
