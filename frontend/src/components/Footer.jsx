import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <Link to='/' className='inline-flex items-center py-1'>
                    <img
                        src={assets.logo}
                        className='mb-6 block w-[180px] cursor-pointer object-contain sm:w-[210px]'
                        alt="RAQS Clothing Store"
                    />
                </Link>
                <p className='w-full text-gray-600 md:w-2/3'>Thank you for shopping with RAQS. We are dedicated to bringing you elevated fashion, dependable quality, and a smooth shopping experience from first click to final delivery. Follow us for new arrivals, exclusive offers, and carefully curated collections designed to keep your style feeling fresh.</p>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About Us</li>
                    </Link>
                    <Link to='/about'>
                        <li>Delivery</li>
                    </Link>
                    <Link to='/about'>
                        <li>Privacy & Policy</li>
                    </Link>
                </ul>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-3 text-gray-600'>
                    <li>(+92)348-4272036</li>
                    <li>contact.raqs@gmail.com</li>
                </ul>
                <div className='flex gap-4 mt-5'>
                    <a href='https://www.facebook.com/share/1KokPCVFKt/' target='_blank' rel='noopener noreferrer' className='text-2xl text-blue-600 hover:text-blue-800 transition'>
                        <i className='fab fa-facebook'></i>
                    </a>
                    <a href='https://www.instagram.com/raqs_couture?igsh=MWZmNThjczZtOW5jbw==' target='_blank' rel='noopener noreferrer' className='text-2xl text-pink-600 hover:text-pink-800 transition'>
                        <i className='fab fa-instagram'></i>
                    </a>
                    <a href='https://www.tiktok.com/@raqs_couture?_r=1&_t=ZS-9566cRMAQlD' target='_blank' rel='noopener noreferrer' className='text-2xl text-black hover:text-gray-700 transition'>
                        <i className='fab fa-tiktok'></i>
                    </a>
                </div>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright {new Date().getFullYear()} RAQS. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
