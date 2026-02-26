import { validationResult } from "express-validator";
import Fish from "../models/Fish.js";

// Add new fish item (Fish seller only)
export const addFish = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    description,
    category,
    price,
    quantity,
    unit,
    freshness,
    harvestDate,
    image,
    origin,
  } = req.body;

  try {
    const fish = await Fish.create({
      sellerId: req.user._id,
      name,
      description,
      category,
      price,
      quantity,
      unit,
      freshness,
      harvestDate,
      image,
      origin,
    });

    console.log(`Fish item added: ${fish.name} by ${req.user.email}`);

    return res.status(201).json({
      message: "Fish item added successfully",
      fish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all fish items (public)
export const getAllFish = async (req, res) => {
  try {
    const fish = await Fish.find({ isAvailable: true })
      .populate("sellerId", "name email phone")
      .sort({ createdAt: -1 });

    return res.json({
      count: fish.length,
      fish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get fish items by seller (Fish seller only)
export const getSellerFish = async (req, res) => {
  try {
    const fish = await Fish.find({ sellerId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.json({
      count: fish.length,
      fish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single fish item (public)
export const getFishById = async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id).populate(
      "sellerId",
      "name email phone address"
    );

    if (!fish) {
      return res.status(404).json({ message: "Fish item not found" });
    }

    return res.json(fish);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update fish item (Fish seller only)
export const updateFish = async (req, res) => {
  try {
    let fish = await Fish.findById(req.params.id);

    if (!fish) {
      return res.status(404).json({ message: "Fish item not found" });
    }

    // Check if seller owns this fish item
    if (fish.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this item" });
    }

    const {
      name,
      description,
      category,
      price,
      quantity,
      unit,
      freshness,
      harvestDate,
      image,
      origin,
      isAvailable,
    } = req.body;

    fish.name = name || fish.name;
    fish.description = description || fish.description;
    fish.category = category || fish.category;
    fish.price = price !== undefined ? price : fish.price;
    fish.quantity = quantity !== undefined ? quantity : fish.quantity;
    fish.unit = unit || fish.unit;
    fish.freshness = freshness || fish.freshness;
    fish.harvestDate = harvestDate || fish.harvestDate;
    fish.image = image || fish.image;
    fish.origin = origin || fish.origin;
    fish.isAvailable =
      isAvailable !== undefined ? isAvailable : fish.isAvailable;

    fish = await fish.save();

    console.log(`Fish item updated: ${fish.name} by ${req.user.email}`);

    return res.json({
      message: "Fish item updated successfully",
      fish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete fish item (Fish seller only)
export const deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);

    if (!fish) {
      return res.status(404).json({ message: "Fish item not found" });
    }

    // Check if seller owns this fish item
    if (fish.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this item" });
    }

    await Fish.findByIdAndDelete(req.params.id);

    console.log(`Fish item deleted: ${fish.name} by ${req.user.email}`);

    return res.json({
      message: "Fish item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Search fish by freshness or category
export const searchFish = async (req, res) => {
  try {
    const { freshness, category, minPrice, maxPrice } = req.query;

    let filter = { isAvailable: true };

    if (freshness) {
      filter.freshness = freshness;
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const fish = await Fish.find(filter)
      .populate("sellerId", "name email phone")
      .sort({ createdAt: -1 });

    return res.json({
      count: fish.length,
      fish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Get seller analytics
export const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Get total products
    const totalProducts = await Fish.countDocuments({ sellerId });

    // Get total quantity available
    const quantityData = await Fish.aggregate([
      { $match: { sellerId } },
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    const totalQuantity = quantityData[0]?.totalQuantity || 0;

    // Get average price
    const priceData = await Fish.aggregate([
      { $match: { sellerId } },
      { $group: { _id: null, avgPrice: { $avg: "$price" } } },
    ]);

    const avgPrice = priceData[0]?.avgPrice || 0;

    // Get products by category
    const productsByCategory = await Fish.aggregate([
      { $match: { sellerId } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Get products by freshness
    const productsByFreshness = await Fish.aggregate([
      { $match: { sellerId } },
      { $group: { _id: "$freshness", count: { $sum: 1 } } },
    ]);

    return res.json({
      totalProducts,
      totalQuantity,
      avgPrice: parseFloat(avgPrice.toFixed(2)),
      productsByCategory,
      productsByFreshness,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};