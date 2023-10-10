const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/", authController.handleLogin);
router.patch(
  "/account",
  authMiddleware.validateToken,
  authController.updateProfile
);
router.post(
  "/account/picture",
  authMiddleware.validateToken,
  multerUpload.single("file"),
  authController.handleUploadPhoto
);

module.exports = router;
