
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const List = ({ token }) => {
//   const [listProducts, setListProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [editStock, setEditStock] = useState("");

//   const fetchListProducts = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");

//       if (response.data.success) {
//         setListProducts(response.data.products);
//       } else {
//         notify(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       notify("Error fetching products");
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         notify(response.data.message);
//         await fetchListProducts();
//       } else {
//         notify(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       notify("Error removing product");
//     }
//   };

//   const startEditStock = (product) => {
//     setEditingProduct(product._id);
//     setEditStock(product.stock.toString());
//   };

//   const cancelEdit = () => {
//     setEditingProduct(null);
//     setEditStock("");
//   };

//   const saveStock = async (productId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/product/update-stock",
//         { productId, stock: editStock },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         notify("Stock updated successfully!");
//         setEditingProduct(null);
//         setEditStock("");
//         await fetchListProducts();
//       } else {
//         notify(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       notify("Error updating stock");
//     }
//   };

//   const currency = (price) => {
//     return `Rs ${price.toLocaleString()}`;
//   };

//   useEffect(() => {
//     fetchListProducts();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col gap-2">
//         {/* List Table Title */}
//         <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.7fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-sm text-center font-semibold">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Description</b>
//           <b>Category</b>
//           <b>Sub Category</b>
//           <b>Price (PKR)</b>
//           <b>Stock</b>
//           <b className="text-center">Action</b>
//         </div>
//         {/* Display Products */}
//         {listProducts.map((item, index) => (
//           <div
//             className="grid grid-cols-[0.5fr_1fr_1.5fr] md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.7fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
//             key={index}
//           >
//             <img className="w-12" src={item.image[0]} alt="Product Image" />
//             <p className="text-left">{item.name}</p>
//             <p className="text-left">{item.description}</p>
//             <p className="hidden md:block">{item.category}</p>
//             <p className="hidden md:block">{item.subCategory}</p>
//             <p className="hidden md:block">{currency(item.price)}</p>
            
//             {/* Editable Stock */}
//             <div className="hidden md:flex items-center justify-center gap-1">
//               {editingProduct === item._id ? (
//                 <>
//                   <input
//                     type="number"
//                     value={editStock}
//                     onChange={(e) => setEditStock(e.target.value)}
//                     className="w-16 px-2 py-1 border rounded"
//                     min="0"
//                   />
//                   <button
//                     onClick={() => saveStock(item._id)}
//                     className="px-2 py-1 text-xs text-white bg-green-600 rounded"
//                   >
//                     ✓
//                   </button>
//                   <button
//                     onClick={cancelEdit}
//                     className="px-2 py-1 text-xs text-white bg-gray-600 rounded"
//                   >
//                     ✕
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span
//                     className={`${
//                       item.stock === 0 ? "text-red-600 font-semibold" : "text-green-600"
//                     }`}
//                   >
//                     {item.stock}
//                   </span>
//                   <button
//                     onClick={() => startEditStock(item)}
//                     className="ml-2 px-2 py-1 text-xs text-white bg-blue-600 rounded"
//                   >
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>

//             <p
//               onClick={() => removeProduct(item._id)}
//               className="font-bold text-center text-white bg-red-500 rounded-full cursor-pointer md:text-center w-7 h-7 flex items-center justify-center mx-auto"
//             >
//               X
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import notify from "../utils/notify";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editStock, setEditStock] = useState("");
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [editDiscountPercent, setEditDiscountPercent] = useState("");
  const [editDiscountExpiry, setEditDiscountExpiry] = useState("");

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Error fetching products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        notify(response.data.message);
        await fetchListProducts();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Error removing product");
    }
  };

  const startEditStock = (product) => {
    setEditingProduct(product._id);
    setEditStock(product.stock.toString());
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditStock("");
  };

  const saveStock = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update-stock",
        { productId, stock: editStock },
        { headers: { token } }
      );

      if (response.data.success) {
        notify("Stock updated successfully!");
        setEditingProduct(null);
        setEditStock("");
        await fetchListProducts();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Error updating stock");
    }
  };

  const startEditDiscount = (product) => {
    setEditingDiscount(product._id);
    setEditDiscountPercent(product.discountPercent?.toString() || "0");
    setEditDiscountExpiry(
      product.discountExpiry
        ? new Date(product.discountExpiry).toISOString().slice(0, 16)
        : ""
    );
  };

  const cancelDiscountEdit = () => {
    setEditingDiscount(null);
    setEditDiscountPercent("");
    setEditDiscountExpiry("");
  };

  const saveDiscount = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update-discount",
        {
          productId,
          discountPercent: editDiscountPercent,
          discountExpiry: editDiscountExpiry,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        notify("Discount updated successfully!");
        setEditingDiscount(null);
        setEditDiscountPercent("");
        setEditDiscountExpiry("");
        await fetchListProducts();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Error updating discount");
    }
  };

  const removeDiscount = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update-discount",
        {
          productId,
          discountPercent: 0,
          discountExpiry: null,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        notify("Discount removed!");
        await fetchListProducts();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Error removing discount");
    }
  };

  const currency = (price) => {
    return `Rs ${price.toLocaleString()}`;
  };

  const isDiscountActive = (item) => {
    return (
      item.hasDiscount &&
      item.discountExpiry &&
      new Date(item.discountExpiry) > new Date()
    );
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[0.5fr_1fr_1fr_0.5fr_0.5fr_0.5fr_0.7fr_1fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-sm text-center font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price (PKR)</b>
          <b>Stock</b>
          <b>Discount</b>
          <b className="text-center">Action</b>
        </div>
        {listProducts.map((item, index) => (
          <div
            className="grid grid-cols-[0.5fr_1fr_1fr] md:grid-cols-[0.5fr_1fr_1fr_0.5fr_0.5fr_0.5fr_0.7fr_1fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="Product Image" />
            <p className="text-left">{item.name}</p>
            <p className="text-left">{item.description}</p>
            <p className="hidden md:block">{item.category}</p>
            <p className="hidden md:block">{item.subCategory}</p>
            <p className="hidden md:block">{currency(item.price)}</p>

            {/* Editable Stock */}
            <div className="hidden md:flex items-center justify-center gap-1">
              {editingProduct === item._id ? (
                <>
                  <input
                    type="number"
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    className="w-16 px-2 py-1 border rounded"
                    min="0"
                  />
                  <button
                    onClick={() => saveStock(item._id)}
                    className="px-2 py-1 text-xs text-white bg-green-600 rounded"
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 text-xs text-white bg-gray-600 rounded"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`${
                      item.stock === 0
                        ? "text-red-600 font-semibold"
                        : "text-green-600"
                    }`}
                  >
                    {item.stock}
                  </span>
                  <button
                    onClick={() => startEditStock(item)}
                    className="ml-2 px-2 py-1 text-xs text-white bg-blue-600 rounded"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>

            {/* Editable Discount */}
            <div className="hidden md:flex flex-col items-center justify-center gap-1 p-2">
              {editingDiscount === item._id ? (
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="number"
                    value={editDiscountPercent}
                    onChange={(e) => setEditDiscountPercent(e.target.value)}
                    className="w-full px-2 py-1 border rounded text-xs"
                    min="0"
                    max="100"
                    placeholder="Discount %"
                  />
                  <input
                    type="datetime-local"
                    value={editDiscountExpiry}
                    onChange={(e) => setEditDiscountExpiry(e.target.value)}
                    className="w-full px-2 py-1 border rounded text-xs"
                  />
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => saveDiscount(item._id)}
                      className="px-2 py-1 text-xs text-white bg-green-600 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelDiscountEdit}
                      className="px-2 py-1 text-xs text-white bg-gray-600 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {isDiscountActive(item) ? (
                    <div className="text-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="px-2 py-1 text-white bg-red-500 rounded font-semibold">
                          {item.discountPercent}% OFF
                        </span>
                      </div>
                      <p className="text-gray-600 text-[10px] mb-1">
                        Expires: {new Date(item.discountExpiry).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-[10px] mb-2">
                        {new Date(item.discountExpiry).toLocaleTimeString()}
                      </p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEditDiscount(item)}
                          className="px-2 py-1 text-xs text-white bg-orange-600 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeDiscount(item._id)}
                          className="px-2 py-1 text-xs text-white bg-red-600 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-400 text-xs mb-2">
                        No discount
                      </span>
                      <button
                        onClick={() => startEditDiscount(item)}
                        className="px-3 py-1 text-xs text-white bg-green-600 rounded"
                      >
                        Add Discount
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            <p
              onClick={() => removeProduct(item._id)}
              className="font-bold text-center text-white bg-red-500 rounded-full cursor-pointer md:text-center w-7 h-7 flex items-center justify-center mx-auto"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;