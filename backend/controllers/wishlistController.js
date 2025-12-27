import wishlistModel from "../models/wishlistModel.js";

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, email, notifyOnRestock } = req.body;

    const exists = await wishlistModel.findOne({ userId, productId });
    if (exists) {
      return res.json({ success: false, message: "Product already in wishlist" });
    }

    const wishlistData = {
      userId,
      productId,
      email: notifyOnRestock ? email : null,
      notifyOnRestock: notifyOnRestock || false,
    };

    const newWishlistItem = new wishlistModel(wishlistData);
    await newWishlistItem.save();

    res.json({ success: true, message: "Added to wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const wishlist = await wishlistModel.find({ userId });
    res.json({ success: true, wishlist });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await wishlistModel.findOneAndDelete({ userId, productId });
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToWishlist, getUserWishlist, removeFromWishlist };