import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otp: { type: String, default: null },
  expiresAt: { type: Date, required: true, expires: 0 },
  resetToken: { type: String, default: null },
  resetTokenExpiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);

export default otpModel;
