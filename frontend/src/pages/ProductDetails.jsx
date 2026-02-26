import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Leaf,
  Truck,
  Shield,
  Clock,
  MapPin,
  User,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/fish/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.fish || data);
        setError("");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-8 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
              <div className="h-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-12 bg-slate-200 rounded w-40 animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <ArrowLeft className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Product Not Found
          </h1>
          <p className="text-slate-500 mb-8">{error || "This product doesn't exist"}</p>
          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 flex items-center justify-center h-96 sm:h-[500px]"
          >
            {product.image && product.image !== "https://via.placeholder.com/300x200?text=Fish" ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-slate-400 text-center">
                <div className="w-32 h-32 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-16 h-16 text-slate-300" />
                </div>
                <p className="font-medium">No image available</p>
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold text-slate-900">
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite
                        ? "text-red-500 fill-red-500"
                        : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">4.8 (240 reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{product.origin || "Local origin"}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-200 p-6">
              <p className="text-slate-600 text-sm mb-2">Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-sky-600">
                  ${product.price}
                </span>
                <span className="text-slate-500 text-lg">/{product.unit}</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Category
                </p>
                <p className="font-semibold text-slate-900">{product.category}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Freshness
                </p>
                <p className="font-semibold text-slate-900">{product.freshness}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Available
                </p>
                <p className="font-semibold text-slate-900">
                  {product.quantity} {product.unit}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Harvest Date
                </p>
                <p className="font-semibold text-slate-900">
                  {new Date(product.harvestDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                About This Product
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description ||
                  "High-quality fresh fish sourced directly from certified suppliers. Perfect for family meals and special occasions."}
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Fast Delivery</p>
                  <p className="text-slate-500 text-xs">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Quality Assured</p>
                  <p className="text-slate-500 text-xs">100% fresh guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Eco-Friendly</p>
                  <p className="text-slate-500 text-xs">Sustainable sourcing</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Fresh Catch</p>
                  <p className="text-slate-500 text-xs">Recently harvested</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-white rounded transition"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-white rounded transition"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  added
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-sky-500 hover:bg-sky-600"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </div>

            {/* Share */}
            <button className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share This Product
            </button>
          </motion.div>
        </div>

        {/* Seller Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 border-t border-slate-200 pt-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            About the Seller
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Premium Fish Supplier
                </h4>
                <p className="text-slate-500 text-sm">Verified Seller</p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600">4.9 seller rating</p>
              </div>
            </div>

            <p className="text-slate-600 mb-6">
              We are committed to delivering the freshest, highest-quality fish
              to your doorstep. All our products are sourced responsibly from
              certified suppliers and meet strict quality standards.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-sky-600 mb-1">500+</p>
                <p className="text-sm text-slate-600">Orders Delivered</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-emerald-600 mb-1">99%</p>
                <p className="text-sm text-slate-600">Positive Reviews</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600 mb-1">2 yrs</p>
                <p className="text-sm text-slate-600">On Platform</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
