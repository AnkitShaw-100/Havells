// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Anchor, ShieldCheck, Truck, HeartPulse } from "lucide-react";

const features = [
  {
    icon: Anchor,
    title: "Fresh Catch",
    description:
      "Sourced daily from trusted fisheries across India and delivered at peak freshness.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    icon: ShieldCheck,
    title: "Quality Checked",
    description:
      "Every seafood item is inspected and hygienically packed before dispatch.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Temperature-controlled delivery that keeps your seafood perfectly fresh.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: HeartPulse,
    title: "Healthy Seafood",
    description:
      "Rich in protein, omega-3, and essential nutrients for a healthy lifestyle.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 200, suffix: "+", label: "Fish Varieties" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose <span className="text-sky-500">AquaDelight</span>
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto">
            Fresh seafood delivered directly from trusted fisheries to your
            doorstep with unmatched quality.
          </p>
        </motion.div>

        {/* features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>

              <h3 className="font-semibold text-lg text-slate-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-50 border border-slate-100 rounded-2xl p-10 text-center"
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-slate-900">
                <CountUp
                  end={stat.value}
                  duration={2}
                  decimals={stat.decimals || 0}
                />
                {stat.suffix}
              </p>

              <p className="text-xs uppercase tracking-wider text-slate-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;