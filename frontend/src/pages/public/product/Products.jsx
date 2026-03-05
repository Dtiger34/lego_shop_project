import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { getAllProducts } from '../../../service/productAPI';
import { getAllCategories } from '../../../service/categoryAPI';
import { API_BASE_URL } from '../../../service/config';
import './Products.css';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { openModal } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const categoriesData = await getAllCategories();
      const formattedCategories = [
        { _id: 'all', name: 'Tất cả sản phẩm' },
        ...(Array.isArray(categoriesData) ? categoriesData : [])
      ];
      setCategories(formattedCategories);

      const productsData = await getAllProducts();
      setAllProducts(Array.isArray(productsData.data) ? productsData.data : []);
    } catch (err) {
      setError('Lỗi khi tải dữ liệu: ' + err.message);
      setCategories([{ _id: 'all', name: 'Tất cả sản phẩm' }]);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?._id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.numReviews - a.numReviews);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Sản phẩm của Việt Tích</h1>
          <p className="hero-subtitle">
            Khám phá bộ sưu tập đa dạng, gắn liền với các địa danh lịch sử mang những câu chuyện độc đáo.
          </p>
        </div>
      </section>

      <div className="products-container">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={loadData} className="retry-btn">
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="products-controls">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-sort">
                <div className="sort-box">
                  <label htmlFor="sort">Sắp xếp:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="default">Mặc định</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`category-btn ${selectedCategory === category._id ? 'active' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="results-info">
              <p>Hiển thị {filteredProducts.length} sản phẩm</p>
            </div>

            <div className="products-grid-page">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="product-card-page">
                    {product.badge && (
                      <span className="product-badge-page">{product.badge}</span>
                    )}

                    <div className="product-image-page">
                      <img
                        src={`${API_BASE_URL.replace('/api/v1', '')}${product.images[0]}`}
                        alt={product.name}
                        className="product-img"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffe0e0" width="200" height="200"/%3E%3Ctext x="50%25" y="45%25" font-size="40" text-anchor="middle" dy=".3em"%3E%F0%9F%A7%B1%3C/text%3E%3Ctext x="50%25" y="70%25" font-size="13" fill="%23E3000B" text-anchor="middle"%3EHình ảnh không tìm thấy%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>

                    <div className="product-rating">
                      <span className="stars">⭐</span>
                      <span className="rating-value">{product.rating}</span>
                      <span className="review-count">({product.numReviews} đánh giá)</span>
                    </div>

                    <div className="product-price-page">{formatPrice(product.price)}</div>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => openModal(product)}
                    >
                      <span>🛒</span> Thêm vào giỏ
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>Không tìm thấy sản phẩm nào phù hợp</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
