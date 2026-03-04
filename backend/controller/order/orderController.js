const Order = require('../../model/Order');
const Product = require('../../model/Product');
const User = require('../../model/User');
const { sendCustomerConfirmationEmail, sendAdminNotificationEmail } = require('../../config/email');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }
    
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone || !shippingAddress.address) {
      return res.status(400).json({ message: 'Complete shipping address required' });
    }
    
    let user = null;
    let customerEmail = shippingAddress.email;
    let customerName = shippingAddress.fullName;
    
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      customerEmail = user.email;
      customerName = user.name;
    }
    
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      
      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }
    
    const order = new Order({
      user: userId || null,
      items: orderItems,
      totalPrice: totalAmount,
      shippingAddress: shippingAddress,
      status: 'pending',
    });
    
    await order.save();
    
    const orderData = {
      _id: order._id,
      items: orderItems,
      totalPrice: totalAmount,
      shippingAddress: shippingAddress,
      createdAt: order.createdAt,
      status: order.status
    };
    
    sendCustomerConfirmationEmail(customerEmail, customerName, orderData).catch(err => 
      console.error('Failed to send customer email:', err)
    );
    
    sendAdminNotificationEmail(orderData, customerName, customerEmail).catch(err => 
      console.error('Failed to send admin email:', err)
    );
    
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending orders' });
    }
    
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
