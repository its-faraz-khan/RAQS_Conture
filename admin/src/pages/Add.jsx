// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendUrl } from "../App";
// import notify from "../utils/notify";

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
//         notify(response.data.message);
//         resetForm();
//       } else {
//         notify(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       notify("Something went wrong");
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
import notify from "../utils/notify";

// Default size charts — matches the frontend SizeChart component exactly
const DEFAULT_SIZE_CHARTS = {
  Topwear: {
    title: "Topwear Size Chart",
    headers: ["Size", "Chest (inches)", "Length (inches)", "Shoulder (inches)"],
    rows: [["S","36-38","27","17"],["M","38-40","28","18"],["L","40-42","29","19"],["XL","42-44","30","20"],["XXL","44-46","31","21"]]
  },
  Bottomwear: {
    title: "Bottomwear Size Chart",
    headers: ["Size", "Waist (inches)", "Hip (inches)", "Length (inches)"],
    rows: [["S","28-30","36-38","39"],["M","30-32","38-40","40"],["L","32-34","40-42","41"],["XL","34-36","42-44","42"],["XXL","36-38","44-46","43"]]
  },
  Winterwear: {
    title: "Winterwear Size Chart",
    headers: ["Size", "Chest (inches)", "Length (inches)", "Sleeve (inches)"],
    rows: [["S","38-40","28","24"],["M","40-42","29","25"],["L","42-44","30","26"],["XL","44-46","31","27"],["XXL","46-48","32","28"]]
  },
  Summerwear: {
    title: "Summerwear Size Chart",
    headers: ["Size", "Chest (inches)", "Length (inches)", "Shoulder (inches)"],
    rows: [["S","36-38","26","16"],["M","38-40","27","17"],["L","40-42","28","18"],["XL","42-44","29","19"],["XXL","44-46","30","20"]]
  },
  Footwear: {
    title: "Footwear Size Chart",
    headers: ["UK Size", "EU Size", "US Size", "Foot Length (cm)"],
    rows: [["5","38","6","24.1"],["6","39","7","24.8"],["7","40","8","25.4"],["8","42","9","26.7"],["9","43","10","27.3"],["10","44","11","27.9"],["11","45","12","28.6"],["12","46","13","29.2"]]
  }
};

const EMPTY_CHART = { title: "", headers: [], rows: [] };

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
  const [sizeChart, setSizeChart] = useState(EMPTY_CHART);

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
      // Save size chart only when it has rows; otherwise backend defaults to null (frontend falls back to defaults)
      if (sizeChart.rows.length > 0) {
        formData.append("sizeChart", JSON.stringify(sizeChart));
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        notify(response.data.message);
        resetForm();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Something went wrong");
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
    setSizeChart(EMPTY_CHART);
  };

  // ── Size chart helpers ────────────────────────────────────────────────────
  const updateChartCell = (rowIndex, colIndex, value) => {
    setSizeChart((prev) => ({
      ...prev,
      rows: prev.rows.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
          : row
      ),
    }));
  };

  const addChartRow = () => {
    setSizeChart((prev) => ({
      ...prev,
      rows: [...prev.rows, new Array(prev.headers.length).fill("")],
    }));
  };

  const removeChartRow = (rowIndex) => {
    setSizeChart((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, idx) => idx !== rowIndex),
    }));
  };

  const resetChartToDefault = () => {
    if (DEFAULT_SIZE_CHARTS[subCategory]) {
      setSizeChart(JSON.parse(JSON.stringify(DEFAULT_SIZE_CHARTS[subCategory])));
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

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
              const val = e.target.value;
              setSubCategory(val);
              setSizes([]);
              // Auto-load the default size chart for this subcategory
              setSizeChart(
                DEFAULT_SIZE_CHARTS[val]
                  ? JSON.parse(JSON.stringify(DEFAULT_SIZE_CHARTS[val]))
                  : EMPTY_CHART
              );
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

      {/* ── Size Chart Editor ─────────────────────────────────────────────── */}
      <div className="w-full p-4 mt-4 border-2 border-blue-300 rounded-lg bg-blue-50">
        <p className="mb-3 text-lg font-semibold text-blue-700">Size Chart</p>
        {!subCategory ? (
          <p className="text-sm text-gray-400 italic">
            Select a Sub Category above to load the default size chart for editing.
          </p>
        ) : sizeChart.headers.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No size chart available for this category.</p>
        ) : (
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <p className="text-sm font-medium text-blue-600">{sizeChart.title}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500 italic">Auto-loaded · edit freely</p>
              <button
                type="button"
                onClick={resetChartToDefault}
                className="px-3 py-1 text-xs text-blue-600 border border-blue-400 rounded hover:bg-blue-100"
              >
                Reset to Default
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {sizeChart.headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className="border border-gray-300 bg-gray-100 px-3 py-2 text-left text-xs font-semibold text-gray-600 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                  <th className="border border-gray-300 bg-gray-100 px-2 py-2 w-8" />
                </tr>
              </thead>
              <tbody>
                {sizeChart.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-blue-50/40"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="border border-gray-200 p-1">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => updateChartCell(rIdx, cIdx, e.target.value)}
                          className="w-full min-w-[60px] px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                        />
                      </td>
                    ))}
                    <td className="border border-gray-200 p-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeChartRow(rIdx)}
                        className="text-red-400 hover:text-red-600 font-bold text-lg leading-none px-1"
                        title="Remove row"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addChartRow}
            className="mt-3 px-4 py-1.5 text-sm text-blue-700 border border-blue-400 rounded hover:bg-blue-100 transition-colors"
          >
            + Add Row
          </button>
        </div>
        )}
      </div>
      {/* ──────────────────────────────────────────────────────────────────── */}

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