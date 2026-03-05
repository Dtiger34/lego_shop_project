import { API_BASE_URL } from './config.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// ========== ORDER MANAGEMENT ==========

// Get all orders (admin)
export const getAllOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders/all`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};

// Update order status (admin)
export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Failed to update order status');
  return response.json();
};

// Get all products (admin can use same API as public)
export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// ========== PRODUCT MANAGEMENT ==========

// Create product (admin)
export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

// Update product (admin)
export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

// Delete product (admin)
export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};

// ========== CATEGORY MANAGEMENT ==========

// Create category (admin)
export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) throw new Error('Failed to create category');
  return response.json();
};

// Update category (admin)
export const updateCategory = async (categoryId, categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) throw new Error('Failed to update category');
  return response.json();
};

// Delete category (admin)
export const deleteCategory = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete category');
  return response.json();
};

// ========== USER MANAGEMENT ==========

// Get user by ID (admin)
export const getUserById = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

// Create user (admin)
export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

// Update user (admin)
export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
};
