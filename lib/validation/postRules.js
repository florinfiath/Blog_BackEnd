const { body } = require("express-validator");

exports.postValidationRules = [
  body("title")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Your title should have minimum 5 characters")
    .isLength({ max: 120 })
    .withMessage("Your title should have maximum 120 characters"),
  body("content")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Your content should have minimum  5 characters")
];
