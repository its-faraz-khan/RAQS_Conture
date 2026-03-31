// import React from 'react'

// const NewsLetterBox = () => {

//     const onSubmitHandler = (event) => {
//         event.preventDefault();
        
//     }
    
//   return (
//     <div className='mt-10 text-center '>
//         <p className='text-2xl font-medium text-gray-800'>Unlock Amazing Offers | Subscribe Today!</p>
//         <p className='mt-3 text-gray-400'>Don't miss out—unlock your savings now by subscribing below!</p>
//         <form onClick={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
//             <input 
//                 className='w-full outline-none sm:flex-1' 
//                 type="email" 
//                 placeholder='hello@gmail.com'
//                 required 
//             />
//             <button type='submit' className='px-10 py-4 text-xs text-white bg-black'>SUBSCRIBE</button>
//         </form>
//     </div>
//   )
// }

// export default NewsLetterBox







import React, { useState } from "react";
import axios from "axios";
import notify from "../utils/notify";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!email) {
      notify("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/subscription/subscribe",
        { email }
      );

      if (response.data.success) {
        notify(response.data.message);
        setEmail("");
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-center">
      <p className="text-2xl font-medium text-gray-800">
        Unlock Amazing Offers | Subscribe Today!
      </p>
      <p className="mt-3 text-gray-400">
        Don't miss out—unlock your savings now by subscribing below!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2"
      >
        <input
          className="w-full outline-none sm:flex-1"
          type="email"
          placeholder="hello@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-10 py-4 text-xs text-white bg-black ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;