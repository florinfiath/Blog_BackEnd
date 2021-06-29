const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
// METHOD  WHICH GENERATES AN AUTHENTICATION TOKEN USING JWT
UserSchema.methods.generateAuthToken = function () {
  //user found by email
  const user = this;
  // JWT SIGN
  //PAYLOAD:'= user id
  //SECRET KEY:"FwB43-2-100%"
  //to String: parse the result to a string
  const token = jwt
    .sign({ _id: user._id.toHexString() }, "FwB43-2-100%")
    .toString();
  return token;
};
// GET PUBLIC FIELDS
UserSchema.methods.getPublicFields = function () {
  var returnObject = {
    firstname: this.firstName,
    lastName: this.lastName,
    email: this.email,
    _id: this._id,
  };
  return returnObject;
};
// CHECK PASSWORD
UserSchema.methods.checkPassword = function (password) {
  const user = this;
  // COMPARE THE PASSWORDS
  // IF CORRECT ; THEN RETURNS TRUE
  return bcrypt.compare(password, user.password);
};

// Hook TO BE EXECUTED BETWEEN MIDDLEWARES
UserSchema.pre("save", async function(next){
  // CHECK IF THE PASSWORD HAS CHANGED (ADDED)
  // IF PASSWORD DIDN'T CHANGE , LEAVE THE HOOK
 if(this.isModified("password")) {
   this.password = await bcrypt.hash(this.password, 10);
}else{
  //LEAVE WITHOUT CHANGES
  next();
}
});
module.exports = mongoose.model("User", UserSchema);
