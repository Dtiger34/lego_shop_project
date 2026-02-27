const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
import { getToken } from './authAPI';

export const createOrder = async (orderData) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Lỗi khi tạo đơn hàng');
  }
  return await response.json();
};

export const getOrderById = async (orderId) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Đơn hàng không tìm thấy');
  return await response.json();
};

export const getUserOrders = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Lỗi khi tải đơn hàng');
  return await response.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Lỗi khi cập nhật đơn hàng');
  return await response.json();
};

export const cancelOrder = async (orderId) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Lỗi khi hủy đơn hàng');
  return await response.json();
};
