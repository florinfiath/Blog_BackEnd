// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("data/db.json");
// const db = low(adapter);
const isEmpty = require("lodash.isempty");

var createError = require("http-errors");

const Post = require('../models/Post')


exports.getPosts = async (req, res, next) => {
console.log("get post works")
  try {
    const posts = await Post.find();
    console.log(posts);
    if(!posts) {
      throw new createError.NotFound();
    }
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

exports.addPost = async (req, res, next) => {
  try {
    //check if req.body(post title and content)is empty?, then respond with and error
    if (isEmpty(req.body)) {
      //respond with an error message
      const error = new Error("INVALID REQUEST MESSAGE");
      error.status = 400;
      error.stack = null;
      next(error);
    } else {
      const post = new Post(req.body);
      await post.save();
        //  send back the blog with new input
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    //forward the error to the error handler
    next(error);
  }
};
exports.updatePost = async (req, res, next) => {
 
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId, req.body, {new:true});
    if(!post){
      throw new createError.NotFound();
    }
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deletePost = async (req, res, next) => {
  const inputId = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(inputId);
    //delete a post
   if (!post) {
     throw new CreateError.NotFound()
   }
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};





