import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Tag, ChefHat } from "lucide-react";

const perks = [
  { icon: Tag, label: "Weekly Deals" },
  { icon: ChefHat, label: "Exclusive Recipes" },
  { icon: Mail, label: "New Arrivals" },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3500);
    }
  };

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Sky glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 blur-[120px] opacity-[0.09]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      {/* Subtle rising bubbles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sky-200/30"
          style={{
            width: `${6 + i * 4}px`,
            height: `${6 + i * 4}px`,
            left: `${10 + i * 18}%`,
            bottom: "-4%",
            background: `rgba(14,165,233,${0.04 + i * 0.01})`,
          }}
          animate={{ y: [0, -400], opacity: [0.5, 0] }}
          transition={{ duration: 7 + i * 1.5, repeat: Infinity, delay: i * 1.4, ease: "easeOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Card — bg-white, same card language as every section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_48px_0_rgba(14,165,233,0.1),0_2px_16px_0_rgba(0,0,0,0.05)] p-8 sm:p-12 text-center relative overflow-hidden"
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at top center, rgba(14,165,233,0.06), transparent 65%)",
              }}
            />

            {/* Badge — same pill as all sections */}
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
              style={{
                background: "rgba(14,165,233,0.07)",
                borderColor: "rgba(14,165,233,0.2)",
                color: "#0284c7",
                fontFamily: "'Sora', 'Nunito', sans-serif",
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Newsletter
            </span>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
            >
              Stay in the{" "}
              <span className="relative inline-block text-sky-500">
                Current
                <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400" />
              </span>
            </h2>

            <p className="text-slate-500 mb-8 text-base font-light leading-relaxed max-w-sm mx-auto">
              Get weekly deals, new arrivals, and exclusive recipes delivered straight to your inbox.
            </p>

            {/* Perks row — border-slate-100 divider like all cards */}
            <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b border-slate-100">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative z-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 transition-all duration-200"
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  submitted
                    ? "bg-emerald-500 text-white shadow-[0_2px_12px_0_rgba(16,185,129,0.35)]"
                    : "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)]"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {submitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Subscribed!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Subscribe
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-400 mt-4 relative z-10">
              No spam, ever. Unsubscribe anytime.{" "}
              <a href="#" className="text-sky-500 hover:underline font-medium">Privacy Policy</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;