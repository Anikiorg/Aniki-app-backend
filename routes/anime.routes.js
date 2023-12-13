const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime.model");
const isAdmin = require ("../middleware/protected.resources");
const { isAuthenticated } = require("../middleware/jwt.middleware");

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

router.get("/animes/:animeId", (req, res, next) => {
  const animeId = req.params.animeId;

  Anime.findById(animeId)
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
