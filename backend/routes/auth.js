const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/", authController.handleLogin);
//* patch for admin
router.patch(
  "/account/admin",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  multerUpload.single("file"),
  authController.updateProfile
);
//* patch for cashier
router.patch(
  "/account/cashier",
  authMiddleware.validateToken,
  authMiddleware.checkUser,
  multerUpload.single("file"),
  authController.updateProfile
);
//* get all user
router.get(
  "/account/profile/:id",
  authMiddleware.validateToken,
  authController.getAccountProfile
);
//* forgot password
router.post("/forgot-password", authController.forgotPassword);
//* reset password
router.post("/reset-password", authController.resetPassword);

module.exports = router;
