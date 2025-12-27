
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const List = ({ token }) => {
//   const [listProducts, setListProducts] = useState([]);

//   const fetchListProducts = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");

//       if (response.data.success) {
//         setListProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching products");
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
//         toast.info(response.data.message);
//         await fetchListProducts();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error removing product");
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
//         <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-sm text-center font-semibold">
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
//             className="grid grid-cols-[0.5fr_1fr_1.5fr] md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
//             key={index}
//           >
//             <img className="w-12" src={item.image[0]} alt="Product Image" />
//             <p className="text-left">{item.name}</p>
//             <p className="text-left">{item.description}</p>
//             <p className="hidden md:block">{item.category}</p>
//             <p className="hidden md:block">{item.subCategory}</p>
//             <p className="hidden md:block">{currency(item.price)}</p>
//             <p className={`hidden md:block ${item.stock === 0 ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
//               {item.stock}
//             </p>
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
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editStock, setEditStock] = useState("");

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products");
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
        toast.info(response.data.message);
        await fetchListProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product");
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
        toast.success("Stock updated successfully!");
        setEditingProduct(null);
        setEditStock("");
        await fetchListProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating stock");
    }
  };

  const currency = (price) => {
    return `Rs ${price.toLocaleString()}`;
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.7fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-sm text-center font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price (PKR)</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
        </div>
        {/* Display Products */}
        {listProducts.map((item, index) => (
          <div
            className="grid grid-cols-[0.5fr_1fr_1.5fr] md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.7fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
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
                      item.stock === 0 ? "text-red-600 font-semibold" : "text-green-600"
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