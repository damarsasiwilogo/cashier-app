const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/", authController.handleLogin);
router.patch(
  "/account/admin",
  authMiddleware.validateToken,
  authMiddleware.checkUserRole,
  multerUpload.single("file"),
  authController.updateProfile
);
router.patch(
  "/account/cashier",
  authMiddleware.validateToken,
  authMiddleware.checkUser,
  multerUpload.single("file"),
  authController.updateProfile
);
router.get(
  "/account/profile/:id",
  authMiddleware.validateToken,
  authController.getAccountProfile
);
// router.post(
//   "/account/picture",
//   authMiddleware.validateToken,
//   multerUpload.single("file"),
//   authController.handleUploadPhoto
// );

module.exports = router;
