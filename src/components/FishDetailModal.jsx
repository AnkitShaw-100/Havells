import { AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Zap,
  Heart,
  UtensilsCrossed,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const FishDetailModal = ({ fish, onClose }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!fish) return null;

  const handleAdd = () => {
    addToCart(fish);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "hsl(var(--foreground) / 0.5)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="glass-card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-72">
            <img
              src={fish.image}
              alt={fish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-card/80 backdrop-blur-md hover:bg-card transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="absolute bottom-5 left-5">
              <span
                className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-2 inline-block"
                style={{
                  background:
                    fish.waterType === "Seawater"
                      ? "hsl(var(--ocean-mid) / 0.85)"
                      : "hsl(var(--seafoam) / 0.85)",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                {fish.waterType}
              </span>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-card-foreground">
                {fish.name}
              </h2>

              <span className="text-accent font-bold text-xl">
                ${fish.price}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-7">
            <p className="text-muted-foreground leading-relaxed">
              {fish.description}
            </p>

            {/* AI Nutrition */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg ocean-gradient flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  AI Nutrition Insights
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Protein", value: fish.nutrition.protein },
                  { label: "Calories", value: fish.nutrition.calories },
                  { label: "Omega-3", value: fish.nutrition.omega3 },
                  { label: "Fat", value: fish.nutrition.fat },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-muted/60 rounded-xl p-4 text-center border border-border/30"
                  >
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-bold text-foreground mt-1.5 text-lg">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--seafoam)), hsl(var(--seafoam-light)))",
                  }}
                >
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  Health Benefits
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {fish.benefits.map((b) => (
                  <span
                    key={b}
                    className="px-3.5 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                      background: "hsl(var(--seafoam) / 0.08)",
                      color: "hsl(var(--seafoam))",
                      borderColor: "hsl(var(--seafoam) / 0.2)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Dishes */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--coral)), hsl(var(--coral-light)))",
                  }}
                >
                  <UtensilsCrossed className="w-4 h-4 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  Suggested Dishes
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {fish.suggestedDishes.map((d) => (
                  <span
                    key={d}
                    className="px-3.5 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                      background: "hsl(var(--coral) / 0.08)",
                      color: "hsl(var(--coral))",
                      borderColor: "hsl(var(--coral) / 0.2)",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.96 }}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 ${
                added ? "bg-seafoam text-secondary-foreground" : "btn-coral"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart — $
                  {fish.price}
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FishDetailModal;
