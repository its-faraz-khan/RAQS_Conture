// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import Title from "../components/Title";
// import ProductItem from "../components/ProductItem";

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   const toggleCategory = (selectedCategory) => {
//     if (category === selectedCategory) {
//       setCategory("");
//     } else {
//       setCategory(selectedCategory);
//     }
//   };

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category) {
//       productsCopy = productsCopy.filter((item) => item.category === category);
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case "low-high":
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case "high-low":
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   const clearFilters = () => {
//     setCategory("");
//     setSubCategory([]);
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="flex items-center gap-2 my-2 text-xl cursor-pointer"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             src={assets.dropdown_icon}
//             alt="Dropdown"
//           />
//         </p>

//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="radio"
//                 name="category"
//                 value="Men"
//                 onChange={() => toggleCategory("Men")}
//                 checked={category === "Men"}
//               />
//               Men
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="radio"
//                 name="category"
//                 value="Women"
//                 onChange={() => toggleCategory("Women")}
//                 checked={category === "Women"}
//               />
//               Women
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="radio"
//                 name="category"
//                 value="Kids"
//                 onChange={() => toggleCategory("Kids")}
//                 checked={category === "Kids"}
//               />
//               Kids
//             </label>
//           </div>
//         </div>

//         <div
//           className={`border border-gray-300 pl-5 py-3 my-5 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Topwear"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Topwear")}
//               />
//               Topwear
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Bottomwear"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Bottomwear")}
//               />
//               Bottomwear
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Winterwear"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Winterwear")}
//               />
//               Winterwear
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Summerwear"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Summerwear")}
//               />
//               Summerwear
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Formal Shoes"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Formal Shoes")}
//               />
//               Formal Shoes
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Loafers"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Loafers")}
//               />
//               Loafers
//             </label>
//             <label className="flex gap-2 cursor-pointer">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="Slippers"
//                 onChange={toggleSubCategory}
//                 checked={subCategory.includes("Slippers")}
//               />
//               Slippers
//             </label>
//           </div>
//         </div>

//         <button
//           className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${
//             showFilter ? "block" : "hidden"
//           } sm:block`}
//           onClick={clearFilters}
//         >
//           Clear Filters
//         </button>
//       </div>

//       <div className="flex-1">
//         <div className="flex justify-between mb-4 text-base sm:text-2xl">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="px-2 text-sm border-2 border-gray-300"
//           >
//             <option value="relevant">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
//           {filterProducts.map((item, index) => (
//             <ProductItem
//               key={index}
//               id={item._id}
//               name={item.name}
//               image={item.image}
//               price={item.price}
//               discountPercent={item.discountPercent}
//               discountExpiry={item.discountExpiry}
//               hasDiscount={item.hasDiscount}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;







import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (selectedCategory) => {
    if (category === selectedCategory) {
      setCategory("");
    } else {
      setCategory(selectedCategory);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      productsCopy = productsCopy.filter((item) => item.category === category);
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearFilters = () => {
    setCategory("");
    setSubCategory([]);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="radio"
                name="category"
                value="Men"
                onChange={() => toggleCategory("Men")}
                checked={category === "Men"}
              />
              Men
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="radio"
                name="category"
                value="Women"
                onChange={() => toggleCategory("Women")}
                checked={category === "Women"}
              />
              Women
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="radio"
                name="category"
                value="Kids"
                onChange={() => toggleCategory("Kids")}
                checked={category === "Kids"}
              />
              Kids
            </label>
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}
                checked={subCategory.includes("Topwear")}
              />
              Topwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCategory}
                checked={subCategory.includes("Bottomwear")}
              />
              Bottomwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}
                checked={subCategory.includes("Winterwear")}
              />
              Winterwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Summerwear"
                onChange={toggleSubCategory}
                checked={subCategory.includes("Summerwear")}
              />
              Summerwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Footwear"
                onChange={toggleSubCategory}
                checked={subCategory.includes("Footwear")}
              />
              Footwear
            </label>
          </div>
        </div>

        <button
          className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 text-sm border-2 border-gray-300"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              discountPercent={item.discountPercent}
              discountExpiry={item.discountExpiry}
              hasDiscount={item.hasDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;