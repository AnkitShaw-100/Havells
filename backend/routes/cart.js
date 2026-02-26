import express from "express";
import { body } from "express-validator";
import { protectUser } from "../middleware/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// All routes are protected - user only
router.post(
  "/",
  protectUser,
  [
    body("fishId").notEmpty().withMessage("Fish ID is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  addToCart
);

router.get("/", protectUser, getCart);

router.delete("/:fishId", protectUser, removeFromCart);

router.put(
  "/:fishId",
  protectUser,
  [
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  updateCartItem
);

router.delete("/", protectUser, clearCart);

export default router;
