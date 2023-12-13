const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      unique: true,
    },
    typeOfUser: {
      type: String,
      enum: ["standard", "admin"],
      default: "standard",
    },
    animeLists: {
      favorites: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
      completed: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
      watching: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
      planToWatch: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
    },
    mangaLists: {
      favorites: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
      completed: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
      reading: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
      planToRead: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
