import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const UserDashboard = () => {
  const { user, token, updateProfile, isBuyer } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || {},
  });

  // Redirect if not a buyer
  useEffect(() => {
    if (!isBuyer) {
      navigate("/");
    }
  }, [isBuyer, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address_")) {
      const field = name.replace("address_", "");
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
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
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      await updateProfile(formData);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            My Account
          </h1>
          <p className="text-slate-600">Manage your profile and preferences</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center text-slate-900 mb-1">
                {user?.name || "User"}
              </h2>
              <p className="text-center text-sky-600 font-semibold mb-4 capitalize">
                {user?.role}
              </p>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600 text-center">
                  {user?.email}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Profile Details
                </h3>
                {!isEditing && (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg font-semibold transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                )}
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                  />
                </div>

                {/* Address Section */}
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Address
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Street */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Street
                      </label>
                      <input
                        type="text"
                        name="address_street"
                        value={formData.address?.street || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Street address"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="address_city"
                        value={formData.address?.city || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="City"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="address_state"
                        value={formData.address?.state || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="State"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                      />
                    </div>

                    {/* Zip Code */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="address_zipCode"
                        value={formData.address?.zipCode || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Zip code"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="address_country"
                        value={formData.address?.country || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Country"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-6 border-t border-slate-200">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold py-3 rounded-lg transition disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-lg transition"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
