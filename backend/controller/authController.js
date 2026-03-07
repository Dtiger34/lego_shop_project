const jwt = require("jsonwebtoken");
const User = require("../model/User");
const jwtConfig = require("../config/jwt");

// POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });

    const token = jwtConfig.generateToken({ id: user._id, role: user.role });

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ user: userSafe, token });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// POST /api/v1/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Vui lòng nhập email" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message:
          "Nếu email tồn tại trong hệ thống, đường dẫn đặt lại mật khẩu đã được gửi",
      });
    }

    const resetToken = jwt.sign(
      { id: user._id, type: "reset" },
      jwtConfig.secret,
      { expiresIn: "1h" },
    );
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;

    console.log(`Password reset link for ${email}: ${resetUrl}`);

    res.json({
      message:
        "Nếu email tồn tại trong hệ thống, đường dẫn đặt lại mật khẩu đã được gửi",
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// POST /api/v1/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token || req.body.token;
    const { password } = req.body;
    if (!token || !password)
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp token và mật khẩu mới" });

    const payload =
      jwtConfig.verifyJwt(token) || jwt.verify(token, jwtConfig.secret);
    if (!payload || payload.type !== "reset")
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    const user = await User.findById(payload.id).select("+password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    user.password = password;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// POST /api/v1/auth/change-password (protected)
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!userId) return res.status(401).json({ message: "Chưa xác thực" });
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json({ message: "Vui lòng nhập mật khẩu cũ và mật khẩu mới" });

    const user = await User.findById(userId).select("+password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const match = await user.comparePassword(oldPassword);
    if (!match)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập họ tên, email và mật khẩu" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email này đã được đăng ký" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res
      .status(201)
      .json({ message: "Đăng ký tài khoản thành công", user: userSafe });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
