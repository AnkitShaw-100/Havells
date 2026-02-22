import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Star,
  ShoppingCart,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

// Import fish images
import Salmon from "@/assets/salmon.png";
import Tuna from "@/assets/tuna.png";
import Cod from "@/assets/cod.png";
import Snapper from "@/assets/snapper.png";

// Fish data in the same file
const fishData = [
  {
    id: 1,
    name: "Atlantic Salmon Fillet",
    origin: "Norway",
    price: 12.99,
    rating: 4.9,
    reviews: 842,
    image: Salmon,
    waterType: "Marine Fish",
    badge: {
      label: "Best Seller",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    tags: ["Omega-3 Rich", "Premium Cut", "Perfect for Grilling"],
    gradient: "from-sky-50 to-blue-50",
    accent: "#0ea5e9",
  },
  {
    id: 2,
    name: "Yellowfin Tuna Steak",
    origin: "Japan",
    price: 15.49,
    rating: 4.8,
    reviews: 623,
    image: Tuna,
    waterType: "Marine Fish",
    badge: {
      label: "Chef's Choice",
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    tags: ["Sushi Grade", "High Protein", "Lean Cut"],
    gradient: "from-rose-50 to-orange-50",
    accent: "#f43f5e",
  },
  {
    id: 3,
    name: "Pacific Cod Fillet",
    origin: "Alaska",
    price: 9.99,
    rating: 4.7,
    reviews: 512,
    image: Cod,
    waterType: "Marine Fish",
    badge: {
      label: "Fresh Catch",
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    },
    tags: ["Mild Flavor", "Flaky Texture", "Wild Caught"],
    gradient: "from-cyan-50 to-sky-50",
    accent: "#06b6d4",
  },
  {
    id: 4,
    name: "Red Snapper",
    origin: "Indonesia",
    price: 13.25,
    rating: 4.8,
    reviews: 438,
    image: Snapper,
    waterType: "Marine Fish",
    badge: {
      label: "Premium",
      color: "bg-orange-50 text-orange-600 border-orange-100",
    },
    tags: ["Firm Texture", "Sweet Flavor", "Restaurant Quality"],
    gradient: "from-orange-50 to-amber-50",
    accent: "#f97316",
  },
  {
    id: 5,
    name: "Atlantic Salmon Fillet",
    origin: "Scotland",
    price: 13.49,
    rating: 4.9,
    reviews: 756,
    image: Salmon,
    waterType: "Marine Fish",
    badge: {
      label: "Best Seller",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    tags: ["Omega-3 Rich", "Premium Cut", "Sustainable"],
    gradient: "from-sky-50 to-blue-50",
    accent: "#0ea5e9",
  },
  {
    id: 6,
    name: "Bluefin Tuna",
    origin: "Australia",
    price: 18.99,
    rating: 4.8,
    reviews: 531,
    image: Tuna,
    waterType: "Marine Fish",
    badge: {
      label: "Premium",
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    tags: ["High Protein", "Lean Cut", "Rich Flavor"],
    gradient: "from-rose-50 to-orange-50",
    accent: "#f43f5e",
  },
  {
    id: 7,
    name: "Rainbow Trout Fillet",
    origin: "Canada",
    price: 11.49,
    rating: 4.7,
    reviews: 428,
    image: Cod,
    waterType: "River Fish",
    badge: {
      label: "Freshwater",
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    tags: ["Mild Flavor", "Delicate Texture", "Farm Raised"],
    gradient: "from-teal-50 to-cyan-50",
    accent: "#14b8a6",
  },
  {
    id: 8,
    name: "Arctic Char",
    origin: "Iceland",
    price: 14.99,
    rating: 4.9,
    reviews: 602,
    image: Snapper,
    waterType: "River Fish",
    badge: {
      label: "Premium",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    tags: ["Omega-3 Rich", "Cold Water", "Farm Raised"],
    gradient: "from-purple-50 to-pink-50",
    accent: "#a855f7",
  },
  {
    id: 9,
    name: "Sea Bass Fillet",
    origin: "Greece",
    price: 16.99,
    rating: 4.8,
    reviews: 489,
    image: Salmon,
    waterType: "Marine Fish",
    badge: {
      label: "Premium",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    tags: ["Firm Texture", "Delicate Flavor", "Wild Caught"],
    gradient: "from-blue-50 to-cyan-50",
    accent: "#3b82f6",
  },
  {
    id: 10,
    name: "Catfish",
    origin: "Vietnam",
    price: 8.99,
    rating: 4.5,
    reviews: 345,
    image: Tuna,
    waterType: "River Fish",
    badge: {
      label: "Budget Friendly",
      color: "bg-green-50 text-green-600 border-green-100",
    },
    tags: ["Affordable", "Versatile", "Farm Raised"],
    gradient: "from-green-50 to-emerald-50",
    accent: "#10b981",
  },
  {
    id: 11,
    name: "Mackerel Fillet",
    origin: "UK",
    price: 10.99,
    rating: 4.6,
    reviews: 412,
    image: Cod,
    waterType: "Marine Fish",
    badge: {
      label: "Rich in Omega-3",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    tags: ["Omega-3 Rich", "Bold Flavor", "Sustainable"],
    gradient: "from-indigo-50 to-blue-50",
    accent: "#6366f1",
  },
  {
    id: 12,
    name: "Pike Fillet",
    origin: "Poland",
    price: 12.49,
    rating: 4.7,
    reviews: 378,
    image: Snapper,
    waterType: "River Fish",
    badge: {
      label: "Fresh Catch",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100",
    },
    tags: ["Flaky Texture", "Mild Flavor", "Freshwater"],
    gradient: "from-yellow-50 to-orange-50",
    accent: "#eab308",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Explore = () => {
  const [search, setSearch] = useState("");
  const [waterTypeFilter, setWaterTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filteredFish = useMemo(() => {
    return fishData.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesWater =
        waterTypeFilter === "All" || f.waterType === waterTypeFilter;
      return matchesSearch && matchesWater;
    });
  }, [search, waterTypeFilter]);

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
        </div>
      </div>

      {/* Fish grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedFish.map((fish, i) => (
            <motion.div
              key={fish.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div
                className={`relative h-44 bg-gradient-to-br ${fish.gradient} flex items-center justify-center`}
              >
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="h-32 object-contain"
                />

                {/* Badge */}
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${fish.badge.color}`}
                >
                  {fish.badge.label}
                </span>

                {/* Sustainability icon */}
                <span className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-600">
                      {fish.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {fish.origin}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">
                      {fish.rating}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-2">
                  {fish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price + Add to Cart */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      Price
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      ${fish.price}/kg
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center shadow transition-all duration-200"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {paginatedFish.length === 0 && (
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
            Showing{" "}
            <span className="text-slate-600 font-semibold">
              {startIndex + 1}–{Math.min(endIndex, filteredFish.length)}
            </span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">
              {filteredFish.length}
            </span>{" "}
            fish
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
