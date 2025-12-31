// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProducts from "../components/RelatedProducts";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart, backendUrl, token } =
//     useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false);
//   const [subscribeEmail, setSubscribeEmail] = useState("");

//   useEffect(() => {
//     const data = products.find((item) => item._id === productId);
//     if (data) {
//       setProductData(data);
//       setImage(data.image[0]);
//     }
//   }, [productId, products]);

//   const handleAddToWishlist = () => {
//     if (!token) {
//       toast.error("Please login to add to wishlist");
//       return;
//     }
//     setShowSubscribeModal(true);
//   };

//   const handleWishlistSubscribe = async () => {
//     if (!subscribeEmail) {
//       toast.error("Please enter your email");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         backendUrl + "/api/wishlist/add",
//         {
//           productId: productData._id,
//           email: subscribeEmail,
//           notifyOnRestock: true,
//         },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success("Added to wishlist! You'll be notified when restocked.");
//         setShowSubscribeModal(false);
//         setSubscribeEmail("");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   const isOutOfStock = productData.stock === 0;

//   return (
//     <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
//       {/* Product Data */}
//       <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
//         {/* Product Images */}
//         <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
//           <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.image.map((item, index) => (
//               <img
//                 key={index}
//                 src={item}
//                 onClick={() => setImage(item)}
//                 className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
//                   image === item ? "border-2 border-gray-600 py-2 px-2" : ""
//                 }`}
//                 alt="Product"
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img src={image} className="w-full h-auto" alt="Product" />
//             {isOutOfStock && (
//               <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded">
//                 <p className="text-red-700 font-semibold">
//                   ⚠️ This product is currently out of stock
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
//           <p className="mt-5 text-3xl font-medium">
//             {currency} {productData.price.toLocaleString()}
//           </p>
//           <p className="mt-2 text-sm font-medium text-gray-600">
//             Stock: {isOutOfStock ? (
//               <span className="text-red-600">Out of Stock</span>
//             ) : (
//               <span className="text-green-600">{productData.stock} units available</span>
//             )}
//           </p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>

//           {/* Size Selection */}
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSize(item)}
//                   disabled={isOutOfStock}
//                   className={`border py-2 px-4 bg-gray-100 rounded-md ${
//                     size === item ? "border-orange-500" : ""
//                   } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isOutOfStock ? (
//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddToWishlist}
//                 className="px-8 py-3 text-sm text-white bg-orange-500 hover:bg-orange-600"
//               >
//                 ADD TO WISHLIST
//               </button>
//               <p className="text-sm text-gray-500 flex items-center">
//                 Get notified when back in stock
//               </p>
//             </div>
//           ) : (
//             <button
//               onClick={() => addToCart(productData._id, size)}
//               className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//           )}

//           <hr className="mt-8 sm:w-4/5" />
//           <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
//             <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
//             <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
//             <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
//           </div>
//         </div>
//       </div>

//       {/* Subscribe Modal */}
//       {showSubscribeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">
//               Subscribe for Restock Notification
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Enter your email to get notified when this product is back in stock.
//             </p>
//             <input
//               type="email"
//               value={subscribeEmail}
//               onChange={(e) => setSubscribeEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
//               placeholder="your@email.com"
//             />
//             <div className="flex gap-3">
//               <button
//                 onClick={handleWishlistSubscribe}
//                 className="flex-1 px-4 py-2 bg-black text-white rounded"
//               >
//                 Subscribe & Add to Wishlist
//               </button>
//               <button
//                 onClick={() => setShowSubscribeModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Description & Reviews */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="px-5 py-3 text-sm border">Description</b>
//         </div>
//         <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
//           <p>{productData.description}</p>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   );
// };

// export default Product;









import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");

  useEffect(() => {
    const data = products.find((item) => item._id === productId);
    if (data) {
      setProductData(data);
      setImage(data.image[0]);
    }
  }, [productId, products]);

  const handleAddToWishlist = () => {
    if (!token) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setShowSubscribeModal(true);
  };

  const handleWishlistSubscribe = async () => {
    if (!subscribeEmail) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/add",
        {
          productId: productData._id,
          email: subscribeEmail,
          notifyOnRestock: true,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Added to wishlist! You'll be notified when restocked.");
        setShowSubscribeModal(false);
        setSubscribeEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (!productData) return <div className="opacity-0"></div>;

  const isOutOfStock = productData.stock === 0;
  const isDiscountValid =
    productData.hasDiscount &&
    productData.discountExpiry &&
    new Date(productData.discountExpiry) > new Date();
  const discountedPrice = isDiscountValid
    ? Math.round(productData.price - (productData.price * productData.discountPercent) / 100)
    : productData.price;

  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  image === item ? "border-2 border-gray-600 py-2 px-2" : ""
                }`}
                alt="Product"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] relative">
            <img src={image} className="w-full h-auto" alt="Product" />
            {isDiscountValid && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">{productData.discountPercent}% OFF</p>
              </div>
            )}
            {isOutOfStock && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded">
                <p className="text-red-700 font-semibold">
                  ⚠️ This product is currently out of stock
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>

          {/* Price Section with Discount */}
          <div className="mt-5">
            {isDiscountValid ? (
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-medium text-gray-400 line-through">
                    {currency} {productData.price.toLocaleString()}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {currency} {discountedPrice.toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-semibold text-orange-700">
                    🎉 Save {currency}{" "}
                    {(productData.price - discountedPrice).toLocaleString()} (
                    {productData.discountPercent}% OFF)
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Offer ends: {new Date(productData.discountExpiry).toLocaleDateString()} at{" "}
                    {new Date(productData.discountExpiry).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-3xl font-medium">
                {currency} {productData.price.toLocaleString()}
              </p>
            )}
          </div>

          <p className="mt-2 text-sm font-medium text-gray-600">
            Stock:{" "}
            {isOutOfStock ? (
              <span className="text-red-600">Out of Stock</span>
            ) : (
              <span className="text-green-600">{productData.stock} units available</span>
            )}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  disabled={isOutOfStock}
                  className={`border py-2 px-4 bg-gray-100 rounded-md ${
                    size === item ? "border-orange-500" : ""
                  } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {isOutOfStock ? (
            <div className="flex gap-3">
              <button
                onClick={handleAddToWishlist}
                className="px-8 py-3 text-sm text-white bg-orange-500 hover:bg-orange-600"
              >
                ADD TO WISHLIST
              </button>
              <p className="text-sm text-gray-500 flex items-center">
                Get notified when back in stock
              </p>
            </div>
          ) : (
            <button
              onClick={() => addToCart(productData._id, size)}
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            >
              ADD TO CART
            </button>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Subscribe for Restock Notification</h3>
            <p className="text-gray-600 mb-4">
              Enter your email to get notified when this product is back in stock.
            </p>
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              placeholder="your@email.com"
            />
            <div className="flex gap-3">
              <button
                onClick={handleWishlistSubscribe}
                className="flex-1 px-4 py-2 bg-black text-white rounded"
              >
                Subscribe & Add to Wishlist
              </button>
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;