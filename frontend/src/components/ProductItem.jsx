// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
//       <div className="overflow-hidden">
//         <img
//           className="transition ease-in-out hover:scale-110"
//           src={image[0]}
//           alt="Product"
//         />
//       </div>
//       <p className="pt-3 pb-1 text-sm">{name}</p>
//       <p className="text-sm font-medium">
//         {currency}&nbsp;
//         {price.toLocaleString(undefined, {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })}
//       </p>
//     </Link>
//   );
// };

// export default ProductItem;






import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discountPercent, discountExpiry, hasDiscount }) => {
  const { currency } = useContext(ShopContext);

  const isDiscountValid = hasDiscount && discountExpiry && new Date(discountExpiry) > new Date();
  const discountedPrice = isDiscountValid ? Math.round(price - (price * discountPercent / 100)) : price;

  return (<Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
  <div className="overflow-hidden relative">
    <img
      className="transition ease-in-out hover:scale-110"
      src={image[0]}
      alt="Product"
    />
    {isDiscountValid && (
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg">
        {discountPercent}% OFF
      </div>
    )}
  </div>
  <p className="pt-3 pb-1 text-sm">{name}</p>
  <div className="flex items-center gap-2">
    {isDiscountValid ? (
      <>
        <p className="text-sm font-medium text-gray-400 line-through">
          {currency} {price.toLocaleString()}
        </p>
        <p className="text-sm font-bold text-red-600">
          {currency} {discountedPrice.toLocaleString()}
        </p>
      </>
    ) : (
      <p className="text-sm font-medium">
        {currency} {price.toLocaleString()}
      </p>
    )}
  </div>
  {isDiscountValid && (
    <p className="text-xs text-orange-600 mt-1 font-medium">
      Ends: {new Date(discountExpiry).toLocaleDateString()} at {new Date(discountExpiry).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </p>
  )}
</Link>);
};
export default ProductItem;