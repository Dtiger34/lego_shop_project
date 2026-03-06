import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

export default function ProductDemo() {
  const { openModal } = useCart();
  const products = [
    {
      id: 1,
      name: 'Đồ chơi xếp hình City Police Station',
      description: 'Bộ đồn cảnh sát thành phố với 668 mảnh ghép, phù hợp bé 7+',
      icon: '🚔',
      price: 1250000,
      badge: 'Bán chạy',
    },
    {
      id: 2,
      name: 'Đồ chơi xếp hình Technic Racing Car',
      description: 'Xe đua kỹ thuật cao với động cơ mô phỏng thực tế, 245 mảnh',
      icon: '🏎️',
      price: 980000,
      badge: 'Mới',
    },
    {
      id: 3,
      name: 'Đồ chơi xếp hình Star Wars Millennium Falcon',
      description: 'Phi thuyền huyền thoại Star Wars, bộ sưu tập cho fan',
      icon: '🚀',
      price: 3200000,
      badge: 'Phổ biến',
    },
    {
      id: 4,
      name: 'Đồ chơi xếp hình Creator 3-in-1 House',
      description: 'Ngôi nhà sáng tạo 3 trong 1, lắp được 3 mô hình khác nhau',
      icon: '🏠',
      price: 1420000,
      badge: '',
    },
    {
      id: 5,
      name: 'Đồ chơi xếp hình Ninjago Dragon',
      description: 'Rồng Ninjago hùng dũng với khớp cử động linh hoạt, 360 mảnh',
      icon: '🐉',
      price: 1380000,
      badge: 'Tiết kiệm',
    },
    {
      id: 6,
      name: 'Đồ chơi xếp hình Marvel Avengers HQ',
      description: 'Trụ sở biệt đội Avengers với các siêu anh hùng, 699 mảnh',
      icon: '🦸',
      price: 2650000,
      badge: 'Khuyến mãi',
    },
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const handleOpenModal = (product) => {
    openModal(product);
  };

  return (
    <section className="product-demo" id="products">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">BỘ SƯU TẬP ĐẶC BIỆT</span>
          <h2 className="section-title">Sản phẩm được chọn lọc tỉ mỉ</h2>
          <p className="section-title">
            Như người thợ xưa chọn nguyên liệu, mỗi bộ đồ chơi xếp hình đều được tuyển chọn kỹ lưỡng để đảm bảo chất lượng tốt nhất
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}
              
              <div className="product-icon">{product.icon}</div>
              
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-price">{formatPrice(product.price)}</div>
              
              <button 
                className="product-btn"
                onClick={() => handleOpenModal(product)}
              >
                Thêm vào giỏ
              </button>
              
              <div className="product-overlay"></div>
            </div>
          ))}
        </div>

        <div className="view-all-products">
          <Link to="/products" className="btn-secondary">
            Xem tất cả sản phẩm (200+ bộ)
          </Link>
        </div>
      </div>
    </section>
  );
}
