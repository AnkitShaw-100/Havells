import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Menu, X, Fish } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore Fish", path: "/login" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
    initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl border-b border-slate-100 ${
        scrolled
          ? "shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)]"
          : "shadow-none"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "h-16" : "h-18"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
            }}
          >
            <Fish className="w-5 h-5 text-white" />
          </div>

          <span
            className="text-xl md:text-2xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
          >
            Aqua
            <span className="transition-colors duration-400 text-sky-500">
              Delight
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-sky-600"
                      : "text-slate-500 group-hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </span>

                {/* Hover Background */}
                <span className="absolute inset-0 rounded-lg bg-slate-100 opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* Animated Underline */}
                <motion.span
                  className="absolute left-1/2 bottom-1 h-0.5 bg-sky-500 rounded-full"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "70%" }}
                  animate={isActive ? { width: "70%", x: "-50%" } : {}}
                  transition={{ duration: 0.25 }}
                />
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            to="/login"
            className="relative p-2.5 rounded-xl transition-all duration-300 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
          >
            <ShoppingCart className="w-4.5 h-4.5" />

            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* CTA Button */}
          <Link
            to="/login"
            className="hidden md:flex ml-2 items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 bg-sky-500 text-white hover:bg-sky-600 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_6px_24px_0_rgba(14,165,233,0.45)]"
          >
            Shop Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl transition-all duration-300 hover:bg-slate-100 text-slate-700"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-sky-50 text-sky-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2.5" />
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-[0_2px_12px_0_rgba(14,165,233,0.3)]"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;