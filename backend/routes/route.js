// endpoint
const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const jwtConfig = require('../config/jwt')
const productController = require('../controller/product/productController')
const categoryController = require('../controller/category/categoryController')
const userController = require('../controller/user/userController')
const reviewController = require('../controller/review/reviewController')
const orderController = require('../controller/order/orderController')

// auth routes
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.post('/auth/forgot-password', authController.forgotPassword)
router.post('/auth/reset-password/:token', authController.resetPassword)
router.post('/auth/change-password', jwtConfig.requireAuth, authController.changePassword)

// product routes
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProductById)
router.post('/products', jwtConfig.requireAdmin, productController.createProduct)
router.put('/products/:id', jwtConfig.requireAdmin, productController.updateProduct)
router.delete('/products/:id', jwtConfig.requireAdmin, productController.deleteProduct)

// category routes
router.get('/categories', categoryController.getCategories)
router.get('/categories/:id', categoryController.getCategoryById)
router.post('/categories', jwtConfig.requireAdmin, categoryController.createCategory)
router.put('/categories/:id', jwtConfig.requireAdmin, categoryController.updateCategory)
router.delete('/categories/:id', jwtConfig.requireAdmin, categoryController.deleteCategory)

// user routes
// IMPORTANT: /users/profile MUST come before /users/:id to avoid route collision
router.get('/users/profile', jwtConfig.requireAuth, userController.getProfile)
router.put('/users/profile', jwtConfig.requireAuth, userController.updateProfile)
router.get('/users', jwtConfig.requireAdmin, userController.getUsers)
router.get('/users/:id', jwtConfig.requireAdmin, userController.getUserById)
router.post('/users', jwtConfig.requireAdmin, userController.createUser)
router.put('/users/:id', jwtConfig.requireAdmin, userController.updateUser)
router.delete('/users/:id', jwtConfig.requireAdmin, userController.deleteUser)

// order routes
router.post('/orders', orderController.createOrder)
router.get('/orders', jwtConfig.requireAuth, orderController.getUserOrders)
router.get('/orders/all', jwtConfig.requireAdmin, orderController.getAllOrders)
router.get('/orders/:id', orderController.getOrderById)
router.put('/orders/:id', jwtConfig.requireAdmin, orderController.updateOrderStatus)
router.delete('/orders/:id', orderController.cancelOrder)

// review routes
router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviewById)
router.post('/reviews', jwtConfig.requireAuth, reviewController.createReview)
router.put('/reviews/:id', jwtConfig.requireAuth, reviewController.updateReview)
router.delete('/reviews/:id', jwtConfig.requireAuth, reviewController.deleteReview)

module.exports = router
