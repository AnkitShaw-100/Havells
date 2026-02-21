// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Anchor, ShieldCheck, Truck, HeartPulse } from "lucide-react";

const features = [
  {
    icon: Anchor,
    title: "Fresh Catch",
    description:
      "Sourced daily from the ocean's finest fisheries worldwide, delivered at peak freshness.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    borderHover: "hover:border-sky-200",
    glowColor: "rgba(14,165,233,0.12)",
    statLabel: "Caught",
    statValue: "Daily",
  },
  {
    icon: ShieldCheck,
    title: "Quality Checked",
    description:
      "Every product passes rigorous quality and safety inspections before reaching you.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderHover: "hover:border-emerald-200",
    glowColor: "rgba(16,185,129,0.10)",
    statLabel: "Passed",
    statValue: "100%",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day delivery with temperature-controlled packaging to preserve every drop of flavour.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-200",
    glowColor: "rgba(245,158,11,0.10)",
    statLabel: "Delivery",
    statValue: "< 24h",
  },
  {
    icon: HeartPulse,
    title: "Healthy Seafood",
    description:
      "Rich in omega-3 and essential nutrients, our seafood supports your long-term wellbeing.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    borderHover: "hover:border-rose-200",
    glowColor: "rgba(244,63,94,0.10)",
    statLabel: "Nutrients",
    statValue: "Omega-3",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const WhyChoose = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dot grid — matches Hero + FeaturedFish */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Sky glow top-center */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-50 blur-[100px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — identical pattern to FeaturedFish */}
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
            Why Us
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
          >
            Why Choose{" "}
            <span className="relative inline-block text-sky-500">
              AquaDelight
              <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400" />
            </span>
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed font-light text-base">
            We go above and beyond to bring you the freshest, highest-quality
            seafood — from ocean to doorstep with zero compromise.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative bg-white rounded-2xl border border-slate-100 ${feature.borderHover} shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.09)] transition-all duration-300 p-7 flex flex-col overflow-hidden`}
            >
              {/* Subtle per-card glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${feature.glowColor}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative z-10`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>

              {/* Title */}
              <h3
                className="text-base font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors duration-200 relative z-10"
                style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed font-light relative z-10 flex-1">
                {feature.description}
              </p>

              {/* Stat chip — border-t border-slate-100, matches Hero stats divider */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  {feature.statLabel}
                </p>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${feature.iconBg} ${feature.iconColor} border`}
                  style={{ borderColor: feature.glowColor }}
                >
                  {feature.statValue}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip — same horizontal layout + tokens as Hero stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-16 bg-slate-50 rounded-2xl border border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {[
            { value: "10+ Years", label: "In Business" },
            { value: "50K+", label: "Happy Customers" },
            { value: "200+", label: "Fish Varieties" },
            { value: "4.9 ★", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center sm:text-left flex-1">
              <p
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}

          {/* CTA — identical sky-500 button from Hero + FeaturedFish */}
          <a
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            Start Shopping
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
