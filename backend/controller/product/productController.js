const Product = require('../../model/Product')
const Category = require('../../model/Category')

// Create product (admin)
exports.createProduct = async (req, res) => {
	try {
		const data = req.body
		if (data.category) {
			const cat = await Category.findById(data.category)
			if (!cat) return res.status(400).json({ message: 'Invalid category' })
		}

		const product = await Product.create(data)
		res.status(201).json(product)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// Get list of products (public)
exports.getProducts = async (req, res) => {
	try {
		const { page = 1, limit = 20, q, category } = req.query
		const filter = {}
		if (q) filter.name = { $regex: q, $options: 'i' }
		if (category) filter.category = category

		const products = await Product.find(filter)
			.skip((page - 1) * limit)
			.limit(Number(limit))
			.populate('category')

		const total = await Product.countDocuments(filter)

		res.json({ data: products, total })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// Get single product by id (public)
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).populate('category')
		if (!product) return res.status(404).json({ message: 'Product not found' })
		res.json(product)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// Update product (admin)
exports.updateProduct = async (req, res) => {
	try {
		const updates = req.body
		if (updates.category) {
			const cat = await Category.findById(updates.category)
			if (!cat) return res.status(400).json({ message: 'Invalid category' })
		}

		const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true })
		if (!product) return res.status(404).json({ message: 'Product not found' })
		res.json(product)
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// Delete product (admin)
exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) return res.status(404).json({ message: 'Product not found' })
		res.json({ message: 'Product deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
