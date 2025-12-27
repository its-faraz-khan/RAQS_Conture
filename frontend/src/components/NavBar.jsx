// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { Link, NavLink } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';

// const NavBar = () => {
//     const [visible, setVisible] = useState(false);
//     const {setShowSearch, getCartCount} = useContext(ShopContext);
//   return (
//     <div className='flex items-center justify-between py-5 font-medium'>
//         <Link to='/'>
//             <img src={assets.logo} className='w-36' alt="Trendify" />
//         </Link>
//         <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
//             <NavLink to='/' className='flex flex-col items-center gap-1'>
//                 <p>HOME</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/collection' className='flex flex-col items-center gap-1'>
//                 <p>COLLECTION</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/about' className='flex flex-col items-center gap-1'>
//                 <p>ABOUT</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/contact' className='flex flex-col items-center gap-1'>
//                 <p>CONTACT</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//         </ul>
//         <div className='flex items-center gap-6'>
//             <img 
//                 onClick={() => setShowSearch(true)} 
//                 src={assets.search_icon} 
//                 className='w-5 cursor-pointer' 
//                 alt="Search Products" 
//             />
//             <div className='relative group'>
//                 <Link to='/login'>
//                     <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Your Profile" />
//                 </Link>
//                 <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
//                     <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
//                         <p className='cursor-pointer hover:text-black'>Profile</p>
//                         <p className='cursor-pointer hover:text-black'>Orders</p>
//                         <p className='cursor-pointer hover:text-black'>Logout</p>
//                     </div>
//                 </div>
//             </div>
//             <Link to='/cart' className='relative'>
//                 <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
//                 <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
//             </Link>
//             <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
//         </div>
        
//         {/* INFO: Sidbar menu for smaller screens */}
//         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
//             <div className='flex flex-col text-gray-600'>
//                 <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//                     <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown" />
//                     <p>Back</p>
//                 </div>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default NavBar














// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';

// const NavBar = () => {
//     const [visible, setVisible] = useState(false);
//     const { setShowSearch, getCartCount } = useContext(ShopContext);
//     const navigate = useNavigate();

//     const isLoggedIn = localStorage.getItem("token");

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//         window.location.reload();  // ensures Nav updates
//     };

//     return (
//         <div className='flex items-center justify-between py-5 font-medium'>
//             <Link to='/'>
//                 <img src={assets.logo} className='w-36' alt="Trendify" />
//             </Link>

//             {/* ---------- DESKTOP NAV LINKS ---------- */}
//             <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
//                 <NavLink to='/' className='flex flex-col items-center gap-1'>
//                     <p>HOME</p>
//                     <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//                 </NavLink>
//                 <NavLink to='/collection' className='flex flex-col items-center gap-1'>
//                     <p>COLLECTION</p>
//                     <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//                 </NavLink>
//                 <NavLink to='/about' className='flex flex-col items-center gap-1'>
//                     <p>ABOUT</p>
//                     <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//                 </NavLink>
//                 <NavLink to='/contact' className='flex flex-col items-center gap-1'>
//                     <p>CONTACT</p>
//                     <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//                 </NavLink>
//             </ul>

//             {/* ---------- RIGHT SIDE ICONS ---------- */}
//             <div className='flex items-center gap-6'>
                
//                 {/* SEARCH ICON */}
//                 <img 
//                     onClick={() => setShowSearch(true)} 
//                     src={assets.search_icon} 
//                     className='w-5 cursor-pointer' 
//                     alt="Search Products" 
//                 />

//                 {/* PROFILE ICON WITH DROPDOWN */}
//                 <div className='relative group'>

//                     {/* If LOGGED IN → clicking profile does NOT send to login */}
//                     {isLoggedIn ? (
//                         <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
//                     ) : (
//                         <Link to='/login'>
//                             <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Login" />
//                         </Link>
//                     )}

//                     {/* DROPDOWN MENU */}
//                     <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
//                         <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>

//                             {/* If user is NOT logged in → show LOGIN only */}
//                             {!isLoggedIn && (
//                                 <Link to="/login" className='cursor-pointer hover:text-black'>
//                                     Login
//                                 </Link>
//                             )}

//                             {/* If user is logged in → show Profile, Orders & Logout */}
//                             {isLoggedIn && (
//                                 <>
//                                     <Link to="/profile" className='cursor-pointer hover:text-black'>
//                                         Profile
//                                     </Link>

//                                     <Link to="/orders" className='cursor-pointer hover:text-black'>
//                                         Orders
//                                     </Link>

//                                     <p 
//                                         onClick={handleLogout}
//                                         className='cursor-pointer hover:text-black'
//                                     >
//                                         Logout
//                                     </p>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* CART ICON */}
//                 <Link to='/cart' className='relative'>
//                     <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
//                     <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
//                         {getCartCount()}
//                     </p>
//                 </Link>

//                 {/* MOBILE MENU ICON */}
//                 <img 
//                     onClick={() => setVisible(true)} 
//                     src={assets.menu_icon} 
//                     className='w-5 cursor-pointer sm:hidden' 
//                     alt="Menu Icon" 
//                 />
//             </div>

//             {/* ---------- MOBILE SIDEBAR MENU ---------- */}
//             <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
//                 <div className='flex flex-col text-gray-600'>
//                     <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//                         <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown" />
//                         <p>Back</p>
//                     </div>
//                     <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NavBar





import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload(); // refresh navbar UI
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            
            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="ClassyShop" />
            </Link>

            {/* Desktop Links */}
            <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                </NavLink>
            </ul>

            {/* Right icons */}
            <div className='flex items-center gap-6'>

                {/* Search */}
                <img 
                    onClick={() => setShowSearch(true)} 
                    src={assets.search_icon} 
                    className='w-5 cursor-pointer' 
                    alt="Search Products" 
                />

                {/* Profile Dropdown */}
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />

                    <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                        <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>

                            {isLoggedIn ? (
                                <>
                                    <Link to="/orders" className="hover:text-black">
                                        Orders
                                    </Link>
                                    <p
                                        onClick={handleLogout}
                                        className="cursor-pointer hover:text-black"
                                    >
                                        Logout
                                    </p>
                                </>
                            ) : (
                                <Link to="/login" className="hover:text-black">
                                    Login
                                </Link>
                            )}

                        </div>
                    </div>
                </div>

                {/* Cart */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Mobile Menu */}
                <img 
                    onClick={() => setVisible(true)} 
                    src={assets.menu_icon} 
                    className='w-5 cursor-pointer sm:hidden' 
                    alt="Menu Icon" 
                />
            </div>

            {/* Mobile Sidebar */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

                    {/* Login/Logout in mobile menu */}
                    {isLoggedIn ? (
                        <p 
                            onClick={() => {
                                handleLogout();
                                setVisible(false);
                            }}
                            className='py-2 pl-6 border cursor-pointer'
                        >
                            Logout
                        </p>
                    ) : (
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/login'>Login</NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;

