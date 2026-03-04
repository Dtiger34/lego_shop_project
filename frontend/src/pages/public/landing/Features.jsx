export default function Features() {
  const features = [
    {
      icon: '🧱',
      title: 'Chất lượng như nghề thủ công',
      description: 'Như người thợ xưa tỉ mỉ từng chi tiết, mỗi mảnh Lego đều được kiểm định chặt chẽ, nguyên vẹn và chính hãng.',
      color: 'lego-red',
    },
    {
      icon: '🎨',
      title: 'Đa dạng như bức tranh lịch sử',
      description: 'Từ kiến trúc đến khoa học, từ thiên nhiên đến vũ trụ — hàng trăm chủ đề để khám phá và sáng tạo.',
      color: 'lego-yellow',
    },
    {
      icon: '🧩',
      title: 'Nuôi dưỡng tư duy kiên trì',
      description: 'Như tổ tiên dạy: "Có công mài sắt có ngày nên kim". Lego rèn luyện sự kiên nhẫn, tư duy logic và khéo léo từ nhỏ.',
      color: 'lego-navy',
    },
    {
      icon: '🏆',
      title: 'Bền bỉ qua thời gian',
      description: 'Sản phẩm được chế tác với độ chính xác cao, truyền từ thế hệ này sang thế hệ khác.',
      color: 'lego-orange',
    },
    {
      icon: '🚚',
      title: 'Tận tâm trong từng gói hàng',
      description: 'Đóng gói chu đáo, vận chuyển cẩn thận đến tay khách hàng khắp mọi miền đất nước.',
      color: 'lego-pink',
    },
    {
      icon: '🎁',
      title: 'Món quà tri thức',
      description: 'Hơn cả vật chất, Lego là món quà giáo dục ý nghĩa — truyền cảm hứng và kiến thức cho thế hệ trẻ.',
      color: 'lego-blue',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-header">
        <span className="section-badge">TRUYỀN THỐNG & HIỆN ĐẠI</span>
        <h2 className="section-title">Giá trị chúng tôi gìn giữ</h2>
        <p className="section-subtitle">
          Kế thừa tinh thần nghề nhân và sự tỉ mỉ của cha ông, chúng tôi mang đến đồ chơi chất lượng giúp trẻ thơ phát triển tư duy và kỹ năng
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className={`feature-card feature-${feature.color}`}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <p className="cta-text">Sẵn sàng bắt đầu hành trình sáng tạo Lego của bạn?</p>
        <a href="#products" className="btn-primary">
          Khám phá bộ sưu tập ngay
        </a>
      </div>
    </section>
  );
}
