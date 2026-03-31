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
//   const [token, setToken] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const currency = "Rs";
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
//       if (itemInfo) {
//         for (const item in cartItems[items]) {
//           try {
//             if (cartItems[items][item] > 0) {
//               // Calculate discounted price
//               let finalPrice = itemInfo.price;
              
//               // Check if discount is valid
//               const isDiscountValid = 
//                 itemInfo.hasDiscount && 
//                 itemInfo.discountExpiry && 
//                 new Date(itemInfo.discountExpiry) > new Date();
              
//               if (isDiscountValid) {
//                 finalPrice = Math.round(
//                   itemInfo.price - (itemInfo.price * itemInfo.discountPercent) / 100
//                 );
//               }
              
//               totalAmount += finalPrice * cartItems[items][item];
//             }
//           } catch (error) {}
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const getProductsData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(backendUrl + "/api/product/list", {
//         timeout: 5000,
//       });

//       if (response.data.success) {
//         setProducts(response.data.products);
//         console.log("Products loaded:", response.data.products.length);
//       } else {
//         console.error("Error response:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
      
//       if (error.code === 'ECONNABORTED') {
//         console.log("Request timeout - backend might be slow");
//       } else if (error.code === 'ERR_NETWORK') {
//         console.log("Network error - backend not running?");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("ShopContext mounted, fetching products...");
//     getProductsData();
//   }, []);

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
//     loading,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;










import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../utils/notify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const currency = "Rs";
  const delivery_fee = 250;

  const addToCart = async (itemId, size, quantity = 1) => {
    if (!size) {
      notify("Please select a size");
      return;
    }

    const product = products.find((item) => item._id === itemId);
    if (product && product.stock === 0) {
      notify("This product is out of stock");
      return;
    }

    let cartData = structuredClone(cartItems);
    let newQty;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        newQty = cartData[itemId][size] + quantity;
      } else {
        newQty = quantity;
      }
      cartData[itemId][size] = newQty;
    } else {
      cartData[itemId] = {};
      newQty = quantity;
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    setCartDrawerOpen(true);

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity: newQty },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        notify("Cart sync failed");
      }
    }

    notify("Added to cart");
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

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        notify("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              let finalPrice = itemInfo.price;
              
              const isDiscountValid = 
                itemInfo.hasDiscount && 
                itemInfo.discountExpiry && 
                new Date(itemInfo.discountExpiry) > new Date();
              
              if (isDiscountValid) {
                finalPrice = Math.round(
                  itemInfo.price - (itemInfo.price * itemInfo.discountPercent) / 100
                );
              }
              
              totalAmount += finalPrice * cartItems[items][item];
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
        timeout: 5000,
      });

      if (response.data.success) {
        // Prepend backend URL to image paths
        const productsWithFullImageUrls = response.data.products.map(product => ({
          ...product,
          image: product.image.map(img => {
            if (img.startsWith('/uploads/')) {
              return backendUrl + img;
            }
            return img;
          })
        }));
        
        setProducts(productsWithFullImageUrls);
        console.log("Products loaded:", productsWithFullImageUrls.length);
      } else {
        console.error("Error response:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      
      if (error.code === 'ECONNABORTED') {
        console.log("Request timeout - backend might be slow");
      } else if (error.code === 'ERR_NETWORK') {
        console.log("Network error - backend not running?");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const raw = response.data.cartData || {};
        // Strip out any size entries with quantity <= 0 to avoid ghost badge counts
        const clean = {};
        for (const itemId in raw) {
          for (const size in raw[itemId]) {
            if (raw[itemId][size] > 0) {
              if (!clean[itemId]) clean[itemId] = {};
              clean[itemId][size] = raw[itemId][size];
            }
          }
        }
        setCartItems(clean);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (token) {
      getUserCart(token);
    }
  }, [token]);

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
    cartDrawerOpen,
    setCartDrawerOpen,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;