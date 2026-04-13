import ContactForm from "./public/landing/ContactForm";
import "./contact/contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-content">
        {/* Left Side - Contact Info */}
        <div className="contact-info-section">
          <div className="info-block">
            <h3>ĐỊA CHỈ</h3>
            <p>TTC Tower, Đường Duy Tân, Phường Cầu Giấy, Hà Nội</p>
          </div>

          <div className="info-block">
            <h3>ĐIỆN THOẠI</h3>
            <p>0918 684 022</p>
          </div>

          <div className="info-block">
            <h3>EMAIL</h3>
            <p>project.viettich@gmail.com</p>
          </div>

          <div className="social-section">
            <a
              href="https://www.facebook.com/profile.php?id=61586615862363"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn facebook"
              title="Facebook"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@viettich.project"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn tiktok"
              title="TikTok"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
