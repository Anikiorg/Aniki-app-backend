const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  name: {
    nameJP: { type: String, required: true },
    nameEN: { type: String, required: true },
  },
  description: { type: String, required: true },
  imageURL: { type: String, default: "" }, //default img??
  episodes: { type: Number, default: "TBA" },
  genre: {
    type: [String],
    enum: [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Suspense",
      "Gore",
    ],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Airing Now", "Finished Airing", "Upcoming"],
  },
  premiered: { type: String, default: "TBA" },
  studios: { type: [String], required: true },
  rating: { type: Number, min: 1, max: 10 },
  ageRating: { type: String, default: "TBD" },
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
    },
  ],
});

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
