// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: Array, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String, required: true },
//   sizes: { type: Array, required: true },
//   bestSeller: { type: Boolean },
//   stock: { type: Number, required: true, default: 0 },
//   date: { type: Number, required: true },
//   discountPercent: { type: Number, default: 0, min: 0, max: 100 },
//   discountExpiry: { type: Date, default: null },
//   hasDiscount: { type: Boolean, default: false },
// });

// const productModel = mongoose.models.product || mongoose.model("product", productSchema);
// export default productModel;





import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean },
  stock: { type: Number, required: true, default: 0 },
  date: { type: Number, required: true },
  discountPercent: { type: Number, default: 0, min: 0, max: 100 },
  discountExpiry: { type: Date, default: null },
  hasDiscount: { type: Boolean, default: false },
  sizeType: { type: String, enum: ['standard', 'footwear'], default: 'standard' }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;