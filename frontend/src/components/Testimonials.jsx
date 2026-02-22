import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  MessageSquare,
} from "lucide-react";

const testimonials = [
  {
    name: "Arindam Chatterjee",
    role: "Home Cook",
    text: "The hilsa I ordered was unbelievably fresh. Felt like it came straight from the river to my kitchen!",
    rating: 5,
    avatar: "AC",
    avatarBg: "bg-sky-500",
    location: "Kolkata, West Bengal",
  },
  {
    name: "Priyanka Sen",
    role: "Restaurant Owner",
    text: "We've been sourcing fish from Aqua Delight for months now. Quality and freshness are always perfect.",
    rating: 5,
    avatar: "PS",
    avatarBg: "bg-emerald-500",
    location: "Durgapur, West Bengal",
  },
  {
    name: "Ritwik Mukherjee",
    role: "Food Blogger",
    text: "Amazing variety and super fresh delivery. The prawns and bhetki were top-notch.",
    rating: 5,
    avatar: "RM",
    avatarBg: "bg-violet-500",
    location: "Siliguri, West Bengal",
  },
  {
    name: "Susmita Ghosh",
    role: "Home Cook",
    text: "Ordered rohu and katla for a family feast. Both were incredibly fresh and the packaging was excellent.",
    rating: 5,
    avatar: "SG",
    avatarBg: "bg-pink-500",
    location: "Howrah, West Bengal",
  },
  {
    name: "Debashis Pal",
    role: "Hotel Chef",
    text: "As a professional chef, freshness is non-negotiable. Aqua Delight delivers consistently every single time.",
    rating: 5,
    avatar: "DP",
    avatarBg: "bg-orange-500",
    location: "Asansol, West Bengal",
  },
  {
    name: "Tanushree Roy",
    role: "Food Enthusiast",
    text: "The tiger prawns were massive and tasted divine. Will definitely order again next week!",
    rating: 5,
    avatar: "TR",
    avatarBg: "bg-teal-500",
    location: "Kolkata, West Bengal",
  },
  {
    name: "Soumik Basu",
    role: "Home Cook",
    text: "Best ilish I've had outside of the Padma riverbank. Absolutely melt-in-your-mouth freshness.",
    rating: 5,
    avatar: "SB",
    avatarBg: "bg-indigo-500",
    location: "Barasat, West Bengal",
  },
  {
    name: "Moumita Das",
    role: "Caterer",
    text: "I rely on Aqua Delight for all my catering events. Large orders handled perfectly every time.",
    rating: 5,
    avatar: "MD",
    avatarBg: "bg-rose-500",
    location: "Burdwan, West Bengal",
  },
  {
    name: "Arnab Sengupta",
    role: "Food Blogger",
    text: "Tried the pomfret and it was absolutely restaurant-quality. Freshness that you can taste instantly.",
    rating: 5,
    avatar: "AS",
    avatarBg: "bg-cyan-500",
    location: "Kharagpur, West Bengal",
  },
];

const GAP_PX = 20;

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [visible, setVisible] = useState(3);
  const viewportRef = useRef(null);
  const animCtrl = useRef(null);
  const xVal = useMotionValue(0);

  // Calculate responsive VISIBLE based on screen size
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisible(1); // mobile
      } else if (width < 1024) {
        setVisible(2); // tablet
      } else {
        setVisible(3); // desktop
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxStart = testimonials.length - visible;

  const getCardWidth = () => {
    if (!viewportRef.current) return 0;
    const w = viewportRef.current.offsetWidth;
    return (w - GAP_PX * (visible - 1)) / visible;
  };

  const slideTo = (idx) => {
    const cardW = getCardWidth();
    const target = -idx * (cardW + GAP_PX);
    if (animCtrl.current) animCtrl.current.stop();
    animCtrl.current = animate(xVal, target, {
      type: "spring",
      stiffness: 380,
      damping: 42,
      mass: 0.85,
    });
  };

  const goNext = () => {
    setStartIndex((prev) => {
      const next = Math.min(prev + 1, maxStart);
      slideTo(next);
      return next;
    });
    setActiveCard(0);
    setAutoKey((k) => k + 1);
  };

  const goPrev = () => {
    setStartIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      slideTo(next);
      return next;
    });
    setActiveCard(0);
    setAutoKey((k) => k + 1);
  };

  const jumpTo = (i) => {
    setStartIndex(i);
    slideTo(i);
    setActiveCard(0);
    setAutoKey((k) => k + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => {
        const next = prev >= (testimonials.length - visible) ? 0 : prev + 1;
        slideTo(next);
        return next;
      });
      setActiveCard(0);
    }, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoKey, visible]);

  useEffect(() => {
    const onResize = () => slideTo(startIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-50 blur-[100px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
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
            Don't just take our word for it — hear from seafood lovers across West Bengal.
          </p>
        </motion.div>

        {/* ── Slider viewport ── */}
        <div ref={viewportRef} className="overflow-hidden mb-10">
          <motion.div
            style={{
              x: xVal,
              display: "flex",
              gap: GAP_PX,
            }}
          >
            {testimonials.map((t, i) => {
              const posInWindow = i - startIndex;
              const isActive =
                posInWindow >= 0 && posInWindow < visible && posInWindow === activeCard;

              return (
                <div
                  key={t.name}
                  onClick={() => {
                    if (posInWindow >= 0 && posInWindow < visible)
                      setActiveCard(posInWindow);
                  }}
                  className={`
                    relative bg-white rounded-2xl border p-7 cursor-pointer flex-shrink-0
                    flex flex-col gap-5 overflow-hidden
                    transition-[border-color,box-shadow] duration-300
                    ${isActive
                      ? "border-sky-200 shadow-[0_8px_40px_0_rgba(14,165,233,0.18)]"
                      : "border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:border-slate-200"
                    }
                  `}
                  style={{
                    width: `calc((100% - ${GAP_PX * (visible - 1)}px) / ${visible})`,
                    // use CSS container width at render time — this works because flexbox already respects it
                  }}
                >
                  {/* active glow */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at top left, rgba(14,165,233,0.08), transparent 65%)",
                      }}
                    />
                  )}

                  <Quote
                    className={`w-8 h-8 transition-colors duration-300 ${
                      isActive ? "text-sky-300" : "text-slate-200"
                    }`}
                  />

                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-light italic flex-1">
                    "{t.text}"
                  </p>

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
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={goPrev}
            disabled={startIndex === 0}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === startIndex
                    ? "bg-sky-500 w-7"
                    : "bg-slate-200 hover:bg-slate-300 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={startIndex === maxStart}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-all duration-200 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4 font-medium">
          Showing{" "}
          <span className="text-slate-600 font-semibold">
            {startIndex + 1}–{Math.min(startIndex + visible, testimonials.length)}
          </span>{" "}
          of{" "}
          <span className="text-slate-600 font-semibold">{testimonials.length}</span>{" "}
          reviews
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-center text-xs text-slate-400 mt-2 font-medium"
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