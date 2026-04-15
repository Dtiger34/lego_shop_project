import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getAllProducts } from "../../../service/productAPI";
import { BASE_URL } from "../../../service/config";
import "./Products.css";

function ProductCardImage({ images, name, onImageClick }) {
  const [idx, setIdx] = useState(0);
  const hasMultiple = images && images.length > 1;

  const prev = (e) => {
    e.stopPropagation();
    setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="product-image-page" onClick={onImageClick} style={{ cursor: "pointer", position: "relative" }}>
      <img
        src={images && images[idx] ? `${BASE_URL}${images[idx]}` : ""}
        alt={name}
        className="product-img"
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffe0e0" width="200" height="200"/%3E%3Ctext x="50%25" y="45%25" font-size="40" text-anchor="middle" dy=".3em"%3E%F0%9F%A7%B1%3C/text%3E%3Ctext x="50%25" y="70%25" font-size="13" fill="%23E3000B" text-anchor="middle"%3EHình ảnh không tìm thấy%3C/text%3E%3C/svg%3E';
        }}
      />
      {hasMultiple && (
        <>
          <button className="card-carousel-btn card-carousel-prev" onClick={prev} aria-label="Ảnh trước">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="card-carousel-btn card-carousel-next" onClick={next} aria-label="Ảnh tiếp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="card-carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`card-carousel-dot${i === idx ? " active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Products() {
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { openModal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const productsData = await getAllProducts();
      setAllProducts(Array.isArray(productsData.data) ? productsData.data : []);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu: " + err.message);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description &&
            p.description.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.numReviews - a.numReviews);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Sản phẩm của Việt Tích</h1>
          <p className="hero-subtitle">
            Khám phá bộ sưu tập đa dạng, gắn liền với các địa danh lịch sử mang
            những câu chuyện độc đáo.
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

<div className="products-grid-page">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="product-card-page">
                    {product.badge && (
                      <span className="product-badge-page">
                        {product.badge}
                      </span>
                    )}

                    <ProductCardImage
                      images={product.images}
                      name={product.name}
                      onImageClick={() => navigate(`/product/${product._id}`)}
                    />

                    <h3
                      className="product-name"
                      onClick={() => navigate(`/product/${product._id}`)}
                      style={{ cursor: "pointer" }}
                    >{product.name}</h3>
                    <p className="product-desc">{product.description}</p>

<div className="product-price-page">
                      {formatPrice(product.price)}
                    </div>

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
