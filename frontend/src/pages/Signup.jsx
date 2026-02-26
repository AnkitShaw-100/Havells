import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">

      {/* <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      /> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl p-10 shadow-xl border border-slate-100"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-slate-500 text-center mb-8">
          Join Aqua Delight today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-400 outline-none disabled:bg-slate-50"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-400 outline-none disabled:bg-slate-50"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Password (minimum 6 characters)"
              required
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-400 outline-none disabled:bg-slate-50"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Account Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={form.role === "buyer"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-slate-700">Buyer</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={form.role === "seller"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-slate-700">Seller</span>
              </label>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </motion.button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 font-semibold hover:text-sky-700 transition-colors">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;