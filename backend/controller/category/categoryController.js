const Category = require("../../model/Category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Create category (admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ message: "Vui lòng nhập tên danh mục" });

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Update category (admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true },
    );
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Delete category (admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json({ message: "Đã xóa danh mục" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
