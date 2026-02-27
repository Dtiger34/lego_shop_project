import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, openShippingModal } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <p>🛒 Giỏ hàng trống</p>
        <Link to="/products" className="btn-shop">Mua sắm ngay</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 Giỏ Hàng</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.name} />
                ) : (
                  <span>🧱</span>
                )}
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
              <button className="btn-remove" onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Tổng cộng</h3>
          <div className="summary-total">{formatPrice(getTotalPrice())}</div>
          <button className="btn-checkout" onClick={openShippingModal}>
            Tiến hành đặt hàng →
          </button>
          <Link to="/products" className="btn-continue-shopping">
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
