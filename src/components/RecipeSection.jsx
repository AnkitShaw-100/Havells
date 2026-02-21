// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Clock, Flame, ArrowUpRight, ArrowRight, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { recipeData } from "@/data/recipeData";

const difficultyStyle = {
  Easy: {
    bg: "rgba(16,185,129,0.07)",
    text: "text-emerald-600",
    border: "border-emerald-100",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "rgba(245,158,11,0.07)",
    text: "text-amber-600",
    border: "border-amber-100",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "rgba(244,63,94,0.07)",
    text: "text-rose-600",
    border: "border-rose-100",
    dot: "bg-rose-400",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const RecipeSection = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">

      {/* Dot grid — same as every other section */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Soft sky glow */}
      <div
        className="absolute top-0 right-0 w-120 h-70 blur-[110px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header — same pattern as FeaturedFish + WhyChoose */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
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
              <ChefHat className="w-3.5 h-3.5" />
              Taste the Sea
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
            >
              Popular{" "}
              <span className="relative inline-block text-sky-500">
                Recipes
                <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-sky-400" />
              </span>
            </h2>

            <p className="text-slate-500 mt-4 max-w-md leading-relaxed font-light text-base">
              Chef-curated seafood recipes that bring the ocean's best flavours straight to your kitchen.
            </p>
          </motion.div>

          {/* Ghost "View All" — matches Navbar secondary link + FeaturedFish */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300 shadow-sm group whitespace-nowrap"
            >
              View All Recipes
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recipeData.map((recipe, i) => {
            const style = difficultyStyle[recipe.difficulty] ?? difficultyStyle.Easy;
            return (
              <motion.div
                key={recipe.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                  {/* Time badge — bg-white/90 backdrop matches Navbar scroll bg */}
                  <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-700 border border-white/60 shadow-sm flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-sky-500" />
                    {recipe.cookingTime}
                  </span>

                  {/* View arrow — sky-500 on hover matching primary CTA */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm border border-white/60">
                    <ArrowUpRight className="w-4 h-4 text-sky-500" />
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3
                      className="font-bold text-white text-base drop-shadow-lg leading-snug"
                      style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
                    >
                      {recipe.name}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed font-light flex-1">
                    {recipe.description}
                  </p>

                  {/* Footer — border-t border-slate-100 matching Hero stats + WhyChoose card divider */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${style.text} ${style.border}`}
                      style={{ background: style.bg }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {recipe.difficulty}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Flame className="w-3 h-3" />
                      {recipe.calories ?? "—"} kcal
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA — identical to FeaturedFish "Explore Full Catalogue" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 shadow-[0_2px_12px_0_rgba(14,165,233,0.3)] hover:shadow-[0_4px_20px_0_rgba(14,165,233,0.45)] hover:-translate-y-0.5 group"
          >
            Browse All Recipes
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeSection;