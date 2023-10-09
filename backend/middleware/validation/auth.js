const { body, validationResult } = require("express-validator");

exports.registerValidationRules = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "username must be at least 5 characters long and at most 20 characters long"
    ),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minSymbols: 0,
      minNumbers: 0,
    })
    .withMessage("Password must be at least have 1 uppercase character"),
  body("email").isEmail().withMessage("Incorrect email format."),
  body("firstName")
    .optional()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage(
      "First name must be at least 3 characters long and at most 20 characters long"
    ),
  body("lastName")
    .optional()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage(
      "Last name must be at least 3 characters long and at most 20 characters long"
    ),
];

exports.applyRegisterValidation = [
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        ok: false,
        message: "failed data validation broo!!",
        errors: result.errors,
      });
      return;
    }
    next();
  },
];
