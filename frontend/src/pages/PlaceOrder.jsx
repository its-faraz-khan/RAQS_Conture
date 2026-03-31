// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import notify from "../utils/notify";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//   } = useContext(ShopContext);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     let value = event.target.value;

//     // Phone validation for Pakistani numbers
//     if (name === "phone") {
//       // Remove any non-digit characters
//       value = value.replace(/\D/g, "");
      
//       // Ensure it starts with +92
//       if (value.length > 0 && !value.startsWith("92")) {
//         value = "92" + value;
//       }
      
//       // Limit to 12 digits (92 + 10 digits)
//       if (value.length > 12) {
//         value = value.slice(0, 12);
//       }
      
//       value = "+" + value;
//     }

//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   const validatePhone = (phone) => {
//     // Remove + sign for validation
//     const digits = phone.replace(/\+/g, "");
    
//     // Check if it starts with 92 and has 12 digits total
//     if (!digits.startsWith("92") || digits.length !== 12) {
//       return false;
//     }
    
//     return true;
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     // Validate phone number
//     if (!validatePhone(formData.phone)) {
//       notify("Please enter a valid Pakistani phone number (e.g., +923001234567)");
//       return;
//     }

//     try {
//       let orderItems = [];

//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(
//               products.find((product) => product._id === items)
//             );
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       };

//       const response = await axios.post(
//         backendUrl + "/api/order/place",
//         orderData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         setCartItems({});
//         navigate("/orders");
//         notify("Order placed successfully!");
//       } else {
//         notify(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       notify(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t"
//     >
//       <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
//         <div className="my-3 text-xl sm:text-2xl">
//           <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//         </div>
        
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="firstName"
//             value={formData.firstName}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="First Name *"
//           />
//           <input
//             onChange={onChangeHandler}
//             name="lastName"
//             value={formData.lastName}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
        
//         <input
//           onChange={onChangeHandler}
//           name="email"
//           value={formData.email}
//           className="w-full px-4 py-2 border border-gray-300 rounded"
//           type="email"
//           placeholder="Email Address"
//         />
        
//         <input
//           required
//           onChange={onChangeHandler}
//           name="street"
//           value={formData.street}
//           className="w-full px-4 py-2 border border-gray-300 rounded"
//           type="text"
//           placeholder="Street / Address *"
//         />
        
//         <div className="flex gap-3">
//           <input
//             onChange={onChangeHandler}
//             name="city"
//             value={formData.city}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="City"
//           />
//           <input
//             onChange={onChangeHandler}
//             name="state"
//             value={formData.state}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="State"
//           />
//         </div>
        
//         <div className="flex gap-3">
//           <input
//             onChange={onChangeHandler}
//             name="zipcode"
//             value={formData.zipcode}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="Zip Code"
//           />
//           <input
//             onChange={onChangeHandler}
//             name="country"
//             value={formData.country}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="Country"
//           />
//         </div>
        
//         <div>
//           <input
//             required
//             onChange={onChangeHandler}
//             name="phone"
//             value={formData.phone}
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//             type="text"
//             placeholder="Phone: +923001234567 *"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             * Pakistani number required (starts with +92)
//           </p>
//         </div>

//         <p className="text-xs text-gray-500">* Required fields</p>
//       </div>

//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1={"PAYMENT"} text2={"METHOD"} />
//           <div className="flex flex-col gap-3 lg:flex-row">
//             <div
//               onClick={() => setMethod("cod")}
//               className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-green-600" : ""
//                 }`}
//               ></p>
//               <p className="mx-4 text-sm font-medium text-gray-500">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>

//           <div className="w-full mt-8 text-end">
//             <button
//               type="submit"
//               className="px-16 py-3 text-sm text-white bg-black active:bg-gray-800"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;





import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import notify from "../utils/notify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "phone") {
      value = value.replace(/\D/g, "");
      
      if (value.length > 0 && !value.startsWith("92")) {
        value = "92" + value;
      }
      
      if (value.length > 12) {
        value = value.slice(0, 12);
      }
      
      value = "+" + value;
    }

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\+/g, "");
    
    if (!digits.startsWith("92") || digits.length !== 12) {
      return false;
    }
    
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validatePhone(formData.phone)) {
      notify("Please enter a valid Pakistani phone number (e.g., +923001234567)");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        notify("Order placed successfully!");
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.log(error);
      notify(error.message);
    }
  };

  // Calculate total savings
  const calculateSavings = () => {
    let totalSavings = 0;
    for (const items in cartItems) {
      const product = products.find((p) => p._id === items);
      if (product) {
        const isDiscountValid =
          product.hasDiscount &&
          product.discountExpiry &&
          new Date(product.discountExpiry) > new Date();

        if (isDiscountValid) {
          const discount = product.price * (product.discountPercent / 100);
          for (const size in cartItems[items]) {
            totalSavings += discount * cartItems[items][size];
          }
        }
      }
    }
    return Math.round(totalSavings);
  };

  const savings = calculateSavings();

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="First Name *"
          />
          <input
          required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="Last Name *"
          />
        </div>
        
        <input
        required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email Address *"
        />
        
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Street / Address *"
        />
        
        <div className="flex gap-3">
          <input
          required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="City *"
          />
          <input
          required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="State *"
          />
        </div>
        
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="Zip Code"
          />
        </div>
        
        <div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="Phone: +923001234567 *"
          />
          <p className="text-xs text-gray-500 mt-1">
            * Pakistani number required (starts with +92)
          </p>
        </div>

        <p className="text-xs text-gray-500">* Required fields</p>
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          {savings > 0 && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold text-center">
                🎉 You're saving Rs {savings.toLocaleString()} with discounts!
              </p>
            </div>
          )}
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-600" : ""
                }`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full mt-8 text-end">
            <button
              type="submit"
              className="px-16 py-3 text-sm text-white bg-black active:bg-gray-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;