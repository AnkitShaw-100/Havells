import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Fish,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Explore Fish", path: "/explore" },
  { label: "Recipes", path: "/recipes" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const socials = [
  {
    Icon: Facebook,
    color: "hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/30",
  },
  {
    Icon: Twitter,
    color: "hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/30",
  },
  {
    Icon: Instagram,
    color: "hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30",
  },
  {
    Icon: Youtube,
    color: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Sky glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[120px] opacity-[0.12]"
        style={{ background: "radial-gradient(ellipse, #0ea5e9, transparent)" }}
      />

      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] blur-[120px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 relative z-10">
        {/* Top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 px-7 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          <div>
            <p
              className="text-base font-bold text-slate-100"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
            >
              Ready to taste the ocean?
            </p>
            <p className="text-sm text-slate-300 font-light mt-0.5">
              Free delivery on your first order over $49.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-all duration-200 shadow-[0_2px_16px_0_rgba(14,165,233,0.35)] hover:shadow-[0_4px_24px_0_rgba(14,165,233,0.5)] whitespace-nowrap group shrink-0 active:scale-95"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
                  boxShadow: "0 2px 12px 0 rgba(14,165,233,0.35)",
                }}
              >
                <Fish className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-bold text-slate-100"
                style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
              >
                Aqua<span className="text-sky-400">Delight</span>
              </span>
            </Link>

            <p className="text-sm text-white  leading-relaxed font-light mb-6">
              Premium sustainably sourced seafood, delivered fresh from the
              ocean to your plate — every order, every time.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ Icon, color }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-white transition-all duration-200 ${color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-100 mb-5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="text-sm text-white hover:text-sky-400 transition-colors duration-150 flex items-center gap-1 group w-fit"
                >
                  {label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-100 mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3.5">
              {[
                { Icon: MapPin, text: "123 Ocean Drive, Miami, FL" },
                { Icon: Phone, text: "+1 (555) 123-4567" },
                { Icon: Mail, text: "hello@aquadelight.com" },
              ].map(({ Icon, text }) => (
                <span
                  key={text}
                  className="flex items-start gap-3 text-sm text-white"
                >
                  <span className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3 h-3 text-sky-400" />
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hours + Trust */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.21 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-100 mb-5">
              Delivery Hours
            </h4>
            <div className="flex flex-col gap-2.5 text-sm mb-5">
              {[
                { day: "Mon – Fri", time: "6:00 AM – 9:00 PM" },
                { day: "Saturday", time: "7:00 AM – 8:00 PM" },
                { day: "Sunday", time: "8:00 AM – 6:00 PM" },
              ].map(({ day, time }) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-slate-400 font-light">{day}</span>
                  <span className="text-slate-300 font-medium text-xs tabular-nums">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs font-semibold text-emerald-400">
                All orders delivered fresh
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AquaDelight. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-sky-400 transition-colors duration-150">
              Privacy Policy
            </a>
            <span className="text-slate-400">·</span>
            <a href="#" className="hover:text-sky-400 transition-colors duration-150">
              Terms of Service
            </a>
            <span className="text-slate-400">·</span>
            <a href="#" className="hover:text-sky-400 transition-colors duration-150">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;