import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Package,
  Plus,
  Trash2,
  Edit2,
  Eye,
  TrendingUp,
  Grid,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SellerDashboard = () => {
  const { user, token, isSeller } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isSeller) {
      navigate("/");
    }
  }, [isSeller, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, analyticsRes] = await Promise.all([
          fetch(`${API_URL}/fish/seller/items`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/fish/seller/analytics`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (productsRes.ok) {
          const data = await productsRes.json();
          setProducts(data.fish || []);
        }

        if (analyticsRes.ok) {
          const data = await analyticsRes.json();
          setAnalytics(data);
        }
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/fish/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== productId));
        setShowDeleteConfirm(null);
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-md border border-slate-100 p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-slate-600">Welcome back, {user?.name}</p>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {[
            { id: "overview", label: "Overview", icon: Grid },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "products", label: "My Products", icon: Package },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-sky-600 border-b-2 border-sky-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate("/seller/list-product")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
                List New Product
              </motion.button>
            </div>

            {/* Key Metrics */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={Package}
                  label="Total Products"
                  value={analytics.totalProducts}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={BarChart3}
                  label="Total Quantity"
                  value={analytics.totalQuantity}
                  color="bg-green-500"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Average Price"
                  value={`$${analytics.avgPrice}`}
                  color="bg-orange-500"
                />
                <StatCard
                  icon={Eye}
                  label="Categories"
                  value={analytics.productsByCategory.length}
                  color="bg-purple-500"
                />
              </div>
            )}

            {/* Quick Stats */}
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* By Category */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Products by Category
                  </h3>
                  <div className="space-y-3">
                    {analytics.productsByCategory.map((cat) => (
                      <div
                        key={cat._id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-slate-600 font-medium">
                          {cat._id || "Uncategorized"}
                        </span>
                        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-bold">
                          {cat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* By Freshness */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Products by Freshness
                  </h3>
                  <div className="space-y-3">
                    {analytics.productsByFreshness.map((fresh) => (
                      <div
                        key={fresh._id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-slate-600 font-medium">
                          {fresh._id || "Unknown"}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                          {fresh.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {analytics ? (
              <>
                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
                    <p className="text-slate-600 text-sm font-medium">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {analytics.totalProducts}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Currently listed
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
                    <p className="text-slate-600 text-sm font-medium">
                      Total Inventory
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {analytics.totalQuantity}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Units in stock</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
                    <p className="text-slate-600 text-sm font-medium">
                      Average Price
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      ${analytics.avgPrice}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Per product</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
                    <p className="text-slate-600 text-sm font-medium">
                      Categories
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {analytics.productsByCategory.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Types listed</p>
                  </div>
                </div>

                {/* Category Analysis */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Category Distribution
                  </h3>
                  <div className="space-y-4">
                    {analytics.productsByCategory.map((cat) => {
                      const percentage = (
                        (cat.count / analytics.totalProducts) *
                        100
                      ).toFixed(1);
                      return (
                        <div key={cat._id}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-slate-700">
                              {cat._id || "Uncategorized"}
                            </span>
                            <span className="text-sm text-slate-600">
                              {cat.count} products ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-sky-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Freshness Analysis */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Freshness Distribution
                  </h3>
                  <div className="space-y-4">
                    {analytics.productsByFreshness.map((fresh) => {
                      const percentage = (
                        (fresh.count / analytics.totalProducts) *
                        100
                      ).toFixed(1);
                      return (
                        <div key={fresh._id}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-slate-700">
                              {fresh._id || "Unknown"}
                            </span>
                            <span className="text-sm text-slate-600">
                              {fresh.count} products ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-slate-600">
                No analytics data available yet
              </p>
            )}
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {products.length > 0 ? (
              <div className="grid gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      {product.image && (
                        <div className="md:col-span-1">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className={product.image ? "md:col-span-3" : "md:col-span-4"}>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-slate-600 text-sm mb-3">
                          {product.description.substring(0, 150)}...
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-lg font-semibold">
                            {product.category}
                          </span>
                          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-semibold">
                            ${product.price}
                          </span>
                          <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg font-semibold">
                            {product.quantity} {product.unit}
                          </span>
                          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-semibold">
                            {product.freshness}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 border-t border-slate-200 pt-4 mt-4">
                      <motion.button
                        onClick={() => navigate(`/explore?id=${product._id}`)}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 flex-1 px-4 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg font-semibold transition"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          navigate(`/seller/edit-product/${product._id}`)
                        }
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 flex-1 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => setShowDeleteConfirm(product._id)}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 flex-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 text-lg mb-6">
                  You haven't listed any products yet
                </p>
                <motion.button
                  onClick={() => navigate("/seller/list-product")}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  <Plus className="w-5 h-5" />
                  List Your First Product
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm mx-4"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Product?
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <motion.button
                onClick={() => handleDelete(showDeleteConfirm)}
                whileHover={{ scale: 1.05 }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Delete
              </motion.button>
              <motion.button
                onClick={() => setShowDeleteConfirm(null)}
                whileHover={{ scale: 1.05 }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 rounded-lg transition"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
