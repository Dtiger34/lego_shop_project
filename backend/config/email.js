const nodemailer = require("nodemailer");

// Config transporter Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Gửi email khách hàng
const sendCustomerConfirmationEmail = async (customerEmail, customerName, order) => {
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
        <ul>${itemsList}</ul>
        <p><strong>Tổng tiền:</strong> ${order.totalPrice.toLocaleString('vi-VN')} đ</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✓ Gửi mail khách thành công:", info.response);
    return true;
  } catch (err) {
    console.error("Lỗi gửi mail khách:", err);
    return false;
  }
};

// Gửi email admin
const sendAdminNotificationEmail = async (order, customerName, customerEmail) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `[Đơn hàng mới] #${order._id}`,
      html: `
        <h2>Việt Tích - Đơn hàng mới</h2>
        <p>Khách: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <p>Tổng: ${order.totalPrice.toLocaleString('vi-VN')} đ</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✓ Gửi mail admin thành công:", info.response);
    return true;
  } catch (err) {
    console.error("Lỗi gửi mail admin:", err);
    return false;
  }
};

module.exports = {
  sendCustomerConfirmationEmail,
  sendAdminNotificationEmail
};
