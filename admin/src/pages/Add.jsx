// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const Add = ({ token }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [image4, setImage4] = useState(null);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [sizes, setSizes] = useState([]);
//   const [bestSeller, setBestSeller] = useState(false);
//   const [discountPercent, setDiscountPercent] = useState("");
//   const [discountExpiry, setDiscountExpiry] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();

//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("price", price);
//       formData.append("stock", stock);
//       formData.append("sizes", JSON.stringify(sizes));
//       formData.append("bestSeller", bestSeller);
//       formData.append("discountPercent", discountPercent || 0);
//       formData.append("discountExpiry", discountExpiry || "");

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         resetForm();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const resetForm = () => {
//     setImage1(null);
//     setImage2(null);
//     setImage3(null);
//     setImage4(null);
//     setName("");
//     setDescription("");
//     setCategory("");
//     setSubCategory("");
//     setPrice("");
//     setStock("");
//     setSizes([]);
//     setBestSeller(false);
//     setDiscountPercent("");
//     setDiscountExpiry("");
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-start w-full gap-3"
//     >
//       <div>
//         <p className="mb-2 text-lg font-semibold">Upload Product Image(s)</p>
//         <div className="flex gap-2">
//           <label htmlFor="image1">
//             <img
//               className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               alt="Upload Images"
//             />
//             <input
//               onChange={(e) => setImage1(e.target.files[0])}
//               type="file"
//               id="image1"
//               hidden
//               accept="image/*"
//             />
//           </label>
//           <label htmlFor="image2">
//             <img
//               className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
//               src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//               alt="Upload Images"
//             />
//             <input
//               onChange={(e) => setImage2(e.target.files[0])}
//               type="file"
//               id="image2"
//               hidden
//               accept="image/*"
//             />
//           </label>
//           <label htmlFor="image3">
//             <img
//               className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
//               src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//               alt="Upload Images"
//             />
//             <input
//               onChange={(e) => setImage3(e.target.files[0])}
//               type="file"
//               id="image3"
//               hidden
//               accept="image/*"
//             />
//           </label>
//           <label htmlFor="image4">
//             <img
//               className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
//               src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//               alt="Upload Images"
//             />
//             <input
//               onChange={(e) => setImage4(e.target.files[0])}
//               type="file"
//               id="image4"
//               hidden
//               accept="image/*"
//             />
//           </label>
//         </div>
//       </div>

//       <div className="w-full mt-2">
//         <p className="mb-2 text-lg font-semibold">Product Item Name</p>
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//           type="text"
//           placeholder="Enter Product Name"
//           required
//         />
//       </div>

//       <div className="w-full mt-2">
//         <p className="mb-2 text-lg font-semibold">Product Item Description</p>
//         <textarea
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//           className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//           type="text"
//           placeholder="Enter Product Description"
//           required
//         />
//       </div>

//       <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
//         <div>
//           <p className="mb-2 text-lg font-semibold">Product Category</p>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//             className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>
//         <div>
//           <p className="mb-2 text-lg font-semibold">Product Sub Category</p>
//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             value={subCategory}
//             className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//             required
//           >
//             <option value="">Select Sub Category</option>
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//             <option value="Summerwear">Summerwear</option>
//             <option value="Footwear">Footwear</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
//         <div>
//           <p className="mb-2 text-lg font-semibold">Product Price (PKR)</p>
//           <input
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//             type="number"
//             placeholder="Enter Product Price"
//             required
//           />
//         </div>
//         <div>
//           <p className="mb-2 text-lg font-semibold">Stock Quantity</p>
//           <input
//             onChange={(e) => setStock(e.target.value)}
//             value={stock}
//             className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//             type="number"
//             placeholder="Enter Stock Quantity"
//             min="0"
//             required
//           />
//         </div>
//       </div>

//       {/* Discount Section */}
//       <div className="w-full p-4 mt-4 border-2 border-orange-300 rounded-lg bg-orange-50">
//         <p className="mb-3 text-lg font-semibold text-orange-700">
//           Product Discount (Optional)
//         </p>
//         <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
//           <div>
//             <p className="mb-2 text-sm font-medium">Discount Percentage (%)</p>
//             <input
//               onChange={(e) => setDiscountPercent(e.target.value)}
//               value={discountPercent}
//               className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//               type="number"
//               placeholder="e.g., 20 for 20% off"
//               min="0"
//               max="100"
//             />
//             <p className="mt-1 text-xs text-gray-600">
//               Leave empty for no discount
//             </p>
//           </div>
//           <div>
//             <p className="mb-2 text-sm font-medium">Discount Expiry Date & Time</p>
//             <input
//               onChange={(e) => setDiscountExpiry(e.target.value)}
//               value={discountExpiry}
//               className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
//               type="datetime-local"
//             />
//             <p className="mt-1 text-xs text-gray-600">
//               Discount will auto-expire after this date
//             </p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <p className="mb-2 text-lg font-semibold">Product Sizes</p>
//         <div className="flex gap-3">
//           {["S", "M", "L", "XL", "XXL"].map((size) => (
//             <div
//               key={size}
//               onClick={() =>
//                 setSizes((prev) =>
//                   prev.includes(size)
//                     ? prev.filter((item) => item !== size)
//                     : [...prev, size]
//                 )
//               }
//             >
//               <p
//                 className={`${
//                   sizes.includes(size)
//                     ? "bg-gray-500 text-white rounded-md"
//                     : "bg-slate-200"
//                 } px-3 py-1 cursor-pointer`}
//               >
//                 {size}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2 mt-2">
//         <input
//           type="checkbox"
//           id="bestSeller"
//           checked={bestSeller}
//           onChange={() => setBestSeller((prev) => !prev)}
//         />
//         <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
//           Add to Best Seller
//         </label>
//       </div>

//       <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
//         <button
//           type="submit"
//           className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
//         >
//           Add Product
//         </button>
//         <button
//           type="button"
//           className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
//           onClick={resetForm}
//         >
//           Reset Details
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Add;









import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountExpiry, setDiscountExpiry] = useState("");

  // Footwear sizes with UK and EU
  const footwearSizes = [
    { uk: 5, eu: 38 },
    { uk: 6, eu: 39 },
    { uk: 7, eu: 40 },
    { uk: 8, eu: 42 },
    { uk: 9, eu: 43 },
    { uk: 10, eu: 44 },
    { uk: 11, eu: 45 },
    { uk: 12, eu: 46 }
  ];

  const standardSizes = ["S", "M", "L", "XL", "XXL"];

  const isFootwear = subCategory === "Footwear";
  const availableSizes = isFootwear ? footwearSizes : standardSizes;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);
      formData.append("discountPercent", discountPercent || 0);
      formData.append("discountExpiry", discountExpiry || "");
      formData.append("sizeType", isFootwear ? "footwear" : "standard");

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setPrice("");
    setStock("");
    setSizes([]);
    setBestSeller(false);
    setDiscountPercent("");
    setDiscountExpiry("");
  };

  const toggleSize = (size) => {
    if (isFootwear) {
      const sizeString = `UK ${size.uk} / EU ${size.eu}`;
      setSizes((prev) =>
        prev.includes(sizeString)
          ? prev.filter((item) => item !== sizeString)
          : [...prev, sizeString]
      );
    } else {
      setSizes((prev) =>
        prev.includes(size)
          ? prev.filter((item) => item !== size)
          : [...prev, size]
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2 text-lg font-semibold">Upload Product Image(s)</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Description"
          required
        />
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2 text-lg font-semibold">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Product Sub Category</p>
          <select
            onChange={(e) => {
              setSubCategory(e.target.value);
              setSizes([]); // Reset sizes when subcategory changes
            }}
            value={subCategory}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            required
          >
            <option value="">Select Sub Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Summerwear">Summerwear</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2 text-lg font-semibold">Product Price (PKR)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            type="number"
            placeholder="Enter Product Price"
            required
          />
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Stock Quantity</p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            type="number"
            placeholder="Enter Stock Quantity"
            min="0"
            required
          />
        </div>
      </div>

      {/* Discount Section */}
      <div className="w-full p-4 mt-4 border-2 border-orange-300 rounded-lg bg-orange-50">
        <p className="mb-3 text-lg font-semibold text-orange-700">
          Product Discount (Optional)
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          <div>
            <p className="mb-2 text-sm font-medium">Discount Percentage (%)</p>
            <input
              onChange={(e) => setDiscountPercent(e.target.value)}
              value={discountPercent}
              className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
              type="number"
              placeholder="e.g., 20 for 20% off"
              min="0"
              max="100"
            />
            <p className="mt-1 text-xs text-gray-600">
              Leave empty for no discount
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Discount Expiry Date & Time</p>
            <input
              onChange={(e) => setDiscountExpiry(e.target.value)}
              value={discountExpiry}
              className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
              type="datetime-local"
            />
            <p className="mt-1 text-xs text-gray-600">
              Discount will auto-expire after this date
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-lg font-semibold">
          Product Sizes {isFootwear && "(UK / EU)"}
        </p>
        <div className="flex gap-3 flex-wrap">
          {isFootwear ? (
            footwearSizes.map((size) => {
              const sizeString = `UK ${size.uk} / EU ${size.eu}`;
              return (
                <div
                  key={sizeString}
                  onClick={() => toggleSize(size)}
                >
                  <p
                    className={`${
                      sizes.includes(sizeString)
                        ? "bg-gray-500 text-white rounded-md"
                        : "bg-slate-200"
                    } px-3 py-1 cursor-pointer text-sm`}
                  >
                    UK {size.uk}<br/>EU {size.eu}
                  </p>
                </div>
              );
            })
          ) : (
            standardSizes.map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
              >
                <p
                  className={`${
                    sizes.includes(size)
                      ? "bg-gray-500 text-white rounded-md"
                      : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
          Add to Best Seller
        </label>
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <button
          type="submit"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
        >
          Add Product
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
          onClick={resetForm}
        >
          Reset Details
        </button>
      </div>
    </form>
  );
};

export default Add;