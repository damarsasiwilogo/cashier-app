const express = require("express");
const router = express.Router();

const productController = require("../controller/product");
const authMiddleware = require("../middleware/auth");

router.post(
    "/category",
    authMiddleware.validateToken, 
    productController.handleCreateCategory);

router.patch(
    "/category/:id",
    authMiddleware.validateToken,
    productController.handleUpdateCategory);

router.delete(
    "/category/:id",
    authMiddleware.validateToken,
    productController.handleDeleteCategory);

module.exports = router;