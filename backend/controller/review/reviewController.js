const Review = require("../../model/Review");
const Product = require("../../model/Product");

async function updateProductRating(productId) {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;
  const rating =
    numReviews === 0
      ? 0
      : reviews.reduce((s, r) => s + r.rating, 0) / numReviews;
  await Product.findByIdAndUpdate(productId, { rating, numReviews });
}

// Create review (authenticated)
exports.createReview = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { product: productId, rating, comment } = req.body;
    if (!userId) return res.status(401).json({ message: "Chưa xác thực" });
    if (!productId || !rating)
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp sản phẩm và đánh giá" });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(400).json({ message: "Sản phẩm không hợp lệ" });

    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    await review.save();

    await updateProductRating(productId);

    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ message: "Bạn đã đánh giá sản phẩm này rồi" });
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// List reviews (optional filter by product)
exports.getReviews = async (req, res) => {
  try {
    const { product, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (product) filter.product = product;

    const reviews = await Review.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "name email");

    const total = await Review.countDocuments(filter);
    res.json({ data: reviews, total });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Get single review
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!review)
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Update review (owner or admin)
exports.updateReview = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const review = await Review.findById(req.params.id);
    if (!review)
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });

    if (String(review.user) !== String(userId) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Không có quyền thực hiện" });
    }

    const { rating, comment } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    await updateProductRating(review.product);

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Delete review (owner or admin)
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const review = await Review.findById(req.params.id);
    if (!review)
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });

    if (String(review.user) !== String(userId) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Không có quyền thực hiện" });
    }

    await Review.findByIdAndDelete(req.params.id);
    await updateProductRating(review.product);

    res.json({ message: "Đã xóa đánh giá" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
