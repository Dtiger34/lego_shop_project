import { API_BASE_URL } from './config.js';

export const getAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Lỗi khi tải danh mục');
  return await response.json();
};

export const getCategoryById = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
  if (!response.ok) throw new Error('Danh mục không tìm thấy');
  return await response.json();
};
