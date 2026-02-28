import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProductListing = () => {
  const { isSeller, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "fish 22",
    description: "fqefqf",
    category: "Fresh Water",
    price: "54",
    quantity: "78",
    unit: "kg",
    freshness: "Super Fresh (Today)",
    harvestDate: "",
    image: null,
    origin: "kolkhuyu",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Fresh Water", "Salt Water", "Shell Fish", "Other"];
  const freshness = [
    "Super Fresh (Today)",
    "Fresh (1-2 Days)",
    "Good (2-3 Days)",
    "Average (3-4 Days)",
  ];
  const units = ["kg", "lb", "pieces", "dozen"];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
      
      // Create image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", parseFloat(form.price));
      formData.append("quantity", parseInt(form.quantity));
      formData.append("unit", form.unit);
      formData.append("freshness", form.freshness);
      formData.append("harvestDate", new Date(form.harvestDate).toISOString());
      formData.append("origin", form.origin);
      
      // Add image file if selected
      if (form.image) {
        console.log("📁 Image file selected:", form.image.name, form.image.type, form.image.size);
        formData.append("image", form.image);
      } else {
        console.log("⚠️  No image file selected");
      }

      console.log("📤 Submitting form with fields:", {
        name: form.name,
        hasImage: !!form.image,
        imageName: form.image?.name
      });

      const response = await fetch(`${API_URL}/fish`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("📥 Response from server:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to list product");
      }

      console.log("✅ Product created successfully:", data.fish);
      setSuccess("Product listed successfully!");
      // setForm({
      //   name: "",
      //   description: "",
      //   category: "Fresh Water",
      //   price: "",
      //   quantity: "",
      //   unit: "kg",
      //   freshness: "Super Fresh (Today)",
      //   harvestDate: "",
      //   image: null,
      //   origin: "",
      // });
      setImagePreview(null);

      // setTimeout(() => {
      //   navigate("/seller/dashboard");
      // }, 2000);
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setError(err.message || "Failed to list product");
    } finally {
      setLoading(false);
    }
  };

  if (!isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-slate-600 mb-6">Only sellers can list products</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">List Your Fish</h1>
          <p className="text-slate-600 mb-8">
            Add your fish product to our marketplace
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="e.g., Fresh Salmon"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="0"
                  min="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                >
                  {units.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Freshness */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Freshness Level *
                </label>
                <select
                  name="freshness"
                  value={form.freshness}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                >
                  {freshness.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  name="harvestDate"
                  value={form.harvestDate}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={form.origin}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="e.g., Norwegian Coast"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Describe your fish product..."
                rows="4"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  disabled={loading}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supported: JPG, PNG, GIF, WebP (Max 10MB)
                </p>
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Preview:</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setForm((prev) => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold py-3 rounded-lg transition disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Listing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  List Product
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductListing;
