import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { getAllProducts } from '../../../service/productAPI';
import { getAllCategories } from '../../../service/categoryAPI';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { openModal } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(prodData.data || prodData);
        setCategories(catData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category?._id === selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';

  if (loading) return <div className="products-loading">Đang tải sản phẩm...</div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>🧱 Sản Phẩm Lego</h1>
        <div className="products-filters">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="products-empty">Không tìm thấy sản phẩm nào.</div>
      ) : (
        <div className="products-grid">
          {filtered.map(product => (
            <div key={product._id} className="product-card" onClick={() => openModal(product)}>
              <div className="product-image">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <span className="product-placeholder">🧱</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category?.name || 'Chưa phân loại'}</p>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button className="btn-add">+ Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
