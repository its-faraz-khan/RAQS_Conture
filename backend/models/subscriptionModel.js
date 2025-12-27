import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Number, default: Date.now() },
});

const subscriptionModel = mongoose.models.subscription || mongoose.model("subscription", subscriptionSchema);
export default subscriptionModel;