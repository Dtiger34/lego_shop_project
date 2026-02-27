import React from 'react'

export default function Team() {
  const teamMembers = [
    {
      name: 'Nguyễn Văn An',
      role: 'Founder & CEO',
      description: 'Chuyên gia về đồ chơi Lego với hơn 10 năm kinh nghiệm phân phối'
    },
    {
      name: 'Trần Thị Bích',
      role: 'Giám Đốc Sáng Tạo',
      description: 'Thiết kế trải nghiệm mua sắm Lego thú vị và độc đáo'
    },
    {
      name: 'Lê Hoàng Cường',
      role: 'Trưởng Phòng Kho Vận',
      description: 'Quản lý kho hàng và đảm bảo giao hàng nhanh chóng, nguyên vẹn'
    },
    {
      name: 'Phạm Thu Dung',
      role: 'Chuyên Viên Marketing',
      description: 'Kết nối cộng đồng Lego Việt Nam với những ưu đãi hấp dẫn'
    },
    {
      name: 'Hoàng Minh Tuấn',
      role: 'Chuyên Viên Tư Vấn',
      description: 'Hỗ trợ khách hàng lựa chọn bộ Lego phù hợp với mọi lứa tuổi'
    }
  ]

  return (
    <section className="team-section" id="team">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Đội Ngũ Của Chúng Tôi</h2>
          <p className="section-subtitle">Những con người tận tâm mang đồ chơi Lego chính hãng đến với bạn</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">👤</div>
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
