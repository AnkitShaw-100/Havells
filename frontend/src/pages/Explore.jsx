import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Star,
  ShoppingCart,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Explore = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [waterTypeFilter, setWaterTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [fishData, setFishData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedId, setAddedId] = useState(null);

  const ITEMS_PER_PAGE = 8;

  // Fetch fish data from API
  useEffect(() => {
    const fetchFish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/fish`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch fish");
        }

        // Transform API data to card format
        const transformedFish = data.fish.map((item) => ({
          id: item._id,
          name: item.name,
          origin: item.origin,
          price: item.price,
          rating: 4.8,
          reviews: Math.floor(Math.random() * 500) + 200,
          image: item.image || "https://via.placeholder.com/300x200?text=Fish",
          waterType: item.category === "Fresh Water" ? "Freshwater Fish" : "Marine Fish",
          badge: {
            label: "Fresh Catch",
            color: "bg-cyan-50 text-cyan-600 border-cyan-100",
          },
          tags: [item.freshness, item.category, `${item.quantity}${item.unit}`],
          gradient: "from-sky-50 to-blue-50",
          accent: "#0ea5e9",
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category,
          sellerId: item.sellerId,
          mlAnalysis: item.mlAnalysis,
        }));

        setFishData(transformedFish);
        setError("");
      } catch (err) {
        console.error("Error fetching fish:", err);
        setError(err.message || "Failed to load fish products");
        setFishData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, []);

  const filteredFish = useMemo(() => {
    return fishData.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesWater =
        waterTypeFilter === "All" || f.waterType === waterTypeFilter;
      return matchesSearch && matchesWater;
    });
  }, [search, waterTypeFilter, fishData]);

  const totalPages = Math.ceil(filteredFish.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFish = filteredFish.slice(startIndex, endIndex);

  const goNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const jumpTo = (page) => {
    setCurrentPage(page);
  };

const handleAddToCart = (item) => {
  addToCart(item);
  setAddedId(item.id);
  setTimeout(() => setAddedId(null), 1500);
};

return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page header */}
      <div className="relative pt-28  bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-slate-900 tracking-tight mb-8"
          >
            Explore Our <span className="text-sky-500">Fish</span>
          </motion.h1>

          {/* Search and Filter Row */}
          <div className="flex gap-3 mb-6 flex-col sm:flex-row relative z-50">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fish by name..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 text-slate-800 placeholder:text-slate-400 transition-all shadow-sm text-sm"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Fish grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading state */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm h-80 animate-pulse"
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
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedFish.map((fish, i) => (
                <Link key={fish.id} to={`/product/${fish.id}`}>
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden flex flex-col cursor-pointer transition-all h-full"
                  >
                  {/* Image */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${fish.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    {fish.image && fish.image !== "https://via.placeholder.com/300x200?text=Fish" ? (
                      <img
                        src={fish.image}
                        alt={fish.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm font-medium">No image available</div>
                    )}

                    {/* Badge */}
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${fish.badge.color}`}
                    >
                      {fish.badge.label}
                    </span>

                    {/* ML Freshness Score Badge */}
                    {fish.mlAnalysis && fish.mlAnalysis.freshnessScore !== null && (
                      <span className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-xs shadow-lg ${
                        fish.mlAnalysis.isCertified
                          ? "bg-green-500 text-white border-green-600"
                          : "bg-amber-500 text-white border-amber-600"
                      }`}>
                        {fish.mlAnalysis.freshnessScore}%
                      </span>
                    )}

                    {/* Sustainability icon */}
                    {(!fish.mlAnalysis || fish.mlAnalysis.freshnessScore === null) && (
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-sm">
                        <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 truncate">
                          {fish.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {fish.origin || "Local"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">
                          {fish.rating}
                        </span>
                      </div>
                    </div>

                    {/* Tags + ML Quality */}
                    <div className="flex flex-wrap gap-1.5 mb-4 mt-2">
                      {fish.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 truncate"
                        >
                          {tag}
                        </span>
                      ))}
                      {fish.mlAnalysis && fish.mlAnalysis.isCertified && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 whitespace-nowrap flex items-center gap-1">
                          ✅ AI Certified
                        </span>
                      )}
                    </div>

                    {/* Price + Add to Cart */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          Price
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          ${fish.price}
                          <span className="text-xs text-slate-400 font-normal">/{fish.unit}</span>
                        </p>
                      </div>

                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(fish);
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                          addedId === fish.id
                            ? "bg-emerald-500 text-white shadow-[0_2px_8px_0_rgba(16,185,129,0.3)]"
                            : "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_2px_8px_0_rgba(14,165,233,0.35)] hover:shadow-[0_4px_16px_0_rgba(14,165,233,0.45)]"
                        }`}
                      >
                        {addedId === fish.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
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

              {paginatedFish.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full text-center py-28"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                    <ShoppingCart className="w-7 h-7 text-slate-300" />
                  </div>
                  <p className="text-lg font-bold text-slate-700 mb-2">
                    No fish found
                  </p>
                  <p className="text-sm text-slate-400 mb-6">
                    Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setWaterTypeFilter("All");
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>

            {/* Pagination */}
            {filteredFish.length > 0 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => jumpTo(i + 1)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i + 1 === currentPage
                          ? "bg-sky-500 w-7"
                          : "bg-slate-200 hover:bg-slate-300 w-2"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Pagination info */}
            {filteredFish.length > 0 && (
              <p className="text-center text-xs text-slate-400 mt-4 font-medium mb-4">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredFish.length)} of{" "}
                {filteredFish.length} products
              </p>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
