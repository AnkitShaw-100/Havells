import express from "express";
import { body } from "express-validator";
import { protectUser } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["buyer", "seller"])
      .withMessage("Role must be either 'buyer' or 'seller'"),
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", protectUser, getUserProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protectUser, updateUserProfile);

export default router;
