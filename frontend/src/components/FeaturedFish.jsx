// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Flame, Check, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FeaturedFish = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [fish, setFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/fish`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch fish");
        }

        // Get only first 4 fish for featured section
        const featuredFish = data.fish.slice(0, 4).map((item) => ({
          id: item._id,
          name: item.name,
          origin: item.origin,
          price: item.price,
          rating: 4.8,
          reviews: 150,
          image: item.image || "https://via.placeholder.com/300x200?text=Fish",
          badge: {
            label: "Fresh Catch",
            color: "bg-cyan-50 text-cyan-600 border-cyan-100",
          },
          tags: [item.freshness, item.category, `${item.quantity}${item.unit}`],
          gradient: "from-sky-50 to-blue-50",
          accent: "#0ea5e9",
          sellerId: item.sellerId,
          quantity: item.quantity,
          unit: item.unit,
        }));

        setFish(featuredFish);
        setError("");
      } catch (err) {
        console.error("Error fetching fish:", err);
        setError(err.message || "Failed to load fish");
        setFish([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">

      {/* Subtle background dot grid — matches Hero */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Soft glow — sky-500 matching Navbar/Hero accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50 blur-[100px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Badge — identical pill style from Hero + Navbar */}
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
              style={{
                background: "rgba(14,165,233,0.07)",
                borderColor: "rgba(14,165,233,0.2)",
                color: "#0284c7",
                fontFamily: "'Sora', 'Nunito', sans-serif",
              }}
            >
              <Flame className="w-3.5 h-3.5" />
              Today's Top Picks
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
            >
              Featured{" "}
              <span className="relative inline-block text-sky-500">
                Fish
                <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400" />
              </span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-md leading-relaxed font-light text-base">
              Handpicked selection of the freshest catch — sustainably sourced and delivered within 24 hours.
            </p>
          </motion.div>

          {/* View all — matches Navbar ghost link style */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300 shadow-sm group whitespace-nowrap"
            >
              View All Fish
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] h-80 animate-pulse"
              >
                <div className="h-44 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-10 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : fish.length > 0 ? (
          <>
            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {fish.map((item, i) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer h-full"
                  >
                  {/* Image area */}
                  <div className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                    {item.image && item.image !== "https://via.placeholder.com/300x200?text=Fish" ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm font-medium">No image available</div>
                    )}

                    {/* Badge */}
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badge.color}`}>
                      {item.badge.label}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Name and Origin */}
                    <div className="mb-2">
                      <h3
                        className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 truncate"
                        style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.origin || "Local"}</p>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">({item.reviews} reviews)</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 truncate"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</p>
                        <p
                          className="text-lg font-bold text-slate-900"
                          style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                        >
                          ${item.price}
                          <span className="text-xs text-slate-400 font-normal">/{item.unit}</span>
                        </p>
                      </div>

                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                          addedId === item.id
                            ? "bg-emerald-500 text-white shadow-[0_2px_8px_0_rgba(16,185,129,0.3)]"
                            : "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_2px_8px_0_rgba(14,165,233,0.35)] hover:shadow-[0_4px_16px_0_rgba(14,165,233,0.45)]"
                        }`}
                      >
                        {addedId === item.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA strip — mirrors Hero primary button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-14 flex justify-center"
            >
              <Link
                to="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 group"
              >
                Explore Full Catalogue
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No fish products available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedFish;