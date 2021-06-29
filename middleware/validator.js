const { validationResult } = require("express-validator");

// HANDLE THE VALIDATION PROCESS USING THE VALIDATOR RULES

const validateInputs = (someRules) => {
  return [
    ...someRules,
    (req, res, next) => {
      // HANDLE THE VALIDATION RESULT
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      // if errors is not empty then respond with those errors
      const extractedErrors = [];
      const { body } = require("express-validator");

      // before module.exports (when using non-express router design)

      exports.userValidationRules = [
        body("email").isEmail().withMessage("Your email is not correct"),
        ,
        body("password")
          .trim()
          .notEmpty()
          .isLength({ min: 8 })
          .withMessage("Your password should have minimum 8 characters"),
        body("confirmPassword")
          .trim()
          .notEmpty()
          .isLength({ min: 8 })
          .withMessage("Your password should have minimum 8 characters"),
      ];

      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));
      return res.status(422).json({ errors: extractedErrors });
    },
  ];
};

module.exports = { validateInputs };
