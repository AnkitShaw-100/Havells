import Cart from "../models/Cart.js";
import Fish from "../models/Fish.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { fishId, quantity } = req.body;

    if (!fishId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid fish ID or quantity" });
    }

    // Get fish details
    const fish = await Fish.findById(fishId);
    if (!fish) {
      return res.status(404).json({ message: "Fish item not found" });
    }

    if (!fish.isAvailable || fish.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.fishId.toString() === fishId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        fishId,
        sellerId: fish.sellerId,
        quantity,
        price: fish.price,
      });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    console.log(
      `Item added to cart: ${fish.name} (Qty: ${quantity}) by ${req.user.email}`
    );

    return res.status(201).json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate("items.fishId", "name freshness category")
      .populate("items.sellerId", "businessName email");

    if (!cart) {
      return res.json({
        message: "Cart is empty",
        cart: { items: [], totalPrice: 0 },
      });
    }

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { fishId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.fishId.toString() !== fishId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    console.log(`Item removed from cart by ${req.user.email}`);

    return res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { fishId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.fishId.toString() === fishId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Check stock
    const fish = await Fish.findById(fishId);
    if (fish.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available" });
    }

    item.quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    console.log(`Cart item updated by ${req.user.email}`);

    return res.json({
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    console.log(`Cart cleared by ${req.user.email}`);

    return res.json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
