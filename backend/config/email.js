const nodemailer = require("nodemailer");

// Check if email is configured
const isEmailConfigured = () => {
  return process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD;
};

// Config transporter Gmail
let transporter = null;

if (isEmailConfigured()) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log("❌ Email configuration error:", error.message);
      console.log("⚠️  Please check your .env file:");
      console.log("   - GMAIL_EMAIL should be your Gmail address");
      console.log("   - GMAIL_APP_PASSWORD should be your 16-character App Password");
      console.log("   - See .env.example for instructions");
    } else {
      console.log("✓ Email server is ready to send messages");
    }
  });
} else {
  console.log("⚠️  Email not configured. Emails will not be sent.");
  console.log("   To enable email, set GMAIL_EMAIL and GMAIL_APP_PASSWORD in .env");
}

// Gửi email khách hàng
const sendCustomerConfirmationEmail = async (customerEmail, customerName, order) => {
  if (!transporter) {
    console.log("⚠️  Email not configured - skipping customer email");
    return false;
  }

  try {
    const itemsList = order.items
      .map(item => `<li>${item.name} - SL: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</li>`)
      .join('');

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: customerEmail,
      subject: `Xác nhận đơn hàng #${order._id}`,
      html: `
        <h2>Cảm ơn ${customerName} đã mua hàng tại Việt Tích!</h2>
        <p>Đơn hàng của bạn đã được xác nhận.</p>
        <h3>Chi tiết đơn hàng:</h3>
        <ul>${itemsList}</ul>
        <p><strong>Tổng tiền:</strong> ${order.totalPrice.toLocaleString('vi-VN')} đ</p>
        <p>Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
        <br>
        <p>Trân trọng,<br>Đội ngũ Việt Tích</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✓ Gửi mail khách thành công:", info.response);
    return true;
  } catch (err) {
    console.error("❌ Lỗi gửi mail khách:", err.message);
    return false;
  }
};

// Gửi email admin
const sendAdminNotificationEmail = async (order, customerName, customerEmail) => {
  if (!transporter) {
    console.log("⚠️  Email not configured - skipping admin email");
    return false;
  }

  try {
    const itemsList = order.items
      .map(item => `<li>${item.name} - SL: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</li>`)
      .join('');

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_EMAIL,
      subject: `[Đơn hàng mới] #${order._id}`,
      html: `
        <h2>🛒 Việt Tích - Đơn hàng mới</h2>
        <p><strong>Khách hàng:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <h3>Chi tiết đơn hàng:</h3>
        <ul>${itemsList}</ul>
        <p><strong>Tổng tiền:</strong> ${order.totalPrice.toLocaleString('vi-VN')} đ</p>
        <p><strong>Địa chỉ giao hàng:</strong><br>${order.shippingAddress?.address || 'N/A'}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✓ Gửi mail admin thành công:", info.response);
    return true;
  } catch (err) {
    console.error("❌ Lỗi gửi mail admin:", err.message);
    return false;
  }
};

module.exports = {
  sendCustomerConfirmationEmail,
  sendAdminNotificationEmail
};
