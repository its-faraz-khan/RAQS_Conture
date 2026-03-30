// import express from "express";
// import {
//   loginUser,
//   registerUser,
//   loginAdmin,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/admin", loginAdmin);

// export default userRouter;

import express from "express";
import {
  getGoogleClientConfig,
  loginUser,
  registerUser,
  adminLogin,
  googleLogin,
  sendPasswordResetOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/google-config", getGoogleClientConfig);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/google", googleLogin);
userRouter.post("/send-reset-otp", sendPasswordResetOTP);
userRouter.post("/verify-reset-otp", verifyOTP);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
