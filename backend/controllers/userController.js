// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user._id);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }
//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong password" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({ name, email, password: hashedPassword });
//     const user = await newUser.save();
//     const token = createToken(user._id);

//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { loginUser, registerUser, adminLogin };





import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import nodemailer from "nodemailer";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

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

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
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
      email,
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

// Route for admin login
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

// Send OTP for password reset - FIXED WITH EMAIL CHECK
const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // FIXED: Check if user exists BEFORE sending OTP
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ 
        success: false, 
        message: "No account exists with this email" 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTPs for this email (prevent spam)
    await otpModel.deleteMany({ email });

    // Save new OTP to database (expires in 10 minutes)
    await otpModel.create({ email, otp });

    console.log(`OTP generated for ${email}: ${otp}`); // For debugging

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Password Reset OTP - ClassyShop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333; margin: 0;">ClassyShop</h1>
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

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`OTP email sent successfully to ${email}`); // For debugging

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log("Error sending OTP:", error);
    
    // More detailed error message
    if (error.code === 'EAUTH') {
      return res.json({ 
        success: false, 
        message: "Email configuration error. Please contact administrator." 
      });
    }
    
    res.json({ 
      success: false, 
      message: "Failed to send OTP. Please try again." 
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await otpModel.findOne({ email, otp });

    if (!otpRecord) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Delete OTP after successful verification (one-time use)
    await otpModel.deleteOne({ email, otp });

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  loginUser, 
  registerUser, 
  adminLogin, 
  sendPasswordResetOTP, 
  verifyOTP, 
  resetPassword 
};