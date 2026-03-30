// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestSeller, stock, discountPercent, discountExpiry } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const productImages = [image1, image2, image3, image4].filter((image) => image !== undefined);

//     let imageUrls = await Promise.all(
//       productImages.map(async (image) => {
//         let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       subCategory,
//       sizes: JSON.parse(sizes),
//       bestSeller: bestSeller === "true" ? true : false,
//       stock: Number(stock),
//       image: imageUrls,
//       date: Date.now(),
//       discountPercent: Number(discountPercent) || 0,
//       discountExpiry: discountExpiry ? new Date(discountExpiry) : null,
//       hasDiscount: Number(discountPercent) > 0 && discountExpiry ? true : false,
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.status(201).json({ success: true, message: "Product added" });
//   } catch (error) {
//     console.log("Error while adding product: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     console.log("Error while fetching all products: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id);
//     res.status(200).json({ success: true, message: "Product removed" });
//   } catch (error) {
//     console.log("Error while removing product: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getSingleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);
//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     console.log("Error while fetching single product: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const updateStock = async (req, res) => {
//   try {
//     const { productId, stock } = req.body;
//     await productModel.findByIdAndUpdate(productId, { stock: Number(stock) });
//     res.status(200).json({ success: true, message: "Stock updated" });
//   } catch (error) {
//     console.log("Error while updating stock: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const updateDiscount = async (req, res) => {
//   try {
//     const { productId, discountPercent, discountExpiry } = req.body;
    
//     const updateData = {
//       discountPercent: Number(discountPercent),
//       discountExpiry: discountExpiry ? new Date(discountExpiry) : null,
//       hasDiscount: Number(discountPercent) > 0 && discountExpiry ? true : false,
//     };
    
//     await productModel.findByIdAndUpdate(productId, updateData);
    
//     res.status(200).json({ success: true, message: "Discount updated" });
//   } catch (error) {
//     console.log("Error while updating discount: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { addProduct, listProducts, removeProduct, getSingleProduct, updateStock, updateDiscount };





import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import path from "path";
import fs from "fs";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller, stock, discountPercent, discountExpiry, sizeType } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const productImages = [image1, image2, image3, image4].filter((image) => image !== undefined);

    // Use local storage instead of Cloudinary for now
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    let imageUrls = [];
    for (let i = 0; i < productImages.length; i++) {
      const image = productImages[i];
      const ext = path.extname(image.originalname);
      const filename = `product_${Date.now()}_${i + 1}${ext}`;
      const filepath = path.join(uploadsDir, filename);

      // Move file from temp to uploads directory
      fs.renameSync(image.path, filepath);

      // Create URL path for frontend access
      const imageUrl = `/uploads/${filename}`;
      imageUrls.push(imageUrl);
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      stock: Number(stock),
      image: imageUrls,
      date: Date.now(),
      discountPercent: Number(discountPercent) || 0,
      discountExpiry: discountExpiry ? new Date(discountExpiry) : null,
      hasDiscount: Number(discountPercent) > 0 && discountExpiry ? true : false,
      sizeType: sizeType || 'standard'
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body;
    await productModel.findByIdAndUpdate(productId, { stock: Number(stock) });
    res.status(200).json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.log("Error while updating stock: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDiscount = async (req, res) => {
  try {
    const { productId, discountPercent, discountExpiry } = req.body;
    
    const updateData = {
      discountPercent: Number(discountPercent),
      discountExpiry: discountExpiry ? new Date(discountExpiry) : null,
      hasDiscount: Number(discountPercent) > 0 && discountExpiry ? true : false,
    };
    
    await productModel.findByIdAndUpdate(productId, updateData);
    
    res.status(200).json({ success: true, message: "Discount updated" });
  } catch (error) {
    console.log("Error while updating discount: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct, updateStock, updateDiscount };