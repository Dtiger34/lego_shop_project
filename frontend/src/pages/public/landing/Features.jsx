export default function Features() {
  const features = [
    {
      icon: '🧱',
      title: '100% Hàng chính hãng',
      description: 'Tất cả sản phẩm đều là Lego chính hãng, có tem xác nhận, được nhập khẩu từ nhà phân phối uy tín.',
      color: 'lego-red',
    },
    {
      icon: '🎨',
      title: 'Đa dạng chủ đề',
      description: 'City, Technic, Star Wars, Marvel, Creator, Ninjago — hàng trăm chủ đề phù hợp cho mọi độ tuổi.',
      color: 'lego-yellow',
    },
    {
      icon: '🧩',
      title: 'Kích thích sáng tạo',
      description: 'Lego phát triển tư duy không gian, khả năng giải quyết vấn đề và sự sáng tạo từ nhỏ.',
      color: 'lego-navy',
    },
    {
      icon: '🏆',
      title: 'Chất lượng bền bỉ',
      description: 'Mảnh ghép Lego được sản xuất với độ chính xác cao, không bong tróc màu, an toàn cho trẻ em.',
      color: 'lego-orange',
    },
    {
      icon: '🚚',
      title: 'Giao hàng nhanh toàn quốc',
      description: 'Vận chuyển đóng gói cẩn thận, giao hàng nhanh trên toàn quốc. Hỗ trợ đổi trả trong 7 ngày.',
      color: 'lego-pink',
    },
    {
      icon: '🎁',
      title: 'Quà tặng lý tưởng',
      description: 'Lego là món quà sinh nhật, Giáng sinh hoàn hảo — đóng hộp đẹp, kèm thiệp theo yêu cầu.',
      color: 'lego-blue',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-header">
        <span className="section-badge">TẠI SAO CHỌN LEGO SHOP</span>
        <h2 className="section-title">Những lý do để yêu thích Lego</h2>
        <p className="section-subtitle">
          Sản phẩm Lego của chúng tôi không chỉ vui, mà còn phát triển tư duy sáng tạo cho mọi lứa tuổi
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
