import mongoose from "mongoose";

const fishSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide fish name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide fish description"],
    },
    category: {
      type: String,
      enum: ["Fresh Water", "Salt Water", "Shell Fish", "Other"],
      required: [true, "Please select a category"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: 0,
    },
    unit: {
      type: String,
      enum: ["kg", "lb", "pieces", "dozen"],
      default: "kg",
    },
    freshness: {
      type: String,
      enum: [
        "Super Fresh (Today)",
        "Fresh (1-2 Days)",
        "Good (2-3 Days)",
        "Average (3-4 Days)",
      ],
      required: [true, "Please select freshness level"],
    },
    harvestDate: {
      type: Date,
      required: [true, "Please provide harvest date"],
    },
    image: {
      type: String,
      default: null,
    },
    origin: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    recipeVideos: [
      {
        id: Number,
        title: String,
        description: String,
        searchQuery: String,
        url: String,
        videoId: String,
        thumbnail: String,
        thumbnailHQ: String,
        thumbnailMax: String,
        channel: String,
        duration: String,
      }
    ],
    mlAnalysis: {
      freshnessScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },
      isCertified: {
        type: Boolean,
        default: false,
      },
      analysisDetails: {
        colorScore: Number,
        textureScore: Number,
        transparencyScore: Number,
        eyesCondition: String,
        smellIndicator: String,
        overallQuality: String,
        recommendations: String,
        analyzedAt: Date,
      },
      mlModel: {
        type: String,
        default: "gemini-3.1-pro-preview",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Fish", fishSchema);
