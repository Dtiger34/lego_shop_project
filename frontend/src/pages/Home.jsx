import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#E3000B', fontSize: '2.5rem', marginBottom: '1rem' }}>
        🧱 Chào mừng đến Lego Shop!
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Khám phá bộ sưu tập Lego chính hãng đa dạng, dành cho mọi lứa tuổi.
      </p>
      <Link
        to="/products"
        style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          background: 'linear-gradient(to right, #E3000B, #ff4444)',
          color: 'white',
          borderRadius: '0.75rem',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1.1rem',
          boxShadow: '0 4px 12px rgba(227,0,11,0.3)'
        }}
      >
        Xem sản phẩm →
      </Link>
    </div>
  );
}
