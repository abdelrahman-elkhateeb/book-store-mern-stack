const Order = require("./order.model");

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ email }).sort({ createAt: -1 });
    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this email" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error getting order by email", err);
  }
};

module.exports = {
  createOrder,
  getOrderByEmail,
};
