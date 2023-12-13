const express = require("express")
const router = express.Router()
const Manga = require("../models/Manga.model")
const isAdmin = require ("../middleware/protected.resources")

router.get("/manga", (req, res, next) => {
    Manga.find()
    .then((mangaArr) => {
        res.json(mangaArr)
    })
    .catch((err) => next(err))
})

router.post("/manga", isAdmin, (req, res, next) => {
    Manga.create(req.body)
    .then((createdManga) => {
        res.json(createdManga)
    })
    .catch((err) => next(err))
})

router.get("/manga/:mangaId", (req, res, next) => {
    const mangaId = req.params.mangaId
    
    Manga.findById(mangaId)
    .then((mangaFromDB) => {
        res.json(mangaFromDB)
    })
    .catch((err) => next(err))
})

router.put("/manga/:mangaId", isAdmin, (req, res, next) => {
    const mangaId = req.params.mangaId
    
    Manga.findByIdAndUpdate(mangaId, req.body, {new: true})
    .then(() => {
        res.json()
    })
    .catch((err) => next(err))
})

router.delete("/manga/:mangaId",isAdmin, (req, res, next) => {
    const mangaId = req.params.mangaId

    Manga.findByIdAndDelete(mangaId)
    .then(() => {
        res.json({message: "Manga was deleted."})
    })
    .catch((err) => next(err))
})

module.exports = router