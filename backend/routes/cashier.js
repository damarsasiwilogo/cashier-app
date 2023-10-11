const express = require("express");
const router = express.Router();

const cashierController = require("../controller/cashier");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  authMiddleware.validateToken,
  cashierController.handleCreateCashier
);

module.exports = router;
