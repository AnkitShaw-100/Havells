import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Leaf,
  Truck,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user, token } = useAuth();

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.fish.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const deliveryFee = items.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-sky-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-slate-500 mb-8">
              Start shopping to add fresh fish to your cart
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-lg"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-slate-500">
              You have{" "}
              <span className="font-semibold text-slate-700">{items.length}</span> item
              {items.length !== 1 ? "s" : ""} in your cart
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.fish.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-sky-200 hover:shadow-lg p-5 transition-all duration-300"
                  >
                    <div className="flex gap-5">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        {item.fish.image &&
                        item.fish.image !==
                          "https://via.placeholder.com/300x200?text=Fish" ? (
                          <img
                            src={item.fish.image}
                            alt={item.fish.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs text-center px-2">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {item.fish.name}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {item.fish.origin || "Local"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">
                              ${item.fish.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-400">
                              /{item.fish.unit}
                            </p>
                          </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.fish.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 hover:bg-white rounded transition-colors"
                            >
                              <Minus className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.fish.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 hover:bg-white rounded transition-colors"
                            >
                              <Plus className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-slate-400 mb-1">
                              Subtotal
                            </p>
                            <p className="text-lg font-bold text-sky-600">
                              $
                              {(
                                item.fish.price *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.fish.id)}
                            className="p-2.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Continue Shopping */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate("/explore")}
              className="mt-8 w-full py-3 px-4 rounded-xl border-2 border-sky-200 text-sky-600 font-semibold hover:bg-sky-50 transition-all duration-300"
            >
              Continue Shopping
            </motion.button>
          </div>

          {/* Bill Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Summary Header */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-6">
                <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                <p className="text-sky-100 text-sm">Review your order details</p>
              </div>

              {/* Summary Content */}
              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Subtotal</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Tax (10%)</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Delivery Fee</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-2" />

                {/* Total */}
                <div className="flex items-center justify-between bg-sky-50 -mx-6 -mb-6 px-6 py-4 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-bold text-sky-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="p-6 border-t border-slate-200 space-y-3">
                {!token || !user ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-3"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900">Login Required</p>
                      <p className="text-amber-800 text-sm mt-1">
                        Please login to proceed with checkout.
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="mt-2 text-sm font-semibold text-amber-600 hover:text-amber-700 underline"
                      >
                        Go to Login →
                      </button>
                    </div>
                  </motion.div>
                ) : null}

                <button
                  onClick={() => navigate(!token || !user ? "/login" : "/checkout")}
                  disabled={false}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    !token || !user
                      ? "bg-slate-400 hover:bg-slate-500 cursor-pointer"
                      : "bg-sky-500 hover:bg-sky-600"
                  }`}
                >
                  {!token || !user ? "Login to Checkout" : "Proceed to Checkout"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-3 px-4 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-semibold">💳 Secure Checkout:</span> All
                transactions are encrypted and secure. Your payment information
                is never stored on our servers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
