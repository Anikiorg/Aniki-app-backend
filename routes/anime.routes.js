const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime.model");
const isAdmin = require ("../middleware/protected.resources");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const fileUploader = require("../config/cloudinary.config");

router.get("/animes", (req, res, next) => {
  Anime.find()
    .then((animeArr) => {
      res.json(animeArr);
    })
    .catch((err) => next(err));
});

router.post("/animes", isAdmin, (req, res, next) => {
  Anime.create(req.body)
    .then((createdAnime) => {
      res.json(createdAnime);
    })
    .catch((err) => next(err));
});






// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});





// deep populate (.populate({path:"reviews", populate:{path:"user"}}))
router.get("/animes/:animeId", (req, res, next) => {
  const animeId = req.params.animeId;

  Anime.findById(animeId)
    .populate({path:"reviews", populate:{path:"user"}})
    .then((animeFromDB) => {
      res.json(animeFromDB);
    })
    .catch((err) => next(err));
});

router.put("/animes/:animeId", isAuthenticated, (req, res, next) => {
  const animeId = req.params.animeId;
  console.log("req.body -->", req.body.content);
  console.log(req.payload);

  if (req.body.content) {
    console.log('after if')
    
    Anime.findByIdAndUpdate(animeId, {
      $push: { reviews: {user: req.payload._id, content: req.body.content} }
    }, {new:true})
      .then((response) => {
        console.log("Anime review added", response);
        res.json()
      })
      .catch((err) => {
        console.log('couldn update', err)});
  }
  Anime.findByIdAndUpdate(animeId, req.body, { new: true })
    .then(() => {
      res.json();
    })
    .catch((err) => next(err));
});

router.delete("/animes/:animeId", isAdmin, (req, res, next) => {
  const animeId = req.params.animeId;

  Anime.findByIdAndDelete(animeId)
    .then(() => {
      res.json({ message: "Anime was deleted." });
    })
    .catch((err) => next(err));
});

module.exports = router;
