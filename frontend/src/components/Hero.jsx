// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Sparkles, Star, Truck, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-seafood.png";

/* Floating animation */
const floatVariants = {
  animate: (i) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3 + i * 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.4,
    },
  }),
};

/* Counter Animation */
const Counter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const frames = duration * 60;
    const increment = end / frames;

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* glow */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full blur-[120px] opacity-[0.12] bg-sky-400" />
      <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full blur-[100px] opacity-[0.08] bg-sky-300" />

      {/* bubbles */}
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

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-7 border bg-sky-50 border-sky-200 text-sky-600">
                <Sparkles className="w-3.5 h-3.5" />
                Freshly Caught Daily
              </span>
            </motion.div>

            {/* heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.1] text-slate-900 mb-6"
            >
              Fresh From{" "}
              <span className="text-sky-500">Ocean</span>
              <br />
              <span className="text-slate-600 font-semibold">to Your Plate</span>
            </motion.h1>

            {/* description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-slate-500 mb-10 max-w-xl"
            >
              Discover premium seafood delivered fresh to your door.  
              Sustainable sourcing, unbeatable taste, every single day.
            </motion.p>

            {/* buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition shadow-lg"
              >
                Explore Fish
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-sky-50"
              >
                <ChefHat className="w-4 h-4" />
                View Recipes
              </Link>
            </div>

            {/* animated stats */}
            <div className="flex flex-wrap gap-10 pt-8 border-t border-slate-100">

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  <Counter end={200} suffix="+" />
                </p>
                <p className="text-xs uppercase text-slate-400 mt-1">
                  Fish Varieties
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  <Counter end={50} suffix="K+" />
                </p>
                <p className="text-xs uppercase text-slate-400 mt-1">
                  Happy Customers
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  <Counter end={24} suffix="h" />
                </p>
                <p className="text-xs uppercase text-slate-400 mt-1">
                  Fresh Delivery
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-center lg:justify-end">

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[780px]"
            >

              {/* responsive container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/12] lg:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl">

                <img
                  src={heroImage}
                  alt="Fresh seafood"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* live badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-sky-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live Stock Available
                </div>

                {/* bottom card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Today's Catch</p>
                      <p className="font-bold text-slate-800">
                        Atlantic Salmon
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">From</p>
                      <p className="font-bold text-sky-500">
                        $12.99
                        <span className="text-xs text-slate-400"> /kg</span>
                      </p>
                    </div>

                    <Link
                      to="/explore"
                      className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>

              </div>

              {/* floating cards */}

              <motion.div
                custom={0}
                variants={floatVariants}
                animate="animate"
                className="absolute -left-10 top-10 bg-white rounded-xl shadow p-3 flex items-center gap-3"
              >
                <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                <div>
                  <p className="font-bold text-sm">4.9 / 5</p>
                  <p className="text-xs text-slate-400">Reviews</p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={floatVariants}
                animate="animate"
                className="absolute -right-10 top-1/3 bg-white rounded-xl shadow p-3 flex items-center gap-3"
              >
                <Truck className="text-sky-500 w-4 h-4" />
                <div>
                  <p className="font-bold text-sm">Free Ship</p>
                  <p className="text-xs text-slate-400">Over $49</p>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={floatVariants}
                animate="animate"
                className="absolute -right-10 bottom-20 bg-white rounded-xl shadow p-3 flex items-center gap-3"
              >
                <Shield className="text-green-500 w-4 h-4" />
                <div>
                  <p className="font-bold text-sm">Certified</p>
                  <p className="text-xs text-slate-400">100% Fresh</p>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;