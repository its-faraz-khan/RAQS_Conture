import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../utils/notify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import GoogleSignInButton from "../components/GoogleSignInButton";

const Login = () => {
  const envGoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const [currentState, setCurrentState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState(envGoogleClientId);
  const [isGoogleConfigLoading, setIsGoogleConfigLoading] = useState(!envGoogleClientId);
  const navigate = useNavigate();
  const { token, setToken, backendUrl, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (envGoogleClientId) {
      setGoogleClientId(envGoogleClientId);
      setIsGoogleConfigLoading(false);
      return undefined;
    }

    let isMounted = true;

    const loadGoogleClientId = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/user/google-config");

        if (!isMounted) {
          return;
        }

        if (response.data.success && response.data.clientId) {
          setGoogleClientId(response.data.clientId);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load Google sign-in config:", error);
      } finally {
        if (isMounted) {
          setIsGoogleConfigLoading(false);
        }
      }
    };

    loadGoogleClientId();

    return () => {
      isMounted = false;
    };
  }, [backendUrl, envGoogleClientId]);

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: userToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeLogin = async (userToken, message) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
    await getUserCart(userToken);
    notify(message);
    navigate("/");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name: username,
          email,
          password,
        });

        if (response.data.success) {
          await completeLogin(response.data.token, "Sign up successful! Welcome to RAQS.");
        } else {
          notify(response.data.message || "Signup failed. Please try again.");
        }

        return;
      }

      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        await completeLogin(response.data.token, "Login successful! Welcome back.");
      } else {
        notify(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      notify(
        error.response?.data?.message ||
          (currentState === "Sign Up"
            ? "Signup failed. Please try again."
            : "Invalid email or password.")
      );
    }
  };

  const handleGoogleCredential = async (credential) => {
    if (!googleClientId) {
      notify(
        "Google sign-in is not ready yet. If you already added GOOGLE_CLIENT_ID to backend/.env, restart the backend server and refresh this page."
      );
      return;
    }

    setIsGoogleLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/google", {
        credential,
        clientId: googleClientId,
      });

      if (response.data.success) {
        await completeLogin(
          response.data.token,
          response.data.message || "Google sign-in successful!"
        );
      } else {
        notify(response.data.message || "Google sign-in failed.");
      }
    } catch (error) {
      notify(error.response?.data?.message || "Google sign-in failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      autoComplete="on"
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          autoComplete="name"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      )}

      <input
        type="email"
        name="email"
        autoComplete="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={currentState === "Login" ? "password" : "signup-password"}
          autoComplete={currentState === "Login" ? "current-password" : "new-password"}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      {currentState === "Login" ? (
        <div className="w-full mt-[-4px]">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600"
          >
            Forgot your password?
          </button>

          <div className="mt-3">
            <GoogleSignInButton
              clientId={googleClientId}
              visible
              disabled={isGoogleLoading}
              isConfigLoading={isGoogleConfigLoading}
              onCredential={handleGoogleCredential}
              onError={(message) => notify(message)}
            />
          </div>

          <div className="w-full text-sm text-right mt-3">
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create a new account
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end w-full text-sm mt-[-8px]">
          <button
            type="button"
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </button>
        </div>
      )}

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
