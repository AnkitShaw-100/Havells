import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();
  const { user, token } = useAuth();
  const [step, setStep] = useState("details"); // details, payment, confirmation
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  // Form states
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Fetch user profile details on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!token) {
          setFetchingUser(false);
          return;
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.user || data;

          // Pre-fill delivery details with user profile data
          setDeliveryDetails({
            fullName: userData.name || user?.name || "",
            email: userData.email || user?.email || "",
            phone: userData.phone || "",
            street: userData.address?.street || "",
            city: userData.address?.city || "",
            state: userData.address?.state || "",
            zipCode: userData.address?.zipCode || "",
            country: userData.address?.country || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.fish.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const deliveryFee = 5.99;
  const total = subtotal + tax + deliveryFee;

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formatted = value.replace(/\s+/g, "").slice(0, 16);
      setCardDetails((prev) => ({
        ...prev,
        [name]: formatted.replace(/(.{4})/g, "$1 ").trim(),
      }));
    } else if (name === "expiry") {
      let formatted = value.replace(/\D/g, "").slice(0, 4);
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
      }
      setCardDetails((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "cvv") {
      setCardDetails((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 3),
      }));
    } else {
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateDeliveryDetails = () => {
    const required = [
      "fullName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
    ];
    return required.every((field) => deliveryDetails[field].trim() !== "");
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
      return (
        cardDetails.cardNumber.replace(/\s/g, "").length === 16 &&
        cardDetails.cardName.trim() &&
        cardDetails.expiry.length === 5 &&
        cardDetails.cvv.length === 3
      );
    }
    return true; // Other payment methods don't need validation
  };

  const handleProceedToPayment = () => {
    if (!validateDeliveryDetails()) {
      alert("Please fill in all delivery details");
      return;
    }
    setStep("payment");
  };

  const handleProcessPayment = async () => {
    if (!validatePayment()) {
      alert("Please enter valid payment details");
      return;
    }

    setLoading(true);
    // Simulate API call for payment processing
    setTimeout(() => {
      const newOrderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;
      setOrderId(newOrderId);
      setStep("confirmation");
      setLoading(false);
    }, 2000);
  };

  const handleCompleteOrder = () => {
    clearCart();
    navigate("/");
  };

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
            <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Cart is Empty
            </h1>
            <p className="text-slate-500 mb-8">
              Your cart was emptied. Please add items before checking out.
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Login Required
            </h1>
            <p className="text-slate-500 mb-8">
              Please log in to your account to complete your purchase.
            </p>
            <button
              onClick={() => navigate("/login", { state: { from: "checkout" } })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-lg"
            >
              Go to Login
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
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-bold text-slate-900">Checkout</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-12 max-w-2xl">
          {[
            { id: "details", label: "Delivery Details" },
            { id: "payment", label: "Payment" },
            { id: "confirmation", label: "Confirmation" },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === s.id
                    ? "bg-sky-500 text-white shadow-lg scale-110"
                    : ["details", "payment"].includes(step) &&
                      ["details"].includes(s.id)
                    ? "bg-emerald-500 text-white"
                    : ["details", "payment", "confirmation"].includes(step) &&
                      ["details", "payment"].includes(s.id)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {["details", "payment"].includes(step) &&
                ["details"].includes(s.id) ? (
                  <Check className="w-5 h-5" />
                ) : ["details", "payment", "confirmation"].includes(step) &&
                  ["details", "payment"].includes(s.id) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </motion.div>
              <span
                className={`text-sm font-medium ml-3 ${
                  step === s.id
                    ? "text-sky-600"
                    : ["details", "payment"].includes(step) &&
                      ["details"].includes(s.id)
                    ? "text-emerald-600"
                    : ["details", "payment", "confirmation"].includes(step) &&
                      ["details", "payment"].includes(s.id)
                    ? "text-emerald-600"
                    : "text-slate-500"
                }`}
              >
                {s.label}
              </span>
              {i < 2 && (
                <div
                  className={`h-1 flex-1 mx-4 rounded-full transition-colors ${
                    ["payment", "confirmation"].includes(step)
                      ? "bg-emerald-500"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Delivery Details Step */}
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-sky-500" />
                    Delivery Details
                  </h2>

                  {fetchingUser ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 bg-slate-200 rounded-xl animate-pulse" />
                      ))}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-slate-200 rounded-xl animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={deliveryDetails.fullName}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={deliveryDetails.email}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={deliveryDetails.phone}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={deliveryDetails.country}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={deliveryDetails.street}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                      />

                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={deliveryDetails.city}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={deliveryDetails.state}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Zip Code"
                          value={deliveryDetails.zipCode}
                          onChange={handleDeliveryChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <button
                        onClick={handleProceedToPayment}
                        className="w-full mt-6 py-3.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Payment Step */}
              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-sky-500" />
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                      { id: "wallet", label: "Digital Wallet", icon: Wallet },
                    ].map(({ id, label, icon: Icon }) => (
                      <label
                        key={id}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === id
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={id}
                          checked={paymentMethod === id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 accent-sky-500"
                        />
                        <Icon className="w-5 h-5 ml-3 text-slate-600" />
                        <span className="ml-2 font-medium text-slate-900">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 mb-8">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        maxLength="19"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={cardDetails.cardName}
                        onChange={handleCardChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          maxLength="3"
                          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">🔒 Secure Payment:</span> Your
                      payment information is encrypted and secure.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProcessPayment}
                      disabled={loading}
                      className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {loading ? "Processing..." : "Complete Payment"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirmation Step */}
              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-emerald-600" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Order Confirmed!
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Thank you for your purchase
                  </p>

                  <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                      <Clock className="w-5 h-5 text-sky-500" />
                      <div>
                        <p className="text-xs text-slate-500">Order ID</p>
                        <p className="text-lg font-bold text-slate-900">
                          {orderId}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery to:</span>
                        <span className="font-medium text-slate-900">
                          {deliveryDetails.city}, {deliveryDetails.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contact:</span>
                        <span className="font-medium text-slate-900">
                          {deliveryDetails.phone}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span className="text-sky-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">✓ Payment Successful:</span> Your
                      order has been confirmed and will be delivered within 2-3 business
                      days.
                    </p>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-3.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Summary Header */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-6">
                <h3 className="text-lg font-bold mb-1">Order Summary</h3>
                <p className="text-sky-100 text-sm">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Items */}
              <div className="p-6 border-b border-slate-200 max-h-64 overflow-y-auto space-y-3">
                {items.map((item) => (
                  <div key={item.fish.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-slate-900">
                        {item.fish.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      ${(item.fish.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between bg-sky-50 -mx-6 -mb-6 px-6 py-4">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-sky-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
