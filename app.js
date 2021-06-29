/** EXTERNAL DEPENDENCIES */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//DEPENDENCIES FROM LOWDB

// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

/** ROUTERS */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/post");
const Post = require("./models/Post");
const User = require("./models/User");
const { validateInputs } = require("./middleware/validator");
const postValidationRules = require("./lib/validation/postRules");
const userValidationRules = require("./lib/validation/userRules");

// set CORS security for the client website
const { setCors } = require("./middleware/security");

/** INIT */
const app = express();

/** LOGGING */
app.use(logger("dev"));
// let connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5jwqg.mongodb.net/Blog?retryWrites=true&w=majority`;
/**CONNECT TO DB */
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Successfully connected to the database ");
});

// SETTING UP LOWDB database
// const adapter = new FileSync("data/db.json");
// initialize lowdd to mock db file
// const db = low(adapter);
// add defaults entries to the database
// db.defaults({ posts:[]}).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set CORS
app.use(setCors);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));
// !Allow any domain to send request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/post", postsRouter);

// ERROR Handling
app.use((err, req, res, next) => {
  //respond to the requester with the error message
  // set response status to 500
  res.status(500).send({
    error: {
      message: err.message,
    },
  });
});

/** EXPORT PATH */
module.exports = app;
