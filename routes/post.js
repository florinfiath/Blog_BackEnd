const express = require('express');
const { validateInputs } = require("../middleware/validator");
const { postValidationRules } = require("../lib/validation/postRules");

// create router 

const router = express.Router();

const {
    addPost,
    getPosts,
    deletePost,
    updatePost} = require("../controllers/postController");
  
router.route("/")
.get(getPosts)
.post(validateInputs(postValidationRules), addPost);
router.route("/:id")
.delete(deletePost)
.put(validateInputs(postValidationRules), updatePost);


module.exports = router;

