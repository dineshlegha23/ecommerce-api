const Review = require("../models/Review");
const Product = require("../models/Product");

const { checkPermissions } = require("../utils");
const { NotFoundError, BadRequestError } = require("../errors");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  if (!productId) {
    throw new BadRequestError("Please provide product id");
  }

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError("Already submitted review for this product");
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(201).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(200).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`Review not found with id : ${reviewId}`);
  }
  res.status(200).json(review);
};

const updateReview = async (req, res) => {
  res.send("Working");
};

const deleteReview = async (req, res) => {
  res.send("Working");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
