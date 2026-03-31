import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notify from "../utils/notify";
import { ShopContext } from "../context/ShopContext";

const stepDetails = {
  email: {
    title: "Forgot Password",
    description: "Enter your account email and we will send you a 6-digit OTP.",
    step: "Step 1 of 3",
    buttonLabel: "Send OTP",
  },
  verify: {
    title: "Verify OTP",
    description: "Enter the OTP sent to your email to continue.",
    step: "Step 2 of 3",
    buttonLabel: "Verify OTP",
  },
  reset: {
    title: "Set New Password",
    description: "Choose a new password for your account.",
    step: "Step 3 of 3",
    buttonLabel: "Reset Password",
  },
};

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token } = useContext(ShopContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const requestOtp = async (showResendMessage = false) => {
    if (!email.trim()) {
      notify("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/send-reset-otp", {
        email: email.trim(),
      });

      if (response.data.success) {
        setOtp("");
        setResetToken("");
        setStep("verify");
        notify(
          showResendMessage ? "A fresh OTP has been sent to your email." : response.data.message
        );
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      notify(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      notify("Please enter the OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/verify-reset-otp", {
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.data.success) {
        setResetToken(response.data.resetToken);
        setPassword("");
        setConfirmPassword("");
        setStep("reset");
        notify(response.data.message);
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      notify(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const submitNewPassword = async () => {
    if (password.length < 8) {
      notify("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      notify("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/user/reset-password", {
        email: email.trim(),
        password,
        resetToken,
      });

      if (response.data.success) {
        notify(response.data.message);
        navigate("/login");
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      notify(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (step === "email") {
      await requestOtp();
      return;
    }

    if (step === "verify") {
      await verifyOtp();
      return;
    }

    await submitNewPassword();
  };

  const detail = stepDetails[step];

  return (
    <form
      onSubmit={onSubmitHandler}
      autoComplete="off"
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="w-full">
        <div className="inline-flex items-center gap-2 mt-10 mb-2">
          <p className="text-3xl prata-regular">{detail.title}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <p className="text-sm text-gray-500">{detail.step}</p>
        <p className="mt-2 text-sm text-gray-600">{detail.description}</p>
        <p className="mt-2 text-xs text-gray-500">
          Local development note: if email delivery is not configured, the OTP is printed in the backend terminal.
        </p>
      </div>

      <input
        type="email"
        name="email"
        autoComplete="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={step !== "email" || loading}
        required
      />

      {step === "verify" && (
        <input
          type="text"
          name="otp"
          autoComplete="one-time-code"
          className="w-full px-3 py-2 tracking-[0.35em] text-center border border-gray-800"
          placeholder="123456"
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
          maxLength={6}
          required
        />
      )}

      {step === "reset" && (
        <>
          <input
            type="password"
            name="new-password"
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            type="password"
            name="confirm-new-password"
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-8 py-2 mt-2 font-light text-white bg-black ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Please wait..." : detail.buttonLabel}
      </button>

      <div className="flex justify-between w-full text-sm mt-[-4px]">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-600"
        >
          Back to login
        </button>

        {step === "verify" && (
          <button
            type="button"
            onClick={() => requestOtp(true)}
            disabled={loading}
            className={`text-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Resend OTP
          </button>
        )}

        {step === "reset" && (
          <button
            type="button"
            onClick={() => {
              setStep("verify");
              setPassword("");
              setConfirmPassword("");
            }}
            className="text-blue-600"
          >
            Back to OTP
          </button>
        )}
      </div>
    </form>
  );
};

export default ForgotPassword;
