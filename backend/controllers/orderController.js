import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Fish from "../models/Fish.js";

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { deliveryAddress, phoneNumber, paymentMethod, notes } = req.body;

    if (!deliveryAddress || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Delivery address and phone number are required" });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.fishId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Prepare order items and check stock
    const orderItems = [];
    for (const item of cart.items) {
      const fish = await Fish.findById(item.fishId);
      if (!fish || fish.quantity < item.quantity) {
        return res.status(400).json({
          message: `${fish.name} has insufficient quantity available`,
        });
      }

      orderItems.push({
        fishId: item.fishId,
        sellerId: item.sellerId,
        fishName: fish.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      });

      // Reduce fish quantity
      fish.quantity -= item.quantity;
      if (fish.quantity === 0) {
        fish.isAvailable = false;
      }
      await fish.save();
    }

    // Create order
    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalPrice: cart.totalPrice,
      deliveryAddress,
      phoneNumber,
      paymentMethod: paymentMethod || "Cash on Delivery",
      notes,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    console.log(`Order created: ${order.orderId} by ${req.user.email}`);

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (user)
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.fishId", "name freshness category")
      .populate("items.sellerId", "businessName email")
      .sort({ createdAt: -1 });

    return res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get order by ID (user)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.fishId", "name freshness category")
      .populate("items.sellerId", "businessName email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get seller's orders (admin)
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.sellerId": req.admin._id })
      .populate("items.fishId", "name freshness category")
      .populate("items.sellerId", "businessName email")
      .sort({ createdAt: -1 });

    return res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update order status (seller/admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if admin is a seller in this order
    const isSellerInOrder = order.items.some(
      (item) => item.sellerId.toString() === req.admin._id.toString()
    );

    if (!isSellerInOrder) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this order" });
    }

    order.status = status;
    await order.save();

    console.log(
      `Order status updated: ${order.orderId} to ${status} by ${req.admin.email}`
    );

    return res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: "Payment status is required" });
    }

    const validPaymentStatuses = ["Pending", "Completed", "Failed"];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this order" });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    console.log(`Payment status updated: ${order.orderId} to ${paymentStatus}`);

    return res.json({
      message: "Payment status updated",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this order" });
    }

    if (!["Pending", "Confirmed"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Cannot cancel order in current status" });
    }

    order.status = "Cancelled";
    await order.save();

    // Restore fish quantities
    for (const item of order.items) {
      let fish = await Fish.findById(item.fishId);
      fish.quantity += item.quantity;
      fish.isAvailable = true;
      await fish.save();
    }

    console.log(`Order cancelled: ${order.orderId} by ${req.user.email}`);

    return res.json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
