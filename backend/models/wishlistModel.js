import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  notifyOnRestock: { type: Boolean, default: false },
  email: { type: String },
  date: { type: Number, default: Date.now() },
});

const wishlistModel = mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;