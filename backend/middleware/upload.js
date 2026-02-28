import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

console.log("☁️  Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅" : "❌ Missing",
  api_key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌ Missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌ Missing",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "aqua-delight",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    resource_type: "auto",
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    console.log("📁 File received in filter:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      console.log("✅ File passed filter");
      cb(null, true);
    } else {
      console.log("❌ File rejected: invalid mime type");
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed"));
    }
  },
});

// Wrap upload to add logging
const uploadWithLogging = (fieldName = "image") => {
  return (req, res, next) => {
    console.log(`\n📤 Upload middleware triggered for field: ${fieldName}`);
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error("❌ Upload middleware error:", err.message);
        return res.status(400).json({ 
          message: "File upload failed: " + err.message,
          error: err.message
        });
      }
      
      if (req.file) {
        console.log("✅ File uploaded to Cloudinary:");
        console.log("   - secure_url:", req.file.secure_url);
        console.log("   - url:", req.file.url);
        console.log("   - public_id:", req.file.public_id);
        console.log("   - Full file object:", JSON.stringify(req.file, null, 2));
        req.file = req.file.path;
      } else {
        console.log("ℹ️  No file in req.file (optional upload)");
      }
      
      next();
    });
  };
};

export default upload;
export { uploadWithLogging };
