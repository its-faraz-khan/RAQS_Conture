import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const RESET_TOKEN_EXPIRY_MS = 10 * 60 * 1000;
// OAuth2Client is instantiated lazily inside googleLogin to ensure
// process.env.GOOGLE_CLIENT_ID is available after dotenv has loaded.

const createTransporter = () => {
  if (!process.env.ADMIN_EMAIL || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email configuration is missing");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const shouldUseLocalOtpFallback = () => process.env.NODE_ENV !== "production";

const logLocalOtp = (email, otp) => {
  console.log(`[Password Reset OTP] ${email}: ${otp}`);
};

const getGoogleClientConfig = async (req, res) => {
  try {
    res.json({
      success: true,
      clientId: process.env.GOOGLE_CLIENT_ID || "",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to load Google sign-in configuration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email?.trim();

    const user = await userModel.findOne({ email: trimmedEmail });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trimmedEmail = email?.trim();

    const exists = await userModel.findOne({ email: trimmedEmail });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(trimmedEmail || "")) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 characters)",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email: trimmedEmail,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential, clientId } = req.body;
    const googleClientId = process.env.GOOGLE_CLIENT_ID || clientId?.trim();

    if (!credential) {
      return res.json({
        success: false,
        message: "Google credential is required",
      });
    }

    if (!googleClientId) {
      return res.json({
        success: false,
        message: "Google sign-in is not configured yet",
      });
    }

    // Create client with the actual client ID so verifyIdToken validates audience correctly
    const googleClient = new OAuth2Client(googleClientId);

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub) {
      return res.json({
        success: false,
        message: "Google account data is incomplete",
      });
    }

    if (!payload.email_verified) {
      return res.json({
        success: false,
        message: "Google email is not verified",
      });
    }

    const trimmedEmail = payload.email.trim();
    let user = await userModel.findOne({ email: trimmedEmail });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), salt);

      user = await userModel.create({
        name: payload.name || trimmedEmail.split("@")[0],
        email: trimmedEmail,
        password: hashedPassword,
        googleId: payload.sub,
        picture: payload.picture || "",
        authProvider: "google",
      });
    } else {
      if (user.googleId && user.googleId !== payload.sub) {
        return res.json({
          success: false,
          message: "This email is already linked to a different Google account",
        });
      }

      user = await userModel.findByIdAndUpdate(
        user._id,
        {
          googleId: payload.sub,
          picture: payload.picture || user.picture,
          authProvider: "google",
          name: user.name || payload.name || trimmedEmail.split("@")[0],
        },
        { new: true }
      );
    }

    const token = createToken(user._id);
    res.json({ success: true, token, message: "Google sign-in successful!" });
  } catch (error) {
    console.log("Google sign-in error:", error);
    res.json({
      success: false,
      message: "Google sign-in failed. Please try again.",
    });
  }
};

const sendPasswordResetOTP = async (req, res) => {
  try {
    const trimmedEmail = req.body.email?.trim();

    if (!validator.isEmail(trimmedEmail || "")) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const user = await userModel.findOne({ email: trimmedEmail });
    if (!user) {
      return res.json({
        success: false,
        message: "No account exists with this email",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    await otpModel.deleteMany({ email: trimmedEmail });

    await otpModel.create({
      email: trimmedEmail,
      otp,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
    });

    if (shouldUseLocalOtpFallback()) {
      logLocalOtp(trimmedEmail, otp);
      return res.json({
        success: true,
        message: "OTP generated. Check the backend terminal in local development.",
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: trimmedEmail,
      subject: "Password Reset OTP - RAQS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333; margin: 0;">RAQS</h1>
          </div>
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666; line-height: 1.6;">
            You requested to reset your password. Use the OTP below to continue:
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <h1 style="color: #000; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; line-height: 1.6;">
            This OTP is valid for <strong>10 minutes</strong>.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            If you didn't request this, please ignore this email. Your password won't be changed.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    const trimmedEmail = req.body.email?.trim();
    if (trimmedEmail) {
      await otpModel.deleteMany({ email: trimmedEmail });
    }

    console.log("Error sending OTP:", error);

    if (error.code === "EAUTH" || error.message === "Email configuration is missing") {
      return res.json({
        success: false,
        message: "Email configuration error. Please contact administrator.",
      });
    }

    res.json({
      success: false,
      message: "Failed to send OTP. Please try again.",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const trimmedEmail = email?.trim();
    const trimmedOtp = otp?.trim();

    if (!trimmedEmail || !trimmedOtp) {
      return res.json({ success: false, message: "Email and OTP are required" });
    }

    const otpRecord = await otpModel.findOne({
      email: trimmedEmail,
      otp: trimmedOtp,
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      await otpModel.deleteMany({ email: trimmedEmail });
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

    otpRecord.otp = null;
    otpRecord.resetToken = resetToken;
    otpRecord.resetTokenExpiresAt = resetTokenExpiresAt;
    otpRecord.expiresAt = resetTokenExpiresAt;
    await otpRecord.save();

    res.json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, resetToken } = req.body;
    const trimmedEmail = email?.trim();

    if (!trimmedEmail || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (!resetToken) {
      return res.json({
        success: false,
        message: "Reset session expired. Please verify your OTP again.",
      });
    }

    const otpRecord = await otpModel.findOne({
      email: trimmedEmail,
      resetToken,
    });

    if (
      !otpRecord ||
      !otpRecord.resetTokenExpiresAt ||
      otpRecord.resetTokenExpiresAt < new Date()
    ) {
      await otpModel.deleteMany({ email: trimmedEmail });
      return res.json({
        success: false,
        message: "Reset session expired. Please request a new OTP.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userModel.findOneAndUpdate(
      { email: trimmedEmail },
      { password: hashedPassword }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    await otpModel.deleteMany({ email: trimmedEmail });

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  getGoogleClientConfig,
  loginUser, 
  registerUser, 
  adminLogin, 
  googleLogin,
  sendPasswordResetOTP, 
  verifyOTP, 
  resetPassword 
};
