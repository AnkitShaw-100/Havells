import { useState } from "react";
import { ShoppingCart, Eye, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion} from "framer-motion";

const FishCard = ({ fish, index, onSelect }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(fish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden group cursor-pointer hover:shadow-card-hover transition-shadow duration-500"
      onClick={() => onSelect(fish)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={fish.image}
          alt={fish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick view */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(fish);
          }}
          className="absolute top-3 right-3 p-2.5 rounded-xl bg-card/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-4 h-4 text-foreground" />
        </motion.button>

        {/* Badge */}
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md"
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

        {/* Price overlay on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-md text-accent font-bold text-lg shadow-lg">
            ${fish.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-display text-base font-semibold text-card-foreground leading-tight">
            {fish.name}
          </h3>
          <span className="text-accent font-bold text-base ml-2 shrink-0">
            ${fish.price}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {fish.description}
        </p>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.96 }}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            added ? "bg-seafoam text-secondary-foreground" : "btn-coral"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FishCard;
