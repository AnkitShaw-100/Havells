import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  MessageSquare,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Chef",
    text: "The salmon from Aqua Delight is absolutely incredible. Freshest fish I've ever had delivered to my door!",
    rating: 5,
    avatar: "SJ",
    avatarBg: "bg-sky-500",
    location: "New York, US",
  },
  {
    name: "Michael Chen",
    role: "Restaurant Owner",
    text: "We've been sourcing from Aqua Delight for our restaurant. The quality is consistently outstanding every single time.",
    rating: 5,
    avatar: "MC",
    avatarBg: "bg-emerald-500",
    location: "San Francisco, US",
  },
  {
    name: "Emily Rodriguez",
    role: "Food Blogger",
    text: "Their selection is unmatched. From exotic shellfish to classic fillets — everything arrives perfectly fresh.",
    rating: 5,
    avatar: "ER",
    avatarBg: "bg-violet-500",
    location: "Austin, US",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dot grid — consistent with all sections */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-50 blur-[100px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — identical pattern across all sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(14,165,233,0.07)",
              borderColor: "rgba(14,165,233,0.2)",
              color: "#0284c7",
              fontFamily: "'Sora', 'Nunito', sans-serif",
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Reviews
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
          >
            What Our{" "}
            <span className="relative inline-block text-sky-500">
              Customers Say
              <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400" />
            </span>
          </h2>

          <p className="text-slate-500 max-w-md mx-auto leading-relaxed font-light text-base">
            Don't just take our word for it — hear from our community of seafood
            lovers.
          </p>
        </motion.div>

        {/* All 3 cards visible + center one highlighted */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={t.name}
                onClick={() => setCurrent(i)}
                animate={{
                  scale: isActive ? 1 : 0.97,
                  opacity: isActive ? 1 : 0.65,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`relative bg-white rounded-2xl border transition-all duration-300 p-7 cursor-pointer overflow-hidden flex flex-col gap-5 ${
                  isActive
                    ? "border-sky-200 shadow-[0_8px_40px_0_rgba(14,165,233,0.15)]"
                    : "border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:border-slate-200"
                }`}
              >
                {/* Active glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top left, rgba(14,165,233,0.07), transparent 65%)",
                    }}
                  />
                )}

                {/* Quote icon */}
                <Quote
                  className={`w-8 h-8 transition-colors duration-300 ${isActive ? "text-sky-300" : "text-slate-200"}`}
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-slate-600 leading-relaxed font-light italic flex-1">
                  "{t.text}"
                </p>

                {/* Divider — border-t border-slate-100 consistent with all cards */}
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-xl ${t.avatarBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold text-slate-800 truncate"
                      style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {t.role} · {t.location}
                    </p>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          {/* Prev — matches Navbar icon button style */}
          <button
            onClick={prev}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-sky-500 w-7"
                    : "bg-slate-200 hover:bg-slate-300 w-2"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-center text-xs text-slate-400 mt-8 font-medium"
        >
          Based on <span className="text-slate-600 font-semibold">2,400+</span>{" "}
          verified reviews · Average rating{" "}
          <span className="text-amber-500 font-semibold">★ 4.9 / 5.0</span>
        </motion.p>
      </div>
    </section>
  );
};

export default Testimonials;
