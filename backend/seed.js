const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
require('dotenv').config()

// Import Models
const User = require('./model/User')
const Category = require('./model/Category')
const Product = require('./model/Product')
const Review = require('./model/Review')
const Cart = require('./model/Cart')
const Order = require('./model/Order')

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/legoshop')
    console.log('MongoDB đã kết nối')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

// Clear all collections
const clearDB = async () => {
  try {
    await User.deleteMany({})
    await Category.deleteMany({})
    await Product.deleteMany({})
    await Review.deleteMany({})
    await Cart.deleteMany({})
    await Order.deleteMany({})
    console.log('Cơ sở dữ liệu đã xóa')
  } catch (err) {
    console.error('Error clearing database:', err.message)
  }
}

// Seed data
const seedDB = async () => {
  try {
    // ===== CATEGORIES =====
    const categories = await Category.insertMany([
      { name: 'Lego City', slug: 'lego-city' },
      { name: 'Lego Technic', slug: 'lego-technic' },
      { name: 'Lego Star Wars', slug: 'lego-star-wars' },
      { name: 'Lego Creator', slug: 'lego-creator' },
      { name: 'Lego Marvel', slug: 'lego-marvel' },
      { name: 'Lego Ninjago', slug: 'lego-ninjago' }
    ])
    console.log('✓ Danh mục đã được thêm:', categories.length)

    // ===== USERS =====
    const hashPassword = async (pwd) => {
      const salt = await bcryptjs.genSalt(10)
      return await bcryptjs.hash(pwd, salt)
    }

    const users = await User.insertMany([
      {
        name: 'Quản Trị Viên',
        email: 'admin@legoshop.com',
        password: await hashPassword('admin123'),
        role: 'admin'
      },
      {
        name: 'Nguyễn Văn An',
        email: 'nguyenvana@example.com',
        password: await hashPassword('user123'),
        role: 'user'
      },
      {
        name: 'Trần Thị Bình',
        email: 'tranthib@example.com',
        password: await hashPassword('user123'),
        role: 'user'
      },
      {
        name: 'Lê Hoàng Cường',
        email: 'lehoangc@example.com',
        password: await hashPassword('user123'),
        role: 'user'
      }
    ])
    console.log('✓ Người dùng đã được thêm:', users.length)

    // ===== PRODUCTS =====
    const products = await Product.insertMany([
      // Lego City
      {
        name: 'Lego City Police Station 60316',
        price: 1250000,
        description: 'Đồn cảnh sát thành phố với 668 mảnh ghép. Bao gồm xe cảnh sát, xe mô tô và 5 nhân vật. Phù hợp cho bé từ 7 tuổi trở lên.',
        images: ['/uploads/lego-city-police.jpg'],
        category: categories[0]._id,
        stock: 30,
        sold: 45,
        rating: 4.7,
        numReviews: 18
      },
      {
        name: 'Lego City Fire Station 60320',
        price: 980000,
        description: 'Trạm cứu hỏa thành phố với 540 mảnh. Xe cứu hỏa, xe thang và 4 lính cứu hỏa. Phù hợp cho bé từ 6 tuổi.',
        images: ['/uploads/lego-city-fire.jpg'],
        category: categories[0]._id,
        stock: 25,
        sold: 38,
        rating: 4.6,
        numReviews: 14
      },
      {
        name: 'Lego City Airport 60261',
        price: 1850000,
        description: 'Sân bay thành phố với 286 mảnh. Máy bay, xe phục vụ sân bay và 6 nhân vật. Phù hợp từ 6 tuổi.',
        images: ['/uploads/lego-city-airport.jpg'],
        category: categories[0]._id,
        stock: 15,
        sold: 22,
        rating: 4.5,
        numReviews: 10
      },
      // Lego Technic
      {
        name: 'Lego Technic Ferrari Daytona SP3 42143',
        price: 8500000,
        description: 'Siêu xe Ferrari Daytona SP3 tỉ lệ 1:8 với 3778 mảnh ghép. Chi tiết kỹ thuật cực kỳ tinh xảo với động cơ V12 mô phỏng thực tế.',
        images: ['/uploads/lego-technic-ferrari.jpg'],
        category: categories[1]._id,
        stock: 8,
        sold: 12,
        rating: 5.0,
        numReviews: 9
      },
      {
        name: 'Lego Technic Land Rover Defender 42110',
        price: 4200000,
        description: 'Land Rover Defender tỉ lệ 1:8 với 2573 mảnh. Hộp số thực tế, cầu xe hoạt động và hệ thống lái chính xác.',
        images: ['/uploads/lego-technic-landrover.jpg'],
        category: categories[1]._id,
        stock: 12,
        sold: 20,
        rating: 4.9,
        numReviews: 15
      },
      // Lego Star Wars
      {
        name: 'Lego Star Wars Millennium Falcon 75257',
        price: 3200000,
        description: 'Phi thuyền Millennium Falcon huyền thoại với 1353 mảnh. Bao gồm Han Solo, Chewbacca, Rey và các nhân vật nổi tiếng.',
        images: ['/uploads/lego-sw-falcon.jpg'],
        category: categories[2]._id,
        stock: 10,
        sold: 28,
        rating: 4.9,
        numReviews: 22
      },
      {
        name: 'Lego Star Wars AT-AT 75313',
        price: 7800000,
        description: 'Máy bộ binh AT-AT khổng lồ với 6785 mảnh — một trong những bộ Lego lớn nhất từ trước đến nay.',
        images: ['/uploads/lego-sw-atat.jpg'],
        category: categories[2]._id,
        stock: 5,
        sold: 7,
        rating: 5.0,
        numReviews: 6
      },
      // Lego Creator
      {
        name: 'Lego Creator Expert Eiffel Tower 10307',
        price: 5500000,
        description: 'Tháp Eiffel cao 1.5 mét với 10001 mảnh ghép. Bộ Lego Creator Expert danh tiếng, dành cho người sưu tầm.',
        images: ['/uploads/lego-creator-eiffel.jpg'],
        category: categories[3]._id,
        stock: 7,
        sold: 14,
        rating: 4.8,
        numReviews: 11
      },
      {
        name: 'Lego Creator 3-in-1 Dragon 31112',
        price: 750000,
        description: 'Rồng sáng tạo 3-trong-1: lắp được mô hình rồng, cá, hay đại bàng. 234 mảnh, phù hợp từ 6 tuổi.',
        images: ['/uploads/lego-creator-dragon.jpg'],
        category: categories[3]._id,
        stock: 35,
        sold: 60,
        rating: 4.6,
        numReviews: 24
      },
      // Lego Marvel
      {
        name: 'Lego Marvel Avengers Tower 76166',
        price: 2650000,
        description: 'Trụ sở Avengers với 509 mảnh. Bao gồm Iron Man, Thor, Hulk, Black Widow và nhiều siêu anh hùng yêu thích.',
        images: ['/uploads/lego-marvel-avengers.jpg'],
        category: categories[4]._id,
        stock: 18,
        sold: 35,
        rating: 4.7,
        numReviews: 19
      },
      // Lego Ninjago
      {
        name: 'Lego Ninjago City Markets 71799',
        price: 3900000,
        description: 'Khu chợ thành phố Ninjago 3 tầng rực rỡ với 6163 mảnh. Bao gồm 18 nhân vật và hàng chục chi tiết thú vị.',
        images: ['/uploads/lego-ninjago-city.jpg'],
        category: categories[5]._id,
        stock: 9,
        sold: 15,
        rating: 4.9,
        numReviews: 13
      },
      {
        name: 'Lego Ninjago Ninja Dojo Temple 71767',
        price: 1450000,
        description: 'Đền dojo ninja với 1394 mảnh. Bao gồm 6 nhân vật ninja và nhiều vũ khí bí ẩn.',
        images: ['/uploads/lego-ninjago-dojo.jpg'],
        category: categories[5]._id,
        stock: 20,
        sold: 32,
        rating: 4.7,
        numReviews: 16
      }
    ])
    console.log('✓ Sản phẩm đã được thêm:', products.length)

    // ===== REVIEWS =====
    const reviews = await Review.insertMany([
      {
        user: users[1]._id,
        product: products[0]._id,
        rating: 5,
        comment: 'Bộ đồn cảnh sát rất tuyệt! Con tôi thích mê. Mảnh ghép chắc chắn, màu sắc đẹp.'
      },
      {
        user: users[2]._id,
        product: products[0]._id,
        rating: 4,
        comment: 'Chất lượng tốt, đúng hàng chính hãng. Giao hàng nhanh và đóng gói cẩn thận.'
      },
      {
        user: users[3]._id,
        product: products[3]._id,
        rating: 5,
        comment: 'Bộ Ferrari siêu đẹp! Động cơ V12 mô phỏng rất chi tiết. Xứng đáng với giá tiền.'
      },
      {
        user: users[1]._id,
        product: products[5]._id,
        rating: 5,
        comment: 'Millennium Falcon quá ấn tượng! Từng chi tiết đều rất chuẩn so với phim. Đóng gói đẹp.'
      },
      {
        user: users[2]._id,
        product: products[8]._id,
        rating: 5,
        comment: 'Rồng 3-in-1 giá rẻ mà chất lượng cao. Con bé nhà tôi lắp đi lắp lại hoài không chán!'
      },
      {
        user: users[3]._id,
        product: products[9]._id,
        rating: 4,
        comment: 'Bộ Avengers Tower đẹp, nhân vật đầy đủ. Hướng dẫn lắp ráp rõ ràng, dễ theo.'
      }
    ])
    console.log('✓ Đánh giá đã được thêm:', reviews.length)

    // ===== CARTS =====
    const carts = await Cart.insertMany([
      {
        user: users[1]._id,
        items: [
          { product: products[0]._id, quantity: 1 },
          { product: products[8]._id, quantity: 2 }
        ]
      },
      {
        user: users[2]._id,
        items: [
          { product: products[5]._id, quantity: 1 }
        ]
      }
    ])
    console.log('✓ Giỏ hàng đã được thêm:', carts.length)

    // ===== ORDERS =====
    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          { product: products[0]._id, name: products[0].name, price: products[0].price, quantity: 1 },
          { product: products[8]._id, name: products[8].name, price: products[8].price, quantity: 2 }
        ],
        totalPrice: products[0].price + products[8].price * 2,
        shippingAddress: {
          fullName: 'Nguyễn Văn An',
          phone: '0912345678',
          address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM'
        },
        status: 'completed',
        paymentMethod: 'Credit Card',
        isPaid: true,
        paidAt: new Date('2026-02-10')
      },
      {
        user: users[2]._id,
        items: [
          { product: products[5]._id, name: products[5].name, price: products[5].price, quantity: 1 },
          { product: products[9]._id, name: products[9].name, price: products[9].price, quantity: 1 }
        ],
        totalPrice: products[5].price + products[9].price,
        shippingAddress: {
          fullName: 'Trần Thị Bình',
          phone: '0987654321',
          address: '456 Đường Trần Hưng Đạo, Quận 4, TP.HCM'
        },
        status: 'shipping',
        paymentMethod: 'Bank Transfer',
        isPaid: true,
        paidAt: new Date('2026-02-15')
      },
      {
        user: users[3]._id,
        items: [
          { product: products[3]._id, name: products[3].name, price: products[3].price, quantity: 1 }
        ],
        totalPrice: products[3].price,
        shippingAddress: {
          fullName: 'Lê Hoàng Cường',
          phone: '0933333333',
          address: '789 Đường Võ Văn Kiệt, Quận 5, TP.HCM'
        },
        status: 'pending',
        paymentMethod: 'COD',
        isPaid: false
      }
    ])
    console.log('✓ Đơn hàng đã được thêm:', orders.length)

    console.log('\n✅ Dữ liệu đã được thêm vào cơ sở dữ liệu thành công!')
    console.log('\n📋 Tài khoản mẫu:')
    console.log('   Admin  : admin@legoshop.com  / admin123')
    console.log('   User 1 : nguyenvana@example.com / user123')
    console.log('   User 2 : tranthib@example.com   / user123')
    console.log('   User 3 : lehoangc@example.com   / user123')
  } catch (err) {
    console.error('Error seeding database:', err)
  }
}

// Run seed
const runSeed = async () => {
  await connectDB()
  await clearDB()
  await seedDB()
  await mongoose.connection.close()
  console.log('\nKết nối đã đóng.')
}

runSeed()
