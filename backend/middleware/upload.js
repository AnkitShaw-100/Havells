import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

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
    console.log("📁 File received:", file.originalname, file.mimetype);
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed"));
    }
  },
});

// Middleware to log upload errors
const uploadWithErrorHandler = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error("❌ Upload error:", err.message);
        return res.status(400).json({ message: "File upload failed: " + err.message });
      }
      console.log("✅ File uploaded successfully:", req.file ? req.file.filename : "No file");
      next();
    });
  };
};

export default upload;
export { uploadWithErrorHandler };
