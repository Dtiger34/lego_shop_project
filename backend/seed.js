const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

// Import Models
const User = require("./model/User");
const Category = require("./model/Category");
const Product = require("./model/Product");
const Review = require("./model/Review");
const Cart = require("./model/Cart");
const Order = require("./model/Order");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/legoshop",
    );
    console.log("MongoDB đã kết nối");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Clear all collections
const clearDB = async () => {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    console.log("Cơ sở dữ liệu đã xóa");
  } catch (err) {
    console.error("Error clearing database:", err.message);
  }
};

// Seed data
const seedDB = async () => {
  try {
    // ===== CATEGORIES =====
    const categories = await Category.insertMany([
      { name: "Di tích Hà Nội", slug: "di-tich-ha-noi" },
      { name: "Di tích Miền Trung & Miền Nam", slug: "di-tich-mien-trung-nam" },
    ]);
    console.log("✓ Danh mục đã được thêm:", categories.length);

    // ===== USERS =====
    const hashPassword = async (pwd) => {
      const salt = await bcryptjs.genSalt(10);
      return await bcryptjs.hash(pwd, salt);
    };

    const users = await User.insertMany([
      {
        name: "Quản Trị Viên",
        email: "admin@legoshop.com",
        password: await hashPassword("admin123"),
        role: "admin",
      },
      {
        name: "Nguyễn Văn An",
        email: "nguyenvana@example.com",
        password: await hashPassword("user123"),
        role: "user",
      },
      {
        name: "Trần Thị Bình",
        email: "tranthib@example.com",
        password: await hashPassword("user123"),
        role: "user",
      },
      {
        name: "Lê Hoàng Cường",
        email: "lehoangc@example.com",
        password: await hashPassword("user123"),
        role: "user",
      },
    ]);
    console.log("✓ Người dùng đã được thêm:", users.length);

    // ===== PRODUCTS =====
    const products = await Product.insertMany([
      {
        name: "Little Hanoi",
        price: 250000,
        description:
          "Bộ xếp hình thu nhỏ phố cổ Hà Nội – nơi lưu giữ hồn văn hóa ngàn năm của Thủ đô. 180 mảnh ghép, tái hiện những căn nhà ống đặc trưng và không gian phố cổ yên bình. Phù hợp từ 6 tuổi.",
        images: ["/uploads/khue_van_cac.jpg"],
        category: categories[0]._id,
        stock: 50,
        sold: 32,
        rating: 4.7,
        numReviews: 18,
        viewerUrl: "/3d-viewer-khue-van-cac",
      },
      {
        name: "Hoan Kiem Lake",
        price: 700000,
        description:
          "Tái hiện khung cảnh Hồ Hoàn Kiếm – trái tim của Hà Nội – với Tháp Rùa và cầu Thê Húc huyền thoại. 290 mảnh ghép cao cấp, mô phỏng mặt hồ xanh biếc và đảo Ngọc. Phù hợp từ 8 tuổi.",
        images: ["/uploads/thap_rua.jpg"],
        category: categories[0]._id,
        stock: 35,
        sold: 54,
        rating: 4.8,
        numReviews: 24,
        viewerUrl: "/3d-viewer-thap-rua",
      },
      {
        name: "Ha Long Bay",
        price: 350000,
        description:
          "Kỳ quan thiên nhiên thế giới Vịnh Hạ Long với những đảo đá vôi sừng sững giữa biển khơi. 210 mảnh ghép, mô phỏng cảnh đảo đá hùng vĩ và mặt biển xanh ngọc. Phù hợp từ 7 tuổi.",
        images: ["/uploads/hon_trong_mai.jpg"],
        category: categories[1]._id,
        stock: 45,
        sold: 38,
        rating: 4.6,
        numReviews: 15,
        viewerUrl: "/3d-viewer-hon-trong-mai",
      },
      {
        name: "Ngo Mon Gate",
        price: 600000,
        description:
          "Ngọ Môn – cổng chính uy nghi của Hoàng Thành Huế, biểu tượng quyền lực của triều Nguyễn. 260 mảnh ghép, tỷ lệ 1:150, mô phỏng lầu Ngũ Phụng và 5 lối đi truyền thống. Phù hợp từ 9 tuổi.",
        images: ["/uploads/ngo_mon_hue.jpg"],
        category: categories[1]._id,
        stock: 30,
        sold: 27,
        rating: 4.8,
        numReviews: 14,
        viewerUrl: "/3d-viewer-ngo-mon",
      },
    ]);
    console.log("✓ Sản phẩm đã được thêm:", products.length);

    // ===== REVIEWS =====
    const reviews = await Review.insertMany([
      {
        user: users[1]._id,
        product: products[0]._id,
        rating: 5,
        comment: "Little Hanoi rất đáng yêu! Con tôi mê lắm, lắp xong trưng bày rất đẹp.",
      },
      {
        user: users[2]._id,
        product: products[1]._id,
        rating: 5,
        comment: "Hoan Kiem Lake quá đẹp! Tháp Rùa và cầu Thê Húc được làm rất chi tiết.",
      },
      {
        user: users[3]._id,
        product: products[1]._id,
        rating: 4,
        comment: "Chất lượng tốt, mảnh ghép chắc chắn. Giá cả hợp lý.",
      },
      {
        user: users[1]._id,
        product: products[2]._id,
        rating: 5,
        comment: "Ha Long Bay miniature siêu đẹp! Cảm giác như đang đứng giữa vịnh vậy.",
      },
      {
        user: users[2]._id,
        product: products[3]._id,
        rating: 5,
        comment: "Ngo Mon Gate rất hoành tráng, xứng đáng với giá tiền. Lắp khá thú vị!",
      },
      {
        user: users[3]._id,
        product: products[3]._id,
        rating: 4,
        comment: "Sản phẩm đẹp, đóng gói cẩn thận. Sẽ mua thêm cho bộ sưu tập.",
      },
    ]);
    console.log("✓ Đánh giá đã được thêm:", reviews.length);

    // ===== CARTS =====
    const carts = await Cart.insertMany([
      {
        user: users[1]._id,
        items: [
          { product: products[0]._id, quantity: 1 },
          { product: products[1]._id, quantity: 1 },
        ],
      },
      {
        user: users[2]._id,
        items: [{ product: products[3]._id, quantity: 1 }],
      },
    ]);
    console.log("✓ Giỏ hàng đã được thêm:", carts.length);

    // ===== ORDERS =====
    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 2,
          },
        ],
        totalPrice: products[0].price * 2,
        shippingAddress: {
          fullName: "Nguyễn Văn An",
          phone: "0912345678",
          address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
        },
        status: "completed",
        paymentMethod: "Credit Card",
        isPaid: true,
        paidAt: new Date("2026-02-10"),
      },
      {
        user: users[2]._id,
        items: [
          {
            product: products[1]._id,
            name: products[1].name,
            price: products[1].price,
            quantity: 1,
          },
          {
            product: products[2]._id,
            name: products[2].name,
            price: products[2].price,
            quantity: 1,
          },
        ],
        totalPrice: products[1].price + products[2].price,
        shippingAddress: {
          fullName: "Trần Thị Bình",
          phone: "0987654321",
          address: "456 Đường Trần Hưng Đạo, Quận 4, TP.HCM",
        },
        status: "shipping",
        paymentMethod: "Bank Transfer",
        isPaid: true,
        paidAt: new Date("2026-02-15"),
      },
      {
        user: users[3]._id,
        items: [
          {
            product: products[3]._id,
            name: products[3].name,
            price: products[3].price,
            quantity: 1,
          },
        ],
        totalPrice: products[3].price,
        shippingAddress: {
          fullName: "Lê Hoàng Cường",
          phone: "0933333333",
          address: "789 Đường Võ Văn Kiệt, Quận 5, TP.HCM",
        },
        status: "pending",
        paymentMethod: "COD",
        isPaid: false,
      },
    ]);
    console.log("✓ Đơn hàng đã được thêm:", orders.length);

    console.log("\n✅ Dữ liệu đã được thêm vào cơ sở dữ liệu thành công!");
    console.log("\n📋 Tài khoản mẫu:");
    console.log("   Admin  : admin@legoshop.com  / admin123");
    console.log("   User 1 : nguyenvana@example.com / user123");
    console.log("   User 2 : tranthib@example.com   / user123");
    console.log("   User 3 : lehoangc@example.com   / user123");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Run seed
const runSeed = async () => {
  await connectDB();
  await clearDB();
  await seedDB();
  await mongoose.connection.close();
  console.log("\nKết nối đã đóng.");
};

runSeed();
