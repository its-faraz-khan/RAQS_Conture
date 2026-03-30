import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="top-0 left-0 z-50 w-full transition-all duration-300 bg-gray-600 bg-opacity-50 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between py-3 px-[4%]">
        <Link to={"/"} className="flex items-center">
          <img
            className="w-[170px] object-contain sm:w-[210px]"
            src={assets.logo}
            alt="RAQS Clothing Store"
          />
        </Link>
        <button
          onClick={() => setToken("")}
          className="px-5 py-2 text-xs text-white bg-gray-800 rounded-full sm:px-7 sm:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
