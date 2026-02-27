const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  images: [String],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },

  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
