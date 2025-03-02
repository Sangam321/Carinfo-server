import express from "express";
import { createCheckoutSession, getAllPurchasedCar, getCarDetailWithPurchaseStatus, stripeWebhook } from "../controllers/carPurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhook);
router.route("/car/:carId/detail-with-status").get(isAuthenticated, getCarDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCar);

export default router;