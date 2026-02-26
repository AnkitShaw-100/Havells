import express from "express";
import { body } from "express-validator";
import { protectUser, protectAdmin } from "../middleware/auth.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// User routes
router.post(
  "/",
  protectUser,
  [
    body("deliveryAddress")
      .notEmpty()
      .withMessage("Delivery address is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  ],
  createOrder
);

router.get("/", protectUser, getUserOrders);

router.get("/:id", protectUser, getOrderById);

router.put("/:id/payment", protectUser, updatePaymentStatus);

router.delete("/:id", protectUser, cancelOrder);

// Seller/Admin routes
router.get("/seller/items", protectAdmin, getSellerOrders);

router.put(
  "/:id/status",
  protectAdmin,
  [
    body("status")
      .isIn([
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ])
      .withMessage("Invalid status"),
  ],
  updateOrderStatus
);

export default router;
