const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Lỗi khi tải sản phẩm');
  return await response.json();
};

export const getProductById = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) throw new Error('Sản phẩm không tìm thấy');
  return await response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_BASE_URL}/products?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Lỗi khi tìm kiếm sản phẩm');
  return await response.json();
};

export const getProductsByCategory = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/products?category=${categoryId}`);
  if (!response.ok) throw new Error('Lỗi khi tải sản phẩm theo danh mục');
  return await response.json();
};
