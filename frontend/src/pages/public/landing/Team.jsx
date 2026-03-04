import React from 'react'

export default function Team() {
  const teamMembers = [
    {
      name: 'Nguyễn Văn An',
      role: 'Người Sáng Lập',
      description: 'Kế thừa tinh thần nghệ nhân, mang đến đồ chơi chất lượng cho thế hệ trẻ'
    },
    {
      name: 'Trần Thị Bích',
      role: 'Giám Đốc Sáng Tạo',
      description: 'Gìn giữ giá trị truyền thống trong từng trải nghiệm hiện đại'
    },
    {
      name: 'Lê Hoàng Cường',
      role: 'Trưởng Bộ Phận Logistics',
      description: 'Đảm bảo sản phẩm đến tay khách hàng với sự chu đáo và tận tâm'
    },
    {
      name: 'Phạm Thu Dung',
      role: 'Chuyên Viên Truyền Thông',
      description: 'Kết nối cộng đồng yêu thích sự sáng tạo và xây dựng'
    },
    {
      name: 'Hoàng Minh Tuấn',
      role: 'Chuyên Viên Tư Vấn',
      description: 'Tư vấn tận tình để tìm bộ Lego phù hợp với từng độ tuổi và sở thích'
    }
  ]

  return (
    <section className="team-section" id="team">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Đội Ngũ Của Chúng Tôi</h2>
          <p className="section-title">Những người con đất Việt với tâm huyết truyền cảm hứng xây dựng cho thế hệ mai sau</p>
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
