// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Sparkles, Star, Truck, Shield } from "lucide-react";
import heroImage from "@/assets/hero-seafood.jpg";

const floatVariants = {
  animate: (i) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3 + i * 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5,
    },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Subtle dot-grid background — same quiet texture as Navbar's white world */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Sky glow blobs matching Navbar sky-500 accent */}
      <div
        className="absolute -top-32 -right-32 w-130 h-130 rounded-full blur-[120px] opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #38bdf8, #0284c7)" }}
      />
      <div
        className="absolute bottom-0 -left-24 w-90 h-90 rounded-full blur-[100px] opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #7dd3fc, transparent)" }}
      />

      {/* Rising bubbles — very subtle on white */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sky-200/30"
          style={{
            width: `${6 + i * 5}px`,
            height: `${6 + i * 5}px`,
            left: `${8 + i * 14}%`,
            bottom: "-5%",
            background: `rgba(14,165,233,${0.04 + i * 0.01})`,
          }}
          animate={{ y: [0, -700], opacity: [0.5, 0] }}
          transition={{
            duration: 9 + i * 2,
            repeat: Infinity,
            delay: i * 1.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── MAIN CONTENT — same max-w-7xl + px as Navbar ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Badge — matches Navbar's pill/badge style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-7 border"
                style={{
                  background: "rgba(14,165,233,0.07)",
                  borderColor: "rgba(14,165,233,0.2)",
                  color: "#0284c7",
                  fontFamily: "'Sora', 'Nunito', sans-serif",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Freshly Caught Daily
              </span>
            </motion.div>

            {/* Heading — slate-900 like Navbar logo, sky-500 accent like AquaDelight span */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-bold leading-[1.1] tracking-tight text-slate-900 mb-6"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
            >
              Fresh From{" "}
              <span className="relative inline-block text-sky-500">
                Ocean
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }}
                />
              </span>
              <br />
              <span className="text-slate-600 font-semibold">to Your Plate</span>
            </motion.h1>

            {/* Body — text-slate-500, matches Navbar muted-foreground links */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-base sm:text-lg text-slate-500 mb-9 max-w-105 leading-relaxed font-light"
            >
              Discover the finest sustainably sourced seafood delivered fresh to
              your doorstep. Premium quality, ocean-fresh taste — every order, every time.
            </motion.p>

            {/* CTAs — primary mirrors Navbar "Shop Now" bg-sky-500, secondary mirrors ghost link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 group"
              >
                Explore Fish
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <ChefHat className="w-4 h-4" />
                View Recipes
              </Link>
            </motion.div>

            {/* Stats — border-t border-slate-100 echoes Navbar's border-b border-slate-100 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex gap-8 pt-8 border-t border-slate-100"
            >
              {[
                { value: "200+", label: "Fish Varieties" },
                { value: "50K+", label: "Happy Customers" },
                { value: "24h", label: "Fresh Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-2xl sm:text-3xl font-bold text-slate-900"
                    style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative rings — rounded-xl radius language from Navbar */}
              <div className="absolute -inset-4 rounded-[2rem] border-2 border-sky-100/70 -z-10" />
              <div className="absolute -inset-8 rounded-[2.5rem] border border-sky-50 -z-10" />

              {/* Main image */}
              <div className="relative w-75 sm:w-90 lg:w-100 xl:w-110 rounded-3xl overflow-hidden shadow-[0_24px_64px_0_rgba(14,165,233,0.15),0_4px_24px_0_rgba(0,0,0,0.06)]">
                <img
                  src={heroImage}
                  alt="Fresh seafood arrangement"
                  className="w-full h-115 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent" />

                {/* Live stock pill — matches Navbar's active link pill with animated dot */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-sky-600 border border-sky-100 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Stock Available
                  </span>
                </div>

                {/* Bottom card — bg-white/92 backdrop-blur echoes Navbar scroll bg */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/92 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-0.5">
                          Today's Catch
                        </p>
                        <p className="text-sm font-bold text-slate-800">Atlantic Salmon</p>
                      </div>
                      <div className="text-right mr-2">
                        <p className="text-[10px] text-slate-400 mb-0.5">From</p>
                        <p className="text-base font-bold text-sky-500">
                          $12.99
                          <span className="text-[10px] text-slate-400 font-normal">/kg</span>
                        </p>
                      </div>
                      {/* Arrow CTA — matches Navbar icon button rounded-xl bg-sky-500 */}
                      <Link
                        to="/explore"
                        className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center shadow-md transition-colors duration-200 shrink-0"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card: Rating */}
              <motion.div
                custom={0}
                variants={floatVariants}
                animate="animate"
                className="absolute -left-14 top-8 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-3.5 flex items-center gap-3 w-44"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', sans-serif" }}>
                    4.9 / 5.0
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">2,400+ Reviews</p>
                </div>
              </motion.div>

              {/* Floating card: Delivery */}
              <motion.div
                custom={1}
                variants={floatVariants}
                animate="animate"
                className="absolute -right-14 top-1/3 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-3.5 flex items-center gap-3 w-44"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Free Ship
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">Orders over $49</p>
                </div>
              </motion.div>

              {/* Floating card: Certified */}
              <motion.div
                custom={2}
                variants={floatVariants}
                animate="animate"
                className="absolute -right-12 bottom-24 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-3.5 flex items-center gap-3 w-44"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Certified
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">100% Fresh</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Wave — fill #f8fafc matches sections below the hero */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L60 44C120 38 240 28 360 26C480 24 600 32 720 38C840 44 960 48 1080 44C1200 40 1320 28 1380 22L1440 16V90H0V50Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;