const express = require("express");
const router = express.Router();

const productController = require("../controller/product");
const authMiddleware = require("../middleware/auth");
const multerUpload = require("../lib/multer");

router.post(
  "/category",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  productController.handleCreateCategory
);

router.patch(
  "/category/:id",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  productController.handleUpdateCategory
);

router.delete(
  "/category/:id",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  productController.handleDeleteCategory
);

router.post(
  "/create",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  multerUpload.multerUpload.single("image"),
  productController.handleCreateProduct
);
router.patch(
  "/:productId",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  multerUpload.multerUpload.single("image"),
  productController.handleUpdateProduct
);
router.delete(
  "/:productId",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  productController.handleInActive
);
router.get(
  "/:page", 
  authMiddleware.validateToken,
  productController.sortProducts,
  productController.getProducts
  );
router.get(
  "/detail/:productId",
  authMiddleware.validateToken,
  productController.getProductById
);

module.exports = router;
