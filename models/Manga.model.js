const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mangaSchema = new Schema ({
    name: {
        nameJP: {type: String, required: true},
        nameEN: {type: String, required: true}
    },
    description: {type: String, required: true},
    imageURL: {type: String, default: ""}, //default img??
    volumes: {type: Number},
    genre: {type: [String], required: true}, // enum: [...]?
    status: {
        type: String,
        required: true,
        enum: ["Airing Now", "Finished Airing", "Upcoming"],
    },
    published: {type: String, default: "TBA"},
    authors: {type: [String], required: true},
    rating: {type: Number, min: 1, max: 10},
    ageRating: {type: String, default: "TBD"},
    reviews: [
        {
            author: {type: Number}/* {type: mongoose.Schema.Types.ObjectId, ref: "User"} */,
            content: {type: String, required: true}
        }
    ]
})

const Manga = mongoose.model("Manga", mangaSchema)

module.exports = Manga