export default function Features() {
  return (
    <section className="story-section" id="features">
      <div className="story-container">
        <div className="story-header">
          <span className="section-badge">Ý TƯỞNG SẢN PHẨM</span>
          <h2 className="section-title">
            Đồ Chơi Xếp Hình - Kết Nối Với Lịch Sử
          </h2>
        </div>

        <div className="story-content">
          <div className="story-text">
            <p className="story-paragraph">
              Việt Tích sinh ra từ một ý tưởng đơn giản nhưng đầy ý nghĩa: tạo
              ra những bộ đồ chơi xếp hình tái hiện các địa danh lịch sử Việt
              Nam, giúp trẻ em vừa vui chơi vừa học hỏi về di sản văn hóa dân
              tộc. Thay vì chỉ nhìn qua sách vở hay ảnh chụp, các em có thể tự
              tay xây dựng lại những công trình mà tổ tiên đã dày công kiến tạo
              qua nhiều thế kỷ.
            </p>
            <p className="story-paragraph">
              Mỗi bộ đồ chơi xếp hình được thiết kế dựa trên nghiên cứu kỹ lưỡng
              về kiến trúc, lịch sử và văn hóa của từng địa danh. Từ những ngôi
              chùa cổ kính đến các khuôn viên văn hóa linh thiêng, từ các công
              trình kiến trúc độc đáo đến những di sản thế giới - mỗi mô hình
              đều mang trong mình một câu chuyện riêng. Qua quá trình lắp ráp
              từng chi tiết, trẻ em không chỉ rèn luyện tay nghề và tư duy, mà
              còn hiểu sâu hơn về giá trị lịch sử và ý nghĩa văn hóa của từng
              công trình.
            </p>
            <p className="story-paragraph">
              Chúng tôi tin rằng, khi trẻ em được "xây dựng" lại chính bàn tay
              mình những di sản mà ông cha đã để lại, các em sẽ trân trọng và tự
              hào hơn về quê hương đất nước. Đó chính là sứ mệnh của Việt Tích -
              biến mỗi giờ phút vui chơi thành bài học về lịch sử, mỗi mảnh ghép
              thành cầu nối giữa quá khứ và tương lai.
            </p>
          </div>

          <div className="story-images">
            <div className="story-image-frame">
              <img
                src="/chuamotcot.jpg"
                alt="Chùa Một Cột - Di sản văn hóa Việt Nam"
                className="story-img"
              />
              <p className="story-image-caption">Chùa Một Cột</p>
            </div>
            <div className="story-image-frame">
              <img
                src="/cotcohanoi.jpg"
                alt="Cột cờ Hà Nội - Biểu tượng của thủ đô"
                className="story-img"
              />
              <p className="story-image-caption">Cột cờ Hà Nội</p>
            </div>
          </div>
        </div>

        <div className="story-cta">
          <p className="cta-text">
            Khám phá thế giới đồ chơi xếp hình địa danh lịch sử Việt Nam
          </p>
          <a href="#products" className="btn-primary">
            Xem bộ sưu tập
          </a>
        </div>
      </div>
    </section>
  );
}
