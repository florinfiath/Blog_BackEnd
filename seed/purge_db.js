var faker = require("faker");
const mongoose = require("mongoose");
const Post = require("../models/Post");



console.log("I shall purge all posts");

(async function() {
  /**CONNECT TO DB */
  mongoose.connect(
    "mongodb+srv://Florin:test1234@cluster0.5jwqg.mongodb.net/mediaStore?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("error", console.error);
  mongoose.connection.on("open", function() {
    console.log("Database connection established...");
  });

  console.log("I will purge all the old posts");

  try {
    await Post.deleteMany({});
    console.log("Posts purged");
  } catch (err) {
    console.error(err);
  }
  mongoose.connection.close();
})();
