import React, { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Cảm ơn bạn đã liên hệ! Đội ngũ Việt Tích sẽ phản hồi sớm nhất.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section className="contact-form" id="contact">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Kết Nối Với Chúng Tôi</h2>
          <p className="section-title">Chúng tôi luôn sẵn sàng lắng nghe và tư vấn tận tâm cho quý khách hàng</p>
        </div>
        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Họ và Tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Nội Dung *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tôi muốn hỏi về bộ đồ chơi xếp hình..."
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit">
            Gửi Liên Hệ
          </button>
        </form>
      </div>
    </section>
  )
}
