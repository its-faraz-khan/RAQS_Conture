import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
  <div className='w-full md:max-w-[450px]'>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.176!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="object-cover"
    ></iframe>
  </div>
  {
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>Welcome to RAQS, where style meets quality. Our mission is to bring you refined fashion, standout essentials, and everyday confidence through carefully curated pieces that feel modern and timeless.</p>
          <p>At RAQS, your satisfaction shapes everything we do. From effortless browsing to reliable delivery, we are committed to making each part of your shopping experience smooth, inspiring, and memorable.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At RAQS, our mission is to empower you to express your unique style with high-quality, trend-conscious fashion that feels accessible, polished, and confidently wearable.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At RAQS, our vision is to become a trusted fashion destination known for elevated design, dependable quality, and a brand experience that inspires confidence in every wardrobe.</p>
        </div>
}
      </div>
      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At RAQS, quality comes first. Every product is carefully chosen and reviewed to meet our standards, so you can shop with confidence and clarity.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Convenience</b>
          <p className='text-gray-600'>RAQS delivers a smooth shopping experience with easy browsing, fast shipping, simple returns, and flexible payment options designed around your convenience.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At RAQS, exceptional service is part of the promise. Our support team is here to help with questions, orders, and updates whenever you need us.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
