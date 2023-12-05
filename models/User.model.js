const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userName: {
      type: String,
      required: [true, "Name is required."],
      unique: true
    },
    typeOfUser: { 
      type: String, 
      enum: ["standard", "admin"], 
      default: "standard" 
    },
    favouritesList: [Object]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema)
module.exports = User;
