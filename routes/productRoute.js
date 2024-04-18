const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isUserAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct)

module.exports = router;
