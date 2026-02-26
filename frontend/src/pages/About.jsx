// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Anchor, Leaf, Users, Award, ArrowRight, Fish,
  Heart, Globe, ShieldCheck, Sparkles, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "200+", label: "Fish Varieties" },
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "Every fish we source meets strict sustainability standards. We work only with certified fisheries that protect marine ecosystems for future generations.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    glowColor: "rgba(16,185,129,0.08)",
    borderHover: "hover:border-emerald-200",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description: "From the moment it leaves the water to the moment it arrives at your door, every product undergoes rigorous quality and safety checks.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    glowColor: "rgba(14,165,233,0.08)",
    borderHover: "hover:border-sky-200",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Our team is available 7 days a week. We treat every order like it's for family — because fresh seafood deserves personal attention.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    glowColor: "rgba(244,63,94,0.08)",
    borderHover: "hover:border-rose-200",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description: "We partner with fisheries across Norway, the Gulf of Mexico, the Bay of Bengal, and beyond to bring you the world's finest catches.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    glowColor: "rgba(139,92,246,0.08)",
    borderHover: "hover:border-violet-200",
  },
];

const team = [
  { name: "James Calloway", role: "Founder & CEO", avatar: "JC", avatarBg: "bg-sky-500", years: "10 yrs" },
  { name: "Priya Nair", role: "Head of Sourcing", avatar: "PN", avatarBg: "bg-emerald-500", years: "7 yrs" },
  { name: "Marco Silva", role: "Executive Chef", avatar: "MS", avatarBg: "bg-amber-500", years: "8 yrs" },
  { name: "Ayesha Tan", role: "Customer Experience", avatar: "AT", avatarBg: "bg-violet-500", years: "5 yrs" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute -top-20 right-0 w-[400px] h-[300px] blur-[100px] opacity-[0.1]"
          style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[200px] blur-[80px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #7dd3fc, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
              style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0284c7", fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              <Sparkles className="w-3.5 h-3.5" />
              Our Story
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
                style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
              >
                Bringing the{" "}
                <span className="relative inline-block text-sky-500">
                  Ocean
                  <motion.span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-sky-400"
                    initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }} />
                </span>
                <br />
                <span className="text-slate-600 font-semibold">to Your Table</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
                className="text-slate-500 text-lg leading-relaxed font-light mb-8 max-w-md"
              >
                Founded in 2014 by a lifelong fisherman and a Michelin-starred chef, AquaDelight was born from a simple belief: everyone deserves access to truly fresh, responsibly sourced seafood.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
              >
                <Link to="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 group">
                  Shop Our Catch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div key={stat.label} custom={i} variants={cardVariants} initial="hidden" animate="visible"
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] p-6 text-center hover:border-sky-100 hover:shadow-[0_8px_32px_0_rgba(14,165,233,0.1)] transition-all duration-300">
                  <p className="text-3xl font-bold text-sky-500 mb-1" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: "32px" }}>
            <path d="M0 20L60 18C120 16 240 12 360 14C480 16 600 24 720 26C840 28 960 24 1080 18C1200 12 1320 8 1380 6L1440 4V48H0V20Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* ── OUR VALUES ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
              style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0284c7", fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              <Anchor className="w-3.5 h-3.5" />
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              Our{" "}
              <span className="relative inline-block text-sky-500">
                Core Values
                <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-sky-400" />
              </span>
            </h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed font-light">
              Everything we do is guided by four principles that have shaped us from day one.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} variants={cardVariants} initial="hidden" whileInView="visible"
                viewport={{ once: true }} whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`group relative bg-white rounded-2xl border border-slate-100 ${v.borderHover} shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.09)] transition-all duration-300 p-7 flex flex-col overflow-hidden`}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${v.glowColor}, transparent 70%)` }} />
                <div className={`w-12 h-12 rounded-2xl ${v.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 relative z-10`}>
                  <v.icon className={`w-5 h-5 ${v.iconColor}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors duration-200 relative z-10"
                  style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light relative z-10">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[100px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
              style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0284c7", fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              <Users className="w-3.5 h-3.5" />
              The People Behind It
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
              Meet Our{" "}
              <span className="relative inline-block text-sky-500">
                Team
                <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-sky-400" />
              </span>
            </h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed font-light">
              Passionate seafood lovers, sustainability advocates, and culinary experts — all working toward one goal.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div key={member.name} custom={i} variants={cardVariants} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_0_rgba(14,165,233,0.1)] transition-all duration-300 p-7 text-center flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl ${member.avatarBg} flex items-center justify-center text-white text-lg font-bold mb-4`}
                  style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  {member.avatar}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  {member.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-4">{member.role}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 w-full flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Experience</span>
                  <span className="text-xs font-bold text-sky-500">{member.years}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS STRIP ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  Best Seafood Delivery 2024
                </p>
                <p className="text-xs text-slate-400">Food & Beverage Excellence Awards</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  Certified Sustainable Fishery
                </p>
                <p className="text-xs text-slate-400">Marine Stewardship Council</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <Star className="w-5 h-5 text-sky-500 fill-sky-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}>
                  Top Rated Seafood Brand
                </p>
                <p className="text-xs text-slate-400">Trustpilot · 2,400+ reviews</p>
              </div>
            </div>
            <Link to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 whitespace-nowrap group flex-shrink-0">
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;