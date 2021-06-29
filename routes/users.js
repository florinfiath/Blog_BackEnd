const express = require("express");
const router = express.Router();
const { validateInputs } = require("../middleware/validator");
const { userValidationRules } = require("../lib/validation/userRules");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addNewUser,
  loginUser,
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post(validateInputs(userValidationRules), addNewUser);

// ROUTE FOR LOGIN
router.route("/login").post(loginUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(validateInputs(userValidationRules), updateUser);

module.exports = router;
