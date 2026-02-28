import express from "express";
import { body } from "express-validator";
import { protectUser, checkSeller } from "../middleware/auth.js";
import upload, { uploadWithLogging } from "../middleware/upload.js";
import {
  addFish,
  getAllFish,
  getSellerFish,
  getFishById,
  updateFish,
  deleteFish,
  searchFish,
  getSellerAnalytics,
  testMLAnalysis,
} from "../controllers/fishController.js";

const router = express.Router();

// 🧪 TEST ENDPOINT - Verify image upload and ML analysis
router.post("/test/upload", uploadWithLogging("image"), (req, res) => {
  console.log("\n🧪 TEST UPLOAD ENDPOINT HIT");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file ? "✅ YES" : "❌ NO");
  
  if (req.file) {
    console.log("File details:", {
      originalname: req.file.originalname,
      secure_url: req.file.secure_url,
      url: req.file.url,
      public_id: req.file.public_id,
    });
    
    return res.status(200).json({
      message: "✅ TEST PASSED: Image uploaded successfully",
      file: {
        filename: req.file.originalname,
        size: req.file.size,
        cloudinaryUrl: req.file.secure_url || req.file.url,
        publicId: req.file.public_id,
      },
    });
  } else {
    return res.status(400).json({
      message: "❌ TEST FAILED: No file received",
      hint: "Check that your form has enctype='multipart/form-data' and the file input name is 'image'",
    });
  }
});

// 🧪 TEST ENDPOINT - Test ML analysis on image URL
router.post("/test/ml-analysis", testMLAnalysis);

// Public routes
router.get("/", getAllFish);
router.get("/search", searchFish);
router.get("/:id", getFishById);

// Protected routes (Fish sellers only)
router.post(
  "/",
  protectUser,
  checkSeller,
  uploadWithLogging("image"),
  [
    body("name").trim().notEmpty().withMessage("Fish name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("category")
      .isIn(["Fresh Water", "Salt Water", "Shell Fish", "Other"])
      .withMessage("Invalid category"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("unit")
      .isIn(["kg", "lb", "pieces", "dozen"])
      .withMessage("Invalid unit"),
    body("freshness")
      .isIn([
        "Super Fresh (Today)",
        "Fresh (1-2 Days)",
        "Good (2-3 Days)",
        "Average (3-4 Days)",
      ])
      .withMessage("Invalid freshness level"),
    body("harvestDate").isISO8601().withMessage("Invalid harvest date format"),
  ],
  addFish
);

router.get("/seller/items", protectUser, checkSeller, getSellerFish);

router.get("/seller/analytics", protectUser, checkSeller, getSellerAnalytics);

router.put(
  "/:id",
  protectUser,
  checkSeller,
  uploadWithLogging("image"),
  [
    body("name").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("category")
      .optional()
      .isIn(["Fresh Water", "Salt Water", "Shell Fish", "Other"]),
    body("price").optional().isFloat({ min: 0 }),
    body("quantity").optional().isInt({ min: 0 }),
    body("unit").optional().isIn(["kg", "lb", "pieces", "dozen"]),
    body("freshness")
      .optional()
      .isIn([
        "Super Fresh (Today)",
        "Fresh (1-2 Days)",
        "Good (2-3 Days)",
        "Average (3-4 Days)",
      ]),
    body("harvestDate").optional().isISO8601(),
  ],
  updateFish
);

router.delete("/:id", protectUser, checkSeller, deleteFish);

export default router;
