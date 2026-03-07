const Cart = require("../../model/Cart");
const Product = require("../../model/Product");

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Vui lòng cung cấp mã sản phẩm" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Vui lòng cung cấp mã sản phẩm" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp mã sản phẩm và số lượng" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
      }
    }

    await cart.save();
    cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    } else {
      cart.items = [];
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
