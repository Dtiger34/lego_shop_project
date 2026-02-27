const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: Number,

  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String
  },

  status: {
    type: String,
    enum: ['pending', 'paid', 'shipping', 'completed', 'cancelled'],
    default: 'pending'
  },

  paymentMethod: String,
  isPaid: { type: Boolean, default: false },
  paidAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
