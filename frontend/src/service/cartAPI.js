const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
import { getToken } from './authAPI';

export const getCart = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Lỗi khi tải giỏ hàng');
  return await response.json();
};

export const addToServerCart = async (productId, quantity) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity })
  });
  if (!response.ok) throw new Error('Lỗi khi thêm vào giỏ hàng');
  return await response.json();
};

export const removeFromServerCart = async (productId) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/cart/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ productId })
  });
  if (!response.ok) throw new Error('Lỗi khi xóa khỏi giỏ hàng');
  return await response.json();
};

export const clearServerCart = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Lỗi khi xóa giỏ hàng');
  return await response.json();
};
