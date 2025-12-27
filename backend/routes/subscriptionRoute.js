import express from "express";
import { subscribe, getAllSubscribers } from "../controllers/subscriptionController.js";
import adminAuth from "../middleware/adminAuth.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/subscribe", subscribe);
subscriptionRouter.get("/list", adminAuth, getAllSubscribers);

export default subscriptionRouter;