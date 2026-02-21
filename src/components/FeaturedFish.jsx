// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingCart, Flame, Leaf } from "lucide-react";

const fish = [
  {
    id: 1,
    name: "Atlantic Salmon",
    origin: "Norway",
    price: 12.99,
    rating: 4.9,
    reviews: 842,
    badge: { label: "Best Seller", color: "bg-amber-50 text-amber-600 border-amber-100" },
    icon: "🐟",
    tags: ["Omega-3 Rich", "Grilling"],
    gradient: "from-sky-50 to-blue-50",
    accent: "#0ea5e9",
  },
  {
    id: 2,
    name: "Red Snapper",
    origin: "Gulf of Mexico",
    price: 18.49,
    rating: 4.8,
    reviews: 563,
    badge: { label: "Premium", color: "bg-rose-50 text-rose-500 border-rose-100" },
    icon: "🐠",
    tags: ["Mild Flavor", "Pan Fry"],
    gradient: "from-rose-50 to-orange-50",
    accent: "#f43f5e",
  },
  {
    id: 3,
    name: "Tiger Prawns",
    origin: "Bay of Bengal",
    price: 22.99,
    rating: 4.9,
    reviews: 1204,
    badge: { label: "Popular", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    icon: "🦐",
    tags: ["High Protein", "BBQ"],
    gradient: "from-emerald-50 to-teal-50",
    accent: "#10b981",
  },
  {
    id: 4,
    name: "Bluefin Tuna",
    origin: "Pacific Ocean",
    price: 34.99,
    rating: 5.0,
    reviews: 389,
    badge: { label: "Chef's Pick", color: "bg-violet-50 text-violet-600 border-violet-100" },
    icon: "🐡",
    tags: ["Sashimi Grade", "Raw"],
    gradient: "from-violet-50 to-indigo-50",
    accent: "#8b5cf6",
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

const FeaturedFish = () => {
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

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fish.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
            >
              {/* Image area */}
              <div className={`relative h-44 bg-linear-to-br ${item.gradient} flex items-center justify-center`}>
                <motion.span
                  className="text-7xl select-none"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>

                {/* Badge — uses border-* matching Navbar's border-slate-100 language */}
                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badge.color}`}>
                  {item.badge.label}
                </span>

                {/* Sustainability leaf */}
                <span className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3
                      className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-200"
                      style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.origin}</p>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                  </div>
                </div>

                {/* Reviews count */}
                <p className="text-[10px] text-slate-400 mb-3">({item.reviews} reviews)</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price + CTA — matches Navbar/Hero button tokens */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</p>
                    <p
                      className="text-lg font-bold text-slate-900"
                      style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                    >
                      ${item.price}
                      <span className="text-xs text-slate-400 font-normal">/kg</span>
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center shadow-[0_2px_8px_0_rgba(14,165,233,0.35)] hover:shadow-[0_4px_16px_0_rgba(14,165,233,0.45)] transition-all duration-200"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
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
      </div>
    </section>
  );
};

export default FeaturedFish;