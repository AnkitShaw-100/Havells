import { validationResult } from "express-validator";
import Fish from "../models/Fish.js";
import { generateRecipeVideos, analyzeFishFreshnessWithGemini } from "../utils/geminiService.js";

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
    origin,
    recipeVideoUrl,
  } = req.body;

  try {
    // Handle Cloudinary image upload
    let image = null;

    console.log("📝 Request file object:", req.file); // Debug log
    
    if (req.file) {
      // multer-storage-cloudinary provides: secure_url, url, public_id, etc.
      image = req.file;
      console.log("🖼️  Full file object keys:", Object.keys(req.file)); // Debug log
      console.log("🖼️  Image URL from Cloudinary:", image); // Debug log
      
      if (!image) {
        console.error("❌ No URL found in file object");
        console.error("File object:", JSON.stringify(req.file, null, 2));
      }
    } else {
      console.log("⚠️  No file in req.file"); // Debug log
      console.log("Request body:", req.body);
    }

    // Create fish item FIRST with image (don't wait for ML analysis)
    console.log("📦 Creating fish with data:", {
      name,
      category,
      price,
      quantity,
      image,
      freshness,
    });
    
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
      image: image || null, // Ensure null if no image
      origin,
      recipeVideoUrl,
      mlAnalysis: {
        freshnessScore: null,
        isCertified: false,
        analysisDetails: {
          colorScore: 0,
          textureScore: 0,
          eyesCondition: "Analyzing...",
          smellIndicator: "Analyzing...",
          overallQuality: "Analyzing...",
          recommendations: "Analyzing...",
          analyzedAt: new Date(),
        },
        mlModel: "gemini-2.0-flash",
      },
    });

    console.log(`✅ Fish item created: ${fish._id}`);
    console.log(`   Name: ${fish.name}`);
    console.log(`   Image URL: ${fish.image}`);
    console.log(`   By: ${req.user.email}`);

    // Send response immediately (don't wait for ML analysis)
    res.status(201).json({
      message: "Fish item added successfully",
      fish,
    });

    // Run ML analysis in background (asynchronous, non-blocking)
    if (image) {
      console.log("🤖 Starting background ML analysis for image:", image);
      runMLAnalysisAsync(fish._id, image).catch((err) => {
        console.error("⚠️  Background ML analysis error:", err.message);
      });
    } else {
      console.log("⚠️  No image to analyze");
    }

  } catch (error) {
    console.error("❌ Error adding fish:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

/**
 * Run ML analysis asynchronously in the background using Gemini Vision API
 * Fetches the image and updates mlAnalysis without blocking the request
 */
const runMLAnalysisAsync = async (fishId, imageUrl) => {
  try {
    console.log(`🤖 Gemini Vision analysis started for fish ${fishId}`);
    console.log(`   Image URL: ${imageUrl}`);
    
    // Use Gemini Vision API to analyze the image directly from URL
    const mlAnalysis = await analyzeFishFreshnessWithGemini(imageUrl);
    console.log(mlAnalysis)
    // Check if analysis failed (fallback was used)
    if (mlAnalysis.isAnalysisFailed) {
      console.error(`❌ Gemini analysis FAILED for fish ${fishId}`);
      console.error(`   Error: ${mlAnalysis.error}`);
      console.error("   CHECK BACKEND LOGS ABOVE FOR DETAILED ERROR INFO");
    } else {
      console.log(`✅ Gemini analysis complete: ${mlAnalysis.freshnessScore}%`);
    }

    // Update fish document with Gemini analysis results
    await Fish.findByIdAndUpdate(fishId, { mlAnalysis }, { returnDocument: 'after' });
    console.log(`💾 Analysis results saved to database for fish ${fishId}`);

  } catch (err) {
    console.error(`❌ Gemini analysis async error for fish ${fishId}:`, err.message);
    console.error(`   Full error:`, err);
    
    // Save fallback ML analysis if Gemini call fails
    try {
      const fallbackAnalysis = {
        freshnessScore: 70,
        isCertified: false,
        analysisDetails: {
          colorScore: 70,
          textureScore: 70,
          eyesCondition: "⚠️ Analysis Failed - See backend logs",
          smellIndicator: "Check backend logs for error details",
          overallQuality: "Unable to determine",
          recommendations: "Please verify GEMINI_API_KEY is set in .env",
          analyzedAt: new Date().toISOString(),
        },
        mlModel: "gemini-2.0-flash",
        error: `Analysis Failed: ${err.message}`,
        isAnalysisFailed: true,
      };
      
      await Fish.findByIdAndUpdate(fishId, { mlAnalysis: fallbackAnalysis });
      console.log(`💾 Fallback analysis saved for fish ${fishId}`);
    } catch (updateErr) {
      console.error(`❌ Failed to save fallback analysis:`, updateErr.message);
    }
  }
};

// Get all fish items (public)
export const getAllFish = async (req, res) => {
  try {
    let fish = await Fish.find({ isAvailable: true })
      .populate("sellerId", "name email phone")
      .sort({ createdAt: -1 });

    // Generate recipe videos in background (non-blocking)
    // fish.forEach((item) => {
    //   if (!item.recipeVideos || item.recipeVideos.length === 0) {
    //     generateRecipeVideos(item.name)
    //       .then((videos) => {
    //         Fish.findByIdAndUpdate(
    //           item._id,
    //           { recipeVideos: videos },
    //           { returnDocument: 'after' }
    //         ).catch((err) => console.error("Error saving recipe videos:", err));
    //         console.log(`✅ Recipe videos generated for ${item.name}`);
    //       })
    //       .catch((err) => console.error("Error generating recipe videos:", err));
    //   }
    // });
    console.log(fish)
    return res.json({
      count: fish.length,
      fish,
    });
  } catch (error) {
    console.error("❌ Error fetching all fish:", error);
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
    let fish = await Fish.findById(req.params.id).populate(
      "sellerId",
      "name email phone address"
    );

    if (!fish) {
      return res.status(404).json({ message: "Fish item not found" });
    }

    // Generate recipe videos using Gemini AI if not already present (non-blocking)
    if (!fish.recipeVideos || fish.recipeVideos.length === 0) {
      generateRecipeVideos(fish.name)
        .then((videos) => {
          Fish.findByIdAndUpdate(
            fish._id,
            { recipeVideos: videos },
            { returnDocument: 'after' }
          ).catch((err) => console.error("Error saving recipe videos:", err));
          console.log(`✅ Recipe videos generated for ${fish.name}`);
        })
        .catch((err) => console.error("Error generating recipe videos:", err));
    }

    return res.json(fish);
  } catch (error) {
    console.error("❌ Error fetching fish:", error);
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
      origin,
      isAvailable,
      recipeVideoUrl,
    } = req.body;

    fish.name = name || fish.name;
    fish.description = description || fish.description;
    fish.category = category || fish.category;
    fish.price = price !== undefined ? price : fish.price;
    fish.quantity = quantity !== undefined ? quantity : fish.quantity;
    fish.unit = unit || fish.unit;
    fish.freshness = freshness || fish.freshness;
    fish.harvestDate = harvestDate || fish.harvestDate;
    
    // Handle Cloudinary image upload
    if (req.file) {
      fish.image = req.file; // req.file is already the URL string from upload middleware
    }
    
    fish.origin = origin || fish.origin;
    fish.recipeVideoUrl = recipeVideoUrl || fish.recipeVideoUrl;
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

/**
 * TEST ENDPOINT - Test Gemini Vision API analysis on an image URL
 */
export const testMLAnalysis = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Missing imageUrl",
        hint: "Provide imageUrl in request body",
      });
    }

    console.log("\n🧪 TESTING GEMINI VISION ANALYSIS");
    console.log("Image URL:", imageUrl);

    const geminiResult = await analyzeFishFreshnessWithGemini(imageUrl);

    return res.status(200).json({
      message: "✅ GEMINI VISION ANALYSIS TEST PASSED",
      result: geminiResult,
    });
  } catch (error) {
    console.error("❌ GEMINI TEST ERROR:", error.message);
    return res.status(500).json({
      message: "Gemini Vision analysis test failed",
      error: error.message,
    });
  }
};