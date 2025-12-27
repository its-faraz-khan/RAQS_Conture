// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = async (e) => {
//   e.preventDefault();

//   // Temporary hardcoded admin credentials
//   const hardcodedEmail = "farazkhan4861@gmail.com";
//   const hardcodedPassword = "@Faraz123";

//   // Check credentials locally (no backend)
//   if (email === hardcodedEmail && password === hardcodedPassword) {
//     setToken("dummy-admin-token");
//     toast.success("Login successful (development mode).");
//     return;
//   }

//   toast.error("Invalid admin email or password.");
// };


//   return (
//     <div className="flex items-center justify-center w-full min-h-screen">
//       <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
//         <div className="mb-3 w-fit">
//           <img src={assets.logo} alt="ClassyShop" />
//         </div>
//         <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3 min-w-72">
//             <p className="mb-2 text-sm font-medium text-gray-700">Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
//               type="email"
//               placeholder="your@email.com"
//               required
//             />
//           </div>
//           <div>
//             <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             className="w-full px-4 py-2 mt-5 text-white bg-black rounded-md"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="mb-3 w-fit">
          <img src={assets.logo} alt="ClassyShop" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 mt-5 text-white bg-black rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center">
          Admin Credentials (from .env file)
        </p>
      </div>
    </div>
  );
};

export default Login;