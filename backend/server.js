import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Configure env
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import fishRoutes from "./routes/fish.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/fish", fishRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Aqua Delight API is running!",
    endpoints: {
      users: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/profile (Protected)",
        updateProfile: "PUT /api/auth/profile (Protected)",
      },
      admins: {
        register: "POST /api/admin/register",
        login: "POST /api/admin/login",
        profile: "GET /api/admin/profile (Protected)",
        updateProfile: "PUT /api/admin/profile (Protected)",
        dashboard: "GET /api/admin/dashboard (Protected & Verified)",
      },
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
