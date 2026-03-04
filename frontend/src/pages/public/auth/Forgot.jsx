import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../../service/authAPI';
import './auth.css';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img src="/logo_viettich.jpg" alt="Việt Tích Logo" className="auth-logo" />
          <h2>Quên mật khẩu</h2>
          <p>Nhập email để đặt lại mật khẩu</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email của bạn" required />
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Gửi link đặt lại'}
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/login">← Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
