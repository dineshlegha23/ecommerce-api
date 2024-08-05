const { BadRequestError, NotFoundError } = require("../errors");
const Order = require("../models/Order");
const Product = require("../models/Product");

const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError("Product not found");
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems.push(singleOrderItem);
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeAPI({ amount: total, currency: "inr" });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res.status(201).json({ order, clientSecret: order.client_secret });
};

const getAllOrders = async (req, res) => {
  res.send("working");
};

const getSingleOrder = async (req, res) => {
  res.send("working");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("working");
};

const updateOrder = async (req, res) => {
  res.send("working");
};

module.exports = {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
};
