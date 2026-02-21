import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Fish, Sparkles } from "lucide-react";
import { fishData } from "@/data/fishData";
import FishCard from "@/components/FishCard";
import FishDetailModal from "@/components/FishDetailModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fishTypes = ["All", ...new Set(fishData.map((f) => f.type))];
const waterTypes = ["All", "Freshwater", "Seawater"];

const Explore = () => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return fishData.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || f.type === typeFilter;
      const matchesWater = waterFilter === "All" || f.waterType === waterFilter;
      const matchesPrice = f.price <= priceRange;
      return matchesSearch && matchesType && matchesWater && matchesPrice;
    });
  }, [search, typeFilter, waterFilter, priceRange]);

  const hasActiveFilters =
    typeFilter !== "All" || waterFilter !== "All" || priceRange < 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER — white themed, matches Hero language ── */}
      <div className="relative pt-28 pb-16 bg-white overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Sky glow */}
        <div
          className="absolute -top-20 right-0 w-[400px] h-[300px] blur-[100px] opacity-[0.1]"
          style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[200px] blur-[80px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #7dd3fc, transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Badge — identical pill across all sections */}
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
              style={{
                background: "rgba(14,165,233,0.07)",
                borderColor: "rgba(14,165,233,0.2)",
                color: "#0284c7",
                fontFamily: "'Sora', 'Nunito', sans-serif",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fresh Stock Daily
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
          >
            Fish{" "}
            <span className="relative inline-block text-sky-500">
              Marketplace
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-sky-400"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.45, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-base font-light"
          >
            Browse our full selection of premium sustainably sourced seafood.
          </motion.p>
        </div>

        {/* Wave — same fill token as Hero wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-full block" preserveAspectRatio="none" style={{ height: "32px" }}>
            <path
              d="M0 20L60 18C120 16 240 12 360 14C480 16 600 24 720 26C840 28 960 24 1080 18C1200 12 1320 8 1380 6L1440 4V48H0V20Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Search + Filter row */}
          <div className="flex gap-3 mb-6">
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

            {/* Filter toggle — matches Navbar icon button style */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3.5 rounded-xl border transition-all duration-300 flex items-center gap-2 font-semibold text-sm shadow-sm ${
                showFilters || hasActiveFilters
                  ? "bg-sky-500 text-white border-sky-500 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-white/80" />
              )}
            </button>
          </div>

          {/* Filter panel — bg-white card, same as FeaturedFish/WhyChoose cards */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] p-6 mb-6 space-y-6">
                  {/* Panel header */}
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-sm font-bold text-slate-800"
                      style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                    >
                      Filter Products
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          setTypeFilter("All");
                          setWaterFilter("All");
                          setPriceRange(100);
                        }}
                        className="text-xs text-sky-500 font-semibold flex items-center gap-1 hover:text-sky-600 transition-colors"
                      >
                        <X className="w-3 h-3" /> Clear all
                      </button>
                    )}
                  </div>

                  {/* Fish Type */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                      Fish Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {fishTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTypeFilter(t)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            typeFilter === t
                              ? "bg-sky-500 text-white border-sky-500 shadow-[0_2px_8px_0_rgba(14,165,233,0.3)]"
                              : "bg-slate-50 text-slate-500 border-slate-100 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Water Type */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                      Water Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {waterTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setWaterFilter(t)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            waterFilter === t
                              ? "bg-emerald-500 text-white border-emerald-500 shadow-[0_2px_8px_0_rgba(16,185,129,0.3)]"
                              : "bg-slate-50 text-slate-500 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                      Max Price:{" "}
                      <span
                        className="text-sky-600 normal-case tracking-normal"
                        style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                      >
                        ${priceRange}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 rounded-full accent-sky-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                      <span>$5</span>
                      <span>$100</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count — matches Navbar/section muted text style */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 font-medium">
              <span className="text-slate-800 font-bold">{filtered.length}</span>{" "}
              product{filtered.length !== 1 ? "s" : ""} found
            </p>
            {hasActiveFilters && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                <Fish className="w-3 h-3" />
                Filters active
              </span>
            )}
          </div>

          {/* Fish grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((fish, i) => (
              <FishCard
                key={fish.id}
                fish={fish}
                index={i}
                onSelect={setSelectedFish}
              />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-28"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                <Fish className="w-7 h-7 text-slate-300" />
              </div>
              <p
                className="text-lg font-bold text-slate-700 mb-2"
                style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
              >
                No fish found
              </p>
              <p className="text-sm text-slate-400 mb-6">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setTypeFilter("All");
                  setWaterFilter("All");
                  setPriceRange(100);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)]"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      <FishDetailModal fish={selectedFish} onClose={() => setSelectedFish(null)} />
    </div>
  );
};

export default Explore;