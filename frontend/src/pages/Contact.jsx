import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle,
  MessageSquare, Sparkles, ArrowRight, Fish
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Ocean Drive, Miami, FL 33101",
    sub: "Open to walk-ins Mon–Sat",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    sub: "Mon–Fri, 9 AM – 6 PM EST",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@aquadelight.com",
    sub: "We reply within 24 hours",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    icon: Clock,
    label: "Delivery Hours",
    value: "6 AM – 9 PM Daily",
    sub: "Same-day delivery available",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

const faqs = [
  { q: "How fresh is the seafood?", a: "All our seafood is sourced and dispatched within 24 hours of being caught. We work with certified fisheries to guarantee freshness at every step." },
  { q: "Do you offer same-day delivery?", a: "Yes! Orders placed before 12 PM EST qualify for same-day delivery in select areas. Check availability at checkout." },
  { q: "What if I'm not happy with my order?", a: "We offer a 100% freshness guarantee. If you're not satisfied, contact us within 24 hours of delivery and we'll make it right." },
  { q: "Do you ship internationally?", a: "Currently we deliver across the continental US. International shipping is coming soon — sign up to our newsletter to be notified." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute -top-20 right-0 w-[400px] h-[300px] blur-[100px] opacity-[0.1]"
          style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
              style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0284c7", fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              <MessageSquare className="w-3.5 h-3.5" />
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-tight leading-[1.1] mb-5"
            style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
          >
            We'd Love to{" "}
            <span className="relative inline-block text-sky-500">
              Hear From You
              <motion.span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-sky-400"
                initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="text-slate-500 text-lg leading-relaxed font-light max-w-lg mx-auto"
          >
            Have a question about an order, a partnership inquiry, or just want to say hello? We're here for it.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: "32px" }}>
            <path d="M0 20L60 18C120 16 240 12 360 14C480 16 600 24 720 26C840 28 960 24 1080 18C1200 12 1320 8 1380 6L1440 4V48H0V20Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="pt-16 pb-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_0_rgba(14,165,233,0.1)] transition-all duration-300 p-6 flex flex-col gap-4">
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>{item.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-light">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + FAQ ── */}
      <section className="py-16 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, rgba(14,165,233,0.05), transparent 65%)" }} />

              <div className="relative z-10">
                <h2 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  Send a Message
                </h2>
                <p className="text-sm text-slate-500 font-light mb-7">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Name</label>
                      <input type="text" placeholder="James Smith" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 transition-all" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
                      <input type="email" placeholder="you@email.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Subject</label>
                    <input type="text" placeholder="Order inquiry, partnership, feedback..." value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 transition-all" />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Message</label>
                    <textarea rows={5} placeholder="Tell us how we can help..." value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300 transition-all resize-none" />
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      submitted
                        ? "bg-emerald-500 text-white shadow-[0_2px_12px_0_rgba(16,185,129,0.35)]"
                        : "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)]"
                    }`}>
                    <AnimatePresence mode="wait" initial={false}>
                      {submitted ? (
                        <motion.span key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Message Sent!
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2">
                          <Send className="w-4 h-4" /> Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              <div className="mb-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 border"
                  style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0284c7", fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  FAQ
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-500 font-light">Quick answers to our most common questions.</p>
              </div>

              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 shadow-[0_2px_16px_0_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                      {faq.q}
                    </span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.22 }}
                      className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 text-lg leading-none">
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed font-light border-t border-slate-100 pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* CTA card */}
              <div className="bg-white rounded-2xl border border-sky-100 shadow-[0_2px_16px_0_rgba(14,165,233,0.08)] p-6 flex items-center gap-4 mt-2">
                <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center flex-shrink-0">
                  <Fish className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                    Ready to order?
                  </p>
                  <p className="text-xs text-slate-400 font-light">Browse 200+ fish varieties today.</p>
                </div>
                <Link to="/explore"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-200 shadow-[0_2px_8px_0_rgba(14,165,233,0.3)] whitespace-nowrap group">
                  Shop Now
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;