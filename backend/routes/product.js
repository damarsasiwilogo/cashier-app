const express = require("express");
const router = express.Router();

const productController = require("../controller/product");
const authMiddleware = require("../middleware/auth");
const multerUpload = require("../lib/multer");

router.post(
  "/create",
  authMiddleware.validateToken,
  multerUpload.multerUpload.single("image"),
  productController.handleCreateProduct
);
router.delete(
  "/:productId",
  authMiddleware.validateToken,
  productController.handleInActive
);

module.exports = router;
