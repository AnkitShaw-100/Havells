import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    items: [
      {
        fishId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fish",
          required: true,
        },
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin",
          required: true,
        },
        fishName: String,
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    phoneNumber: String,
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: [
        "Credit Card",
        "Debit Card",
        "UPI",
        "Net Banking",
        "Cash on Delivery",
      ],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Generate unique order ID before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    this.orderId = `ORD-${timestamp}-${random}`;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
