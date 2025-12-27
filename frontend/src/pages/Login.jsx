
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken, backendUrl } = useContext(ShopContext);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Signup request
        const res = await axios.post(backendUrl + "/api/user/register", {
          name: username,
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Sign up successful! Welcome to ClassyShop.");
          navigate("/");
        } else {
          toast.error(res.data.message || "Signup failed. Please try again.");
        }
      } else {
        // Login request
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Login successful! Welcome back.");
          navigate("/");
        } else {
          toast.error(res.data.message || "Invalid email or password.");
        }
      }
    } catch (error) {
      if (currentState === "Sign Up") {
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      } else {
        toast.error(
          error.response?.data?.message || "Invalid email or password."
        );
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;






// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { ShopContext } from "../context/ShopContext";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { token, setToken, backendUrl } = useContext(ShopContext);

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (currentState === "Sign Up") {
//         const res = await axios.post(backendUrl + "/api/user/register", {
//           name: username,
//           email,
//           password,
//         });

//         if (res.data.success) {
//           // DO NOT save token to localStorage - only to state
//           setToken(res.data.token);
//           toast.success("Sign up successful! Welcome to ClassyShop.");
//           navigate("/");
//         } else {
//           toast.error(res.data.message || "Signup failed. Please try again.");
//         }
//       } else {
//         const res = await axios.post(backendUrl + "/api/user/login", {
//           email,
//           password,
//         });

//         if (res.data.success) {
//           // DO NOT save token to localStorage - only to state
//           setToken(res.data.token);
//           toast.success("Login successful! Welcome back.");
//           navigate("/");
//         } else {
//           toast.error(res.data.message || "Invalid email or password.");
//         }
//       }
//     } catch (error) {
//       if (currentState === "Sign Up") {
//         toast.error(
//           error.response?.data?.message || "Signup failed. Please try again."
//         );
//       } else {
//         toast.error(
//           error.response?.data?.message || "Invalid email or password."
//         );
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {currentState === "Sign Up" && (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="John Doe"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       )}

//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="hello@gmail.com"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p
//           onClick={() => navigate("/forgot-password")}
//           className="cursor-pointer text-blue-600"
//         >
//           Forgot your password?
//         </p>

//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create a new account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login here
//           </p>
//         )}
//       </div>

//       <button className="px-8 py-2 mt-4 font-light text-white bg-black">
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;