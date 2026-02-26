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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Fish", fishSchema);
