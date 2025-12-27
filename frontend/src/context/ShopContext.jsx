// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const backendUrl = "http://localhost:4000";
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState(""); // Session only - no localStorage
//   const navigate = useNavigate();

//   const currency = "Rs"; // PKR
//   const delivery_fee = 250;

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Please Select a Size");
//       return;
//     }

//     const product = products.find((item) => item._id === itemId);
//     if (product && product.stock === 0) {
//       toast.error("This product is out of stock");
//       return;
//     }

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//     toast.success("Item Added To The Cart");
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };

//   const getProductsData = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       if (response.data.success) {
//         setProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // NO localStorage - token only in session memory

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     setCartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     setToken,
//     token,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;





import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currency = "Rs";
  const delivery_fee = 250;

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    }

    const product = products.find((item) => item._id === itemId);
    if (product && product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Item Added To The Cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list", {
        timeout: 5000, // 5 second timeout
      });

      if (response.data.success) {
        setProducts(response.data.products);
        console.log("Products loaded:", response.data.products.length);
      } else {
        console.error("Error response:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      
      // Don't show toast error on initial load
      if (error.code === 'ECONNABORTED') {
        console.log("Request timeout - backend might be slow");
      } else if (error.code === 'ERR_NETWORK') {
        console.log("Network error - backend not running?");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("ShopContext mounted, fetching products...");
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    loading,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;