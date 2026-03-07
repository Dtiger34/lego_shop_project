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
      // Hà Nội
      {
        name: "Bộ Xếp Hình Khuê Văn Các - Văn Miếu Quốc Tử Giám",
        price: 1250000,
        description:
          "Tái hiện Khuê Văn Các – cổng vinh quang của Văn Miếu Quốc Tử Giám với kiến trúc gỗ tinh xảo thế kỷ XV. 520 mảnh ghép cao cấp, kèm sách hướng dẫn lắp ráp song ngữ. Phù hợp từ 10 tuổi.",
        images: ["/khue-van-cac.jpg"],
        category: categories[0]._id,
        stock: 30,
        sold: 48,
        rating: 4.9,
        numReviews: 21,
        viewerUrl: "/3d-viewer-khue-van-cac",
      },
      {
        name: "Bộ Xếp Hình Cột Cờ Hà Nội - Biểu Tượng Thủ Đô",
        price: 980000,
        description:
          "Cột Cờ Hà Nội – công trình kiến trúc quân sự nổi tiếng được xây từ năm 1812. 380 mảnh ghép chi tiết, bao gồm cột cờ cao 41 mét thu nhỏ tỷ lệ 1:100. Phù hợp từ 8 tuổi.",
        images: ["/cotcohanoi.jpg"],
        category: categories[0]._id,
        stock: 25,
        sold: 35,
        rating: 4.7,
        numReviews: 16,
        viewerUrl: "/3d-viewer-cot-co",
      },
      {
        name: "Bộ Xếp Hình Tháp Rùa - Biểu Tượng Hồ Gươm",
        price: 850000,
        description:
          "Tháp Rùa huyền thoại tọa lạc giữa Hồ Hoàn Kiếm – biểu tượng lâu đời nhất của Hà Nội. 310 mảnh ghép, cao 18 cm sau khi lắp. Phù hợp từ 8 tuổi.",
        images: ["/thap-rua.jpg"],
        category: categories[0]._id,
        stock: 40,
        sold: 62,
        rating: 4.8,
        numReviews: 28,
        viewerUrl: "/3d-viewer-thap-rua",
      },
      {
        name: "Bộ Xếp Hình Tháp Bút - Di Tích Văn Hóa Hồ Gươm",
        price: 750000,
        description:
          'Tháp Bút bên cạnh cầu Thê Húc – biểu tượng của chữ viết và tinh thần học vấn Việt Nam. 280 mảnh, kèm chi tiết nhỏ mô phỏng chữ khắc "Tả Thanh Thiên". Phù hợp từ 8 tuổi.',
        images: ["/thap-but.jpg"],
        category: categories[0]._id,
        stock: 35,
        sold: 41,
        rating: 4.6,
        numReviews: 14,
        viewerUrl: "/3d-viewer-thap-but",
      },
      {
        name: "Bộ Xếp Hình Cầu Thê Húc - Cầu Cổ Giữa Hồ Gươm",
        price: 690000,
        description:
          "Cầu Thê Húc sơn đỏ nổi tiếng dẫn vào đền Ngọc Sơn trên Hồ Hoàn Kiếm. 245 mảnh, màu sắc truyền thống, cao 12 cm. Phù hợp từ 7 tuổi.",
        images: ["/cau-the-huc.jpg"],
        category: categories[0]._id,
        stock: 45,
        sold: 58,
        rating: 4.7,
        numReviews: 23,
        viewerUrl: "/3d-viewer-cau-the-huc",
      },
      {
        name: "Bộ Xếp Hình Đền Ngọc Sơn - Đền Thờ Giữa Hồ Gươm",
        price: 1100000,
        description:
          "Đền Ngọc Sơn tọa lạc trên đảo Ngọc giữa Hồ Hoàn Kiếm – kiệt tác kiến trúc tâm linh Hà Nội thế kỷ XIX. 460 mảnh ghép, bao gồm cầu Thê Húc thu nhỏ. Phù hợp từ 10 tuổi.",
        images: ["/den-ngoc-son.jpg"],
        category: categories[0]._id,
        stock: 28,
        sold: 33,
        rating: 4.8,
        numReviews: 17,
        viewerUrl: "/3d-viewer-den-ngoc-son",
      },
      {
        name: "Bộ Xếp Hình Lăng Chủ Tịch Hồ Chí Minh",
        price: 1450000,
        description:
          "Công trình lịch sử trang nghiêm tại Quảng trường Ba Đình – nơi yên nghỉ của Chủ tịch Hồ Chí Minh. 580 mảnh ghép, kiến trúc tỷ lệ 1:150, kèm quảng trường và cột cờ. Phù hợp từ 12 tuổi.",
        images: ["/lang-bac.jpg"],
        category: categories[1]._id,
        stock: 20,
        sold: 29,
        rating: 4.9,
        numReviews: 19,
        viewerUrl: "/3d-viewer-lang-bac",
      },
      // Miền Trung
      {
        name: "Bộ Xếp Hình Ngọ Môn Huế - Cổng Chính Hoàng Thành",
        price: 1650000,
        description:
          "Ngọ Môn – cổng chính uy nghi của Hoàng Thành Huế, nơi triều Nguyễn thực hiện nghi lễ quan trọng nhất. 680 mảnh, tỷ lệ 1:120, mô phỏng 5 lối đi và lầu Ngũ Phụng. Phù hợp từ 12 tuổi.",
        images: ["/ngo-mon-hue.jpg"],
        category: categories[1]._id,
        stock: 18,
        sold: 22,
        rating: 4.8,
        numReviews: 13,
        viewerUrl: "/3d-viewer-ngo-mon",
      },
      // Miền Nam
      {
        name: "Bộ Xếp Hình Chùa Một Cột - Kiệt Tác Kiến Trúc",
        price: 920000,
        description:
          "Chùa Một Cột – ngôi chùa độc đáo hình bông sen nở nằm trên một trụ đá giữa hồ nước. 350 mảnh ghép, thiết kế thu nhỏ tỷ lệ 1:80 kèm hồ sen. Phù hợp từ 9 tuổi.",
        images: ["/chuamotcot.jpg"],
        category: categories[0]._id,
        stock: 32,
        sold: 44,
        rating: 4.7,
        numReviews: 20,
        viewerUrl: "/3d-viewer/chua-mot-cot",
      },
      {
        name: "Bộ Xếp Hình Hòn Trống Mái - Kỳ Quan Vịnh Bắc Bộ",
        price: 890000,
        description:
          "Hòn Trống Mái – cặp đá tự nhiên huyền thoại trên Vịnh Hạ Long biểu trưng cho tình yêu vĩnh cửu. 330 mảnh, mô phỏng cảnh biển hùng vĩ với sóng và đảo đá. Phù hợp từ 9 tuổi.",
        images: ["/hon-trong-mai.jpg"],
        category: categories[1]._id,
        stock: 22,
        sold: 27,
        rating: 4.6,
        numReviews: 12,
        viewerUrl: "/3d-viewer-hon-trong-mai",
      },
    ]);
    console.log("✓ Sản phẩm đã được thêm:", products.length);

    // ===== REVIEWS =====
    const reviews = await Review.insertMany([
      {
        user: users[1]._id,
        product: products[0]._id,
        rating: 5,
        comment:
          "Bộ Khuê Văn Các rất tuyệt! Mảnh ghép chắc chắn, kiến trúc đẹp và chi tiết. Con tôi mê lắm!",
      },
      {
        user: users[2]._id,
        product: products[0]._id,
        rating: 5,
        comment:
          "Chất lượng xuất sắc, sách hướng dẫn rõ ràng. Lắp xong trưng bày rất đẹp.",
      },
      {
        user: users[3]._id,
        product: products[2]._id,
        rating: 5,
        comment:
          "Tháp Rùa mini siêu dễ thương! Đặt trên bàn làm việc nhìn rất ý nghĩa.",
      },
      {
        user: users[1]._id,
        product: products[6]._id,
        rating: 5,
        comment:
          "Bộ Lăng Bác trang trọng và chi tiết. Quảng trường thu nhỏ rất ấn tượng.",
      },
      {
        user: users[2]._id,
        product: products[8]._id,
        rating: 4,
        comment:
          "Chùa Một Cột giá tốt mà chất lượng cao. Hồ sen kèm theo rất thú vị!",
      },
      {
        user: users[3]._id,
        product: products[7]._id,
        rating: 5,
        comment:
          "Ngọ Môn Huế hoành tráng! Lầu Ngũ Phụng được mô phỏng rất chuẩn. Xứng đáng với giá tiền.",
      },
    ]);
    console.log("✓ Đánh giá đã được thêm:", reviews.length);

    // ===== CARTS =====
    const carts = await Cart.insertMany([
      {
        user: users[1]._id,
        items: [
          { product: products[0]._id, quantity: 1 },
          { product: products[2]._id, quantity: 1 },
        ],
      },
      {
        user: users[2]._id,
        items: [{ product: products[6]._id, quantity: 1 }],
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
            quantity: 1,
          },
          {
            product: products[2]._id,
            name: products[2].name,
            price: products[2].price,
            quantity: 1,
          },
        ],
        totalPrice: products[0].price + products[2].price,
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
            product: products[7]._id,
            name: products[7].name,
            price: products[7].price,
            quantity: 1,
          },
          {
            product: products[8]._id,
            name: products[8].name,
            price: products[8].price,
            quantity: 1,
          },
        ],
        totalPrice: products[7].price + products[8].price,
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
            product: products[6]._id,
            name: products[6].name,
            price: products[6].price,
            quantity: 1,
          },
        ],
        totalPrice: products[6].price,
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
