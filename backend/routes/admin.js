import express from "express";
import { body } from "express-validator";
import { protectAdmin, checkVerified } from "../middleware/auth.js";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAdminDashboard,
} from "../controllers/adminController.js";

const router = express.Router();

// @route   POST /api/admin/register
// @desc    Register a new admin (fish seller)
// @access  Public
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerAdmin
);

// @route   POST /api/admin/login
// @desc    Login admin
// @access  Public
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginAdmin
);

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get("/profile", protectAdmin, getAdminProfile);

// @route   PUT /api/admin/profile
// @desc    Update admin profile
// @access  Private
router.put("/profile", protectAdmin, updateAdminProfile);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data (only for verified admins)
// @access  Private (Verified Admin only)
router.get("/dashboard", protectAdmin, checkVerified, getAdminDashboard);

export default router;
