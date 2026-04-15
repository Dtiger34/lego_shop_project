import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../../service/productAPI";
import { BASE_URL } from "../../../service/config";
import { useCart } from "../../../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN") + " VNĐ";

  const handleQuantityChange = (change) => {
    const next = quantity + change;
    if (next >= 1 && next <= 99) setQuantity(next);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, "success");
  };

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-error">
        <p>Không tìm thấy sản phẩm.</p>
        <button onClick={() => navigate("/products")}>← Quay lại</button>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="pd-page">
      <div className="pd-container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <span onClick={() => navigate("/")}>Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate("/products")}>Sản phẩm</span>
          <span>/</span>
          <span className="pd-breadcrumb-current">{product.name}</span>
        </nav>

        <div className="pd-main">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-image">
              {product.badge && (
                <span className="pd-badge">{product.badge}</span>
              )}
              <img
                src={`${BASE_URL}${images[selectedImage]}`}
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e0e6ed" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="40" text-anchor="middle" dy=".3em"%3E%F0%9F%A7%B1%3C/text%3E%3C/svg%3E';
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    className="pd-carousel-btn pd-carousel-prev"
                    onClick={() => setSelectedImage((i) => (i === 0 ? images.length - 1 : i - 1))}
                    aria-label="Ảnh trước"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button
                    className="pd-carousel-btn pd-carousel-next"
                    onClick={() => setSelectedImage((i) => (i === images.length - 1 ? 0 : i + 1))}
                    aria-label="Ảnh tiếp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <div className="pd-carousel-counter">{selectedImage + 1} / {images.length}</div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="pd-thumbnails">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-thumb ${selectedImage === i ? "active" : ""}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={`${BASE_URL}${img}`} alt={`${product.name} ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-description">{product.description}</p>

            <div className="pd-price">{formatPrice(product.price)}</div>

            {product.stock !== undefined && (
              <p className="pd-stock">
                {product.stock > 0
                  ? `Còn ${product.stock} sản phẩm`
                  : "Hết hàng"}
              </p>
            )}

            <div className="pd-quantity">
              <span>Số lượng:</span>
              <div className="pd-qty-controls">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-btn-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              <button
                className="pd-btn-back"
                onClick={() => navigate("/products")}
              >
                ← Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
