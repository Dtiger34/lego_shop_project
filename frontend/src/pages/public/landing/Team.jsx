import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Team() {
  const teamMembers = [
    {
      name: "Vũ Quang Huy",
      role: "Người Sáng Lập",
      description:
        "Kế thừa tinh thần nghệ nhân, mang đến đồ chơi chất lượng cho thế hệ trẻ",
    },
    {
      name: "Trần Đình Quân",
      role: "Giám Đốc Sáng Tạo",
      description:
        "Gìn giữ giá trị truyền thống trong từng trải nghiệm hiện đại",
    },
    {
      name: "Trần Đức Mạnh",
      role: "Trưởng Bộ Phận Logistics",
      description:
        "Đảm bảo sản phẩm đến tay khách hàng với sự chu đáo và tận tâm",
    },
    {
      name: "Trần Khánh Linh",
      role: "Chuyên Viên Truyền Thông",
      description: "Kết nối cộng đồng yêu thích sự sáng tạo và xây dựng",
    },
    {
      name: "Đỗ Đức Hoà",
      role: "Chuyên Viên Tư Vấn",
      description:
        "Tư vấn tận tình để tìm bộ đồ chơi xếp hình phù hợp với từng độ tuổi và sở thích",
    },
  ];

  return (
    <section className="team-section" id="team">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Đội Ngũ Của Chúng Tôi</h2>
          <p className="section-title">
            Những người con đất Việt với tâm huyết truyền cảm hứng xây dựng cho
            thế hệ mai sau
          </p>
        </div>

        <div className="team-carousel-wrapper">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="team-swiper"
            loop={true}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="team-slide">
                <div className="team-card">
                  <div className="team-avatar">
                    <div className="avatar-placeholder">👤</div>
                  </div>
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
