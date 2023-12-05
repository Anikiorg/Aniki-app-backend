const { Schema, model } = require("mongoose");

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

const User = model("User", userSchema);

module.exports = User;
