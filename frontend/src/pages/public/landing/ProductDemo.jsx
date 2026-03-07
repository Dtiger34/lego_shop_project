import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function ProductDemo() {
  const navigate = useNavigate();
  useCart();

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    navigate(product.route);
  };
  const products = [
    {
      id: 1,
      name: "Chùa Một Cột",
      description:
        "Ngôi chùa nổi tiếng với kiến trúc độc đáo - biểu tượng văn hóa Hà Nội, xây dựng thế kỷ XI",
      image: "/chuamotcot.jpg",
      price: 1250000,
      badge: "Lịch sử",
      route: "/3d-viewer/chua-mot-cot",
    },
    {
      id: 2,
      name: "Cột Cờ Hà Nội",
      description:
        "Biểu tượng của thủ đô với lịch sử anh hùng, nơi lá cờ tổ quốc được kéo lên lần đầu tiên",
      image: "/cotcohanoi.jpg",
      price: 980000,
      badge: "Biểu tượng",
      route: "/3d-viewer-cot-co",
    },
    {
      id: 3,
      name: "Lăng chủ tịch Hồ Chí Minh",
      description:
        "Lăng chủ tịch Hồ Chí Minh, di tích lịch sử đặc biệt quan trọng của cả nước",
      image: "/lang-bac.jpg",
      price: 3200000,
      badge: "Di tích",
      route: "/3d-viewer-lang-bac",
    },
    {
      id: 4,
      name: "Đền Ngọc Sơn",
      description:
        "Đền thờ trên đảo nhỏ giữa Hồ Gươm, nơi yên tĩnh của Hà Nội xưa với kiến trúc thanh thoát",
      image: "/den-ngoc-son.jpg",
      price: 2650000,
      badge: "Linh thiêng",
      route: "/3d-viewer-den-ngoc-son",
    },
    {
      id: 5,
      name: "Cầu Thê Húc",
      description:
        "Cầu gỗ cổ kính giữa Hồ Gươm với kiến trúc cong thanh nhã, nối liền Đền Ngọc Sơn",
      image: "/cau-the-huc.jpg",
      price: 1580000,
      badge: "Kiến trúc",
      route: "/3d-viewer-cau-the-huc",
    },
    {
      id: 6,
      name: "Khuê Văn Các",
      description:
        "Cổng vinh quang của Văn Miếu Quốc Tử Giám, biểu tượng của văn hóa học vấn truyền thống",
      image: "/khue-van-cac.jpg",
      price: 1420000,
      badge: "Văn hóa",
      route: "/3d-viewer-khue-van-cac",
    },
  ];

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <section className="product-demo" id="products">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">BỘ SƯU TẬP ĐẶC BIỆT</span>
          <h2 className="section-title">Sản phẩm được chọn lọc tỉ mỉ</h2>
          <p className="section-title">
            Như người thợ xưa chọn nguyên liệu, mỗi bộ đồ chơi xếp hình đều được
            tuyển chọn kỹ lưỡng để đảm bảo chất lượng tốt nhất
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}

              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>

              <div className="product-price">{formatPrice(product.price)}</div>

              <button
                className="product-btn"
                onClick={() => navigate("/products")}
              >
                Tới trang sản phẩm để đặt hàng
              </button>

              <button
                className="product-btn"
                onClick={() => handleProductClick(product)}
              >
                Xem mô hình 3D
              </button>

              <div className="product-overlay"></div>
            </div>
          ))}
        </div>

        <div className="view-all-products">
          <Link to="/products" className="btn-secondary">
            Khám phá thêm di sản (Chùa, Đền, Lăng Mộ...)
          </Link>
        </div>
      </div>
    </section>
  );
}
