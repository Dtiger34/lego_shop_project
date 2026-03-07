const User = require("../../model/User");
const bcrypt = require("bcryptjs");

// Create user (admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Vui lòng nhập họ tên, email và mật khẩu" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email đã được sử dụng" });

    const user = new User({ name, email, password, role });
    await user.save();

    const safe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// List users (admin)
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 50, q } = req.query;
    const filter = {};
    if (q)
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");

    const total = await User.countDocuments(filter);
    res.json({ data: users, total });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Get user by id (admin)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Update user (admin)
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Delete user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ message: "Đã xóa người dùng" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Get current profile (authenticated)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Chưa xác thực" });
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Update current profile (authenticated)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Chưa xác thực" });

    const updates = { ...req.body };
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
