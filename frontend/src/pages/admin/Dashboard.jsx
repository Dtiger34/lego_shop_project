import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, getAllProducts, getAllUsers } from '../../service/adminAPI';
import './admin.css';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('statistics');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, productsResponse, usersResponse] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllUsers()
      ]);

      // Extract products and users arrays from response objects
      const productsData = productsResponse.data || productsResponse;
      const usersData = usersResponse.data || usersResponse;

      setOrders(ordersData);
      setProducts(productsData);
      setUsers(usersData);

      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => {
        if (order.status !== 'cancelled') {
          return sum + order.totalAmount;
        }
        return sum;
      }, 0);

      const pendingOrders = ordersData.filter(order => 
        order.status === 'pending' || order.status === 'processing'
      ).length;

      const lowStockProducts = productsData.filter(product => 
        product.stock < 10
      ).length;

      setStats({
        totalOrders: ordersData.length,
        totalRevenue: totalRevenue,
        totalProducts: productsData.length,
        totalUsers: usersData.length,
        pendingOrders: pendingOrders,
        lowStockProducts: lowStockProducts
      });

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Không thể tải dữ liệu');
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Reload orders to reflect changes
      const ordersData = await getAllOrders();
      setOrders(ordersData);
      alert('Cập nhật trạng thái đơn hàng thành công!');
    } catch (err) {
      alert('Lỗi: ' + (err.message || 'Không thể cập nhật trạng thái'));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="loading">
          <h2>Đang tải dữ liệu...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Quản Trị Viên</h2>
          <p>Việt Tích Admin</p>
        </div>
        
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveSection('statistics')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Thống Kê</span>
          </button>
          
          <button
            className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Quản Lý Đơn Hàng</span>
          </button>
          
          <button
            className={`nav-item ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            <span className="nav-icon">🧱</span>
            <span className="nav-label">Quản Lý Sản Phẩm</span>
          </button>
          
          <button
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-label">Quản Lý Người Dùng</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="back-to-site">
            ← Về trang chủ
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {activeSection === 'statistics' && (
          <StatisticsPanel 
            stats={stats} 
            orders={orders}
            products={products}
            formatCurrency={formatCurrency}
          />
        )}
        
        {activeSection === 'orders' && (
          <OrdersPanel 
            orders={orders} 
            onStatusUpdate={handleStatusUpdate} 
            formatCurrency={formatCurrency} 
            formatDate={formatDate} 
          />
        )}
        
        {activeSection === 'products' && (
          <ProductsPanel 
            products={products} 
            formatCurrency={formatCurrency} 
          />
        )}
        
        {activeSection === 'users' && (
          <UsersPanel 
            users={users} 
            formatDate={formatDate} 
          />
        )}
      </main>
    </div>
  );
}

// Statistics Panel Component
function StatisticsPanel({ stats, orders, products, formatCurrency }) {
  // Calculate recent orders (last 5)
  const recentOrders = orders.slice(0, 5);
  
  // Calculate low stock products
  const lowStockProducts = products.filter(p => p.stock < 10).slice(0, 5);

  return (
    <div className="statistics-section">
      <div className="section-header">
        <h1>Thống Kê Tổng Quan</h1>
        <p>Xem tổng quan hoạt động của hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Doanh Thu</h3>
            <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
            <span className="stat-label">Tổng doanh thu</span>
          </div>
        </div>
        
        <div className="stat-card stat-success">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Đơn Hàng</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-label">{stats.pendingOrders} đang chờ xử lý</span>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">🧱</div>
          <div className="stat-content">
            <h3>Sản Phẩm</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-label">{stats.lowStockProducts} sắp hết hàng</span>
          </div>
        </div>
        
        <div className="stat-card stat-warning">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Người Dùng</h3>
            <p className="stat-value">{stats.totalUsers}</p>
            <span className="stat-label">Tổng khách hàng</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-grid">
        {/* Recent Orders */}
        <div className="activity-card">
          <h2>Đơn Hàng Gần Đây</h2>
          <div className="activity-list">
            {recentOrders.length === 0 ? (
              <p>Chưa có đơn hàng nào</p>
            ) : (
              recentOrders.map(order => (
                <div key={order._id} className="activity-item">
                  <div className="activity-info">
                    <strong>#{order._id.slice(-6)}</strong>
                    <span className="activity-meta">{order.user?.name || 'N/A'}</span>
                  </div>
                  <div className="activity-value">
                    <span className={`status-badge ${order.status}`}>
                      {order.status === 'pending' && 'Chờ xử lý'}
                      {order.status === 'processing' && 'Đang xử lý'}
                      {order.status === 'shipped' && 'Đã gửi'}
                      {order.status === 'delivered' && 'Đã giao'}
                      {order.status === 'cancelled' && 'Đã hủy'}
                    </span>
                    <strong className="activity-amount">{formatCurrency(order.totalAmount)}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="activity-card">
          <h2>Sản Phẩm Sắp Hết Hàng</h2>
          <div className="activity-list">
            {lowStockProducts.length === 0 ? (
              <p>Tất cả sản phẩm còn đủ hàng</p>
            ) : (
              lowStockProducts.map(product => (
                <div key={product._id} className="activity-item">
                  <div className="activity-info">
                    <strong>{product.name}</strong>
                    <span className="activity-meta">{product.category?.name || 'N/A'}</span>
                  </div>
                  <div className="activity-value">
                    <span className={`stock-badge ${product.stock === 0 ? 'out' : 'low'}`}>
                      Còn {product.stock}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Orders Panel Component
function OrdersPanel({ orders, onStatusUpdate, formatCurrency, formatDate }) {
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus(prev => ({
      ...prev,
      [orderId]: status
    }));
  };

  const handleUpdate = (orderId) => {
    const newStatus = selectedStatus[orderId];
    if (newStatus) {
      onStatusUpdate(orderId, newStatus);
    }
  };

  return (
    <div className="orders-section">
      <div className="section-header">
        <h1>Quản Lý Đơn Hàng</h1>
        <p>Xem và cập nhật trạng thái đơn hàng</p>
      </div>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách Hàng</th>
                <th>Sản Phẩm</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Ngày Đặt</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.user?.name || 'N/A'}</strong>
                      <small>{order.user?.email || 'N/A'}</small>
                    </div>
                  </td>
                  <td>
                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                          {item.product?.name || 'N/A'} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <strong className="price-value">{formatCurrency(order.totalAmount)}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status === 'pending' && 'Chờ xử lý'}
                      {order.status === 'processing' && 'Đang xử lý'}
                      {order.status === 'shipped' && 'Đã gửi'}
                      {order.status === 'delivered' && 'Đã giao'}
                      {order.status === 'cancelled' && 'Đã hủy'}
                    </span>
                  </td>
                  <td><small>{formatDate(order.createdAt)}</small></td>
                  <td>
                    <div className="action-group">
                      <select
                        className="status-select"
                        value={selectedStatus[order._id] || order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="shipped">Đã gửi</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                      <button
                        className="btn-update"
                        onClick={() => handleUpdate(order._id)}
                        disabled={!selectedStatus[order._id] || selectedStatus[order._id] === order.status}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Products Panel Component
function ProductsPanel({ products, formatCurrency }) {
  return (
    <div className="products-section">
      <div className="section-header">
        <h1>Quản Lý Sản Phẩm</h1>
        <p>Xem danh sách và quản lý tồn kho sản phẩm</p>
      </div>
      
      {products.length === 0 ? (
        <div className="empty-state">
          <p>Chưa có sản phẩm nào</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên Sản Phẩm</th>
                <th>Danh Mục</th>
                <th>Giá</th>
                <th>Tồn Kho</th>
                <th>Đã Bán</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-thumbnail"
                    />
                  </td>
                  <td>
                    <div className="product-info">
                      <strong>{product.name}</strong>
                      <small>{product.description?.substring(0, 50)}...</small>
                    </div>
                  </td>
                  <td>{product.category?.name || 'N/A'}</td>
                  <td>
                    <strong className="price-value">{formatCurrency(product.price)}</strong>
                  </td>
                  <td>
                    <span className={`stock-badge ${product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'ok'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>{product.sold || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Users Panel Component
function UsersPanel({ users, formatDate }) {
  return (
    <div className="users-section">
      <div className="section-header">
        <h1>Quản Lý Người Dùng</h1>
        <p>Xem danh sách người dùng và vai trò</p>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>Chưa có người dùng nào</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai Trò</th>
                <th>Ngày Đăng Ký</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.role === 'admin' ? 'delivered' : 'pending'}`}>
                      {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                    </span>
                  </td>
                  <td><small>{formatDate(user.createdAt)}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
