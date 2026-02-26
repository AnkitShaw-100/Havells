import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

// Protect routes for users
const protectUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if it's a user token
      if (decoded.type !== "user") {
        return res.status(401).json({ message: "Not authorized as user" });
      }

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user || !req.user.isActive) {
        return res.status(401).json({ message: "User not found or inactive" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Protect routes for admins
const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if it's an admin token
      if (decoded.type !== "admin") {
        return res.status(401).json({ message: "Not authorized as admin" });
      }

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin || !req.admin.isActive) {
        return res.status(401).json({ message: "Admin not found or inactive" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Check if admin is verified
const checkVerified = (req, res, next) => {
  if (!req.admin.isVerified) {
    return res.status(403).json({
      message:
        "Your account is not verified yet. Please wait for admin approval.",
    });
  }
  next();
};

// Middleware to check if user is a seller
const checkSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      message: "Only sellers can access this resource",
    });
  }
  next();
};

// Middleware to check if user is a buyer
const checkBuyer = (req, res, next) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({
      message: "Only buyers can access this resource",
    });
  }
  next();
};

export { protectUser, protectAdmin, checkVerified, checkSeller, checkBuyer };
