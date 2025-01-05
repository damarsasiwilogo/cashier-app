const express = require("express");
const router = express.Router();

const cashierController = require("../controller/cashier");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  authMiddleware.validateToken,
  cashierController.handleCreateCashier
);
router.get(
  "/:username",
  authMiddleware.validateToken,
  cashierController.handleGetCashier
);
router.get("/", authMiddleware.validateToken, cashierController.getAllCashier);

module.exports = router;
