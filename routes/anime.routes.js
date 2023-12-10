const express = require("express")
const router = express.Router()
const Anime = require("../models/Anime.model")

router.get("/animes", (req, res, next) => {
    Anime.find()
    .then((animeArr) => {
        res.json(animeArr)
    })
    .catch((err) => next(err))
})

router.post("/animes", (req, res, next) => {
    Anime.create(req.body)
    .then((createdAnime) => {
        res.json(createdAnime)
    })
    .catch((err) => next(err))
})

router.get("/animes/:animeId", (req, res, next) => {
    const animeId = req.params.animeId
    
    Anime.findById(animeId)
    .then((animeFromDB) => {
        res.json(animeFromDB)
    })
    .catch((err) => next(err))
})

router.put("/animes/:animeId", (req, res, next) => {
    const animeId = req.params.animeId
   /* const id = req.body.id
    if (req.body.reviewObject.content) {
        Anime.findByIdAndUpdate({id}, {$push: { reviews: req.body.reviewObject}})
        .then((response)=> {
            console.log("Anime review added")
        })
        .catch((err)=> err)
    }*/

    Anime.findByIdAndUpdate(animeId, req.body, {new: true})
    .then(() => {
        res.json()
    })
    .catch((err) => next(err))
})


router.delete("/animes/:animeId", (req, res, next) => {
    const animeId = req.params.animeId

    Anime.findByIdAndDelete(animeId)
    .then(() => {
        res.json({message: "Anime was deleted."})
    })
    .catch((err) => next(err))
})

module.exports = router