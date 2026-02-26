import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const generateToken = (id) => {
  return jwt.sign({ id, type: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      email,
      password,
    });

    if (admin) {
      console.log(`Admin registered: ${admin.email}`);
      return res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        businessName: admin.businessName,
        isVerified: admin.isVerified,
        token: generateToken(admin._id),
        message: "Registration successful. Please wait for admin approval.",
      });
    }

    return res.status(400).json({ message: "Invalid admin data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!admin.isActive) {
      return res.status(401).json({ message: "Account is deactivated" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`Admin logged in: ${admin.email}`);
    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      businessName: admin.businessName,
      isVerified: admin.isVerified,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      businessName: admin.businessName,
      businessAddress: admin.businessAddress,
      businessLicense: admin.businessLicense,
      isVerified: admin.isVerified,
      role: admin.role,
      createdAt: admin.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = req.body.name || admin.name;
    admin.phone = req.body.phone || admin.phone;
    admin.businessName = req.body.businessName || admin.businessName;
    admin.businessAddress = req.body.businessAddress || admin.businessAddress;
    admin.businessLicense = req.body.businessLicense || admin.businessLicense;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    return res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
      businessName: updatedAdmin.businessName,
      businessAddress: updatedAdmin.businessAddress,
      businessLicense: updatedAdmin.businessLicense,
      isVerified: updatedAdmin.isVerified,
      role: updatedAdmin.role,
      token: generateToken(updatedAdmin._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    return res.json({
      message: "Welcome to admin dashboard",
      admin: {
        name: req.admin.name,
        businessName: req.admin.businessName,
        isVerified: req.admin.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
