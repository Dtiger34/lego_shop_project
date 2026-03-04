import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import Layout from './components/Layout'
import Toast from './components/Toast'
import ProductModal from './components/ProductModal'
import ShippingModal from './components/ShippingModal'
import { createOrder } from './service/orderAPI'
import Home from './pages/Home'
import Products from './pages/public/product/Products'
import Cart from './pages/public/cart/Cart'
import Login from './pages/public/auth/Login';
import Regist from './pages/public/auth/Regist';
import Forgot from './pages/public/auth/Forgot';
import Dashboard from './pages/admin/Dashboard';

// Protected Route for Admin
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppContent() {
  const { toast, closeToast, modal, closeModal, addToCart, shippingModal, closeShippingModal, cart, clearCart } = useCart();

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const handleShippingSubmit = async (shippingData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const orderData = {
        userId: user.id || null,
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: shippingData.fullName,
          email: shippingData.email,
          phone: shippingData.phone,
          address: shippingData.address
        }
      };

      const response = await createOrder(orderData);
      
      clearCart();
      closeShippingModal();
      
      alert('Đơn hàng tạo thành công! Mã đơn hàng: ' + response._id);
    } catch (error) {
      alert('Lỗi khi tạo đơn hàng: ' + error.message);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes - No Layout */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
          
          {/* Public Routes - With Layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Regist />} />
                <Route path="/forgot-password" element={<Forgot />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
      <ProductModal 
        show={modal.show}
        product={modal.product}
        onClose={closeModal}
        onAddToCart={handleAddToCart}
      />
      <Toast 
        show={toast.show}
        message="Đã thêm vào giỏ hàng!"
        product={toast.product}
        onClose={closeToast}
      />
      <ShippingModal
        show={shippingModal.show}
        onClose={closeShippingModal}
        onSubmit={handleShippingSubmit}
      />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
