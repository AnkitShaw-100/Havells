import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("aqua-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("aqua-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (fish) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.fish.id === fish.id);

      if (existing) {
        return prev.map((item) =>
          item.fish.id === fish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { fish, quantity: 1 }];
    });
  };

  const removeFromCart = (fishId) => {
    setItems((prev) => prev.filter((item) => item.fish.id !== fishId));
  };

  const updateQuantity = (fishId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(fishId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.fish.id === fishId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.fish.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};