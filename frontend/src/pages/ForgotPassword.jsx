import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/send-otp", {
        email,
      });

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success("OTP verified!");
        setStep(3);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        backendUrl + "/api/user/reset-password",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        toast.success("Password reset successfully! Please login.");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Step 1: Email */}
      {step === 1 && (
        <form onSubmit={sendOTP} className="w-full">
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we'll send you an OTP to reset your
            password.
          </p>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800 mb-4"
            placeholder="hello@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-8 py-2 font-light text-white bg-black ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <p
            onClick={() => navigate("/login")}
            className="mt-4 text-sm text-center cursor-pointer text-blue-600"
          >
            Back to Login
          </p>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <form onSubmit={verifyOTP} className="w-full">
          <p className="text-sm text-gray-600 mb-4">
            Enter the 6-digit OTP sent to {email}
          </p>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 mb-4 text-center text-2xl tracking-widest"
            placeholder="000000"
            required
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-8 py-2 font-light text-white bg-black ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <p
            onClick={() => setStep(1)}
            className="mt-4 text-sm text-center cursor-pointer text-blue-600"
          >
            Resend OTP
          </p>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={resetPassword} className="w-full">
          <p className="text-sm text-gray-600 mb-4">
            Enter your new password
          </p>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 mb-3"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 mb-4"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-8 py-2 font-light text-white bg-black ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;