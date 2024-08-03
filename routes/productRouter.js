const express = require("express");
const {
  getAllProducts,
  uploadImage,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .post(
    [authenticateUser, authorizePermissions("admin", "user")],
    createProduct
  )
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin", "user"), uploadImage]);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(
    [authenticateUser, authorizePermissions("admin", "user")],
    updateProduct
  )
  .delete(
    [authenticateUser, authorizePermissions("admin", "user")],
    deleteProduct
  );

module.exports = router;
