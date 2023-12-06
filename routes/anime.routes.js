const express = require("express")
const router = express.Router()

const Anime = require("../models/Anime.model")

router.get("/animes", (req, res, next) => {
    Anime.find()
    .then((animeArr) => {
        res.status().json(animeArr)
    })
    .catch((err) => next(err))
})

router.post("/animes", (req, res, next) => {
    Anime.create(req.body)
    .then((createdAnime) => {
        res.status().json(createdAnime)
    })
    .catch((err) => next(err))
})

router.get("/animes/:animeId", (req, res, next) => {
    const animeId = req.params
    
    Anime.findById(animeId)
    .then((animeFromDB) => {
        res.status().json(animeFromDB)
    })
    .catch((err) => next(err))
})

router.put("/animes/:animeId", (req, res, next) => {
    const animeId = req.params
    
    Anime.findByIdAndUpdate(animeId, req.body, {new: true})
    .then(() => {
        res.status().json()
    })
    .catch((err) => next(err))
})

router.delete("/animes/:animeId", (req, res, next) => {
    const animeId = req.params

    Anime.findByIdAndDelete(animeId)
    .then(() => {
        res.status().json({message: "Anime was deleted."})
    })
    .catch((err) => next(err))
})

module.exports = router