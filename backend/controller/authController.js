const jwt = require('jsonwebtoken')
const User = require('../model/User')
const jwtConfig = require('../config/jwt')

// POST /api/v1/auth/login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password required' })
		}

		const user = await User.findOne({ email }).select('+password')
		if (!user) return res.status(401).json({ message: 'Invalid credentials' })

		const isMatch = await user.comparePassword(password)
		if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

		const token = jwtConfig.generateToken({ id: user._id, role: user.role })

		const userSafe = {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role
		}

		res.json({ user: userSafe, token })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// POST /api/v1/auth/forgot-password
exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body
		if (!email) return res.status(400).json({ message: 'Email required' })

		const user = await User.findOne({ email })
		if (!user) {
			return res.json({ message: 'If an account with that email exists, a reset link has been sent' })
		}

		const resetToken = jwt.sign({ id: user._id, type: 'reset' }, jwtConfig.secret, { expiresIn: '1h' })
		const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`

		console.log(`Password reset link for ${email}: ${resetUrl}`)

		res.json({ message: 'If an account with that email exists, a reset link has been sent' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// POST /api/v1/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
	try {
		const token = req.params.token || req.body.token
		const { password } = req.body
		if (!token || !password) return res.status(400).json({ message: 'Token and new password required' })

		const payload = jwtConfig.verifyJwt(token) || jwt.verify(token, jwtConfig.secret)
		if (!payload || payload.type !== 'reset') return res.status(400).json({ message: 'Invalid or expired token' })

		const user = await User.findById(payload.id).select('+password')
		if (!user) return res.status(404).json({ message: 'User not found' })

		user.password = password
		await user.save()

		res.json({ message: 'Password has been reset successfully' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// POST /api/v1/auth/change-password (protected)
exports.changePassword = async (req, res) => {
	try {
		const userId = req.user && req.user.id
		const { oldPassword, newPassword } = req.body
		if (!userId) return res.status(401).json({ message: 'Unauthorized' })
		if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Old and new passwords required' })

		const user = await User.findById(userId).select('+password')
		if (!user) return res.status(404).json({ message: 'User not found' })

		const match = await user.comparePassword(oldPassword)
		if (!match) return res.status(400).json({ message: 'Old password is incorrect' })

		user.password = newPassword
		await user.save()

		res.json({ message: 'Password changed successfully' })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}

// POST /api/v1/auth/register
exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password required' })
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: 'Email already registered' })
		}

		const user = new User({ name, email, password })
		await user.save()

		const userSafe = {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role
		}

		res.status(201).json({ message: 'User registered successfully', user: userSafe })
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message })
	}
}
