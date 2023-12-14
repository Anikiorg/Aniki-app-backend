const express = require("express")
const router = express.Router()
const isAdmin = require ("../middleware/protected.resources")
const { isAuthenticated } = require("../middleware/jwt.middleware")
const Manga = require("../models/Manga.model")

const fileUploader = require("../config/cloudinary.config");

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





router.get("/manga/:mangaId", (req, res, next) => {
    const mangaId = req.params.mangaId
    
    Manga.findById(mangaId)
    .populate({path:"reviews", populate:{path:"user"}})
    .then((mangaFromDB) => {
        res.json(mangaFromDB)
    })
    .catch((err) => next(err))
})

router.put("/manga/:mangaId", isAuthenticated, (req, res, next) => {
    const mangaId = req.params.mangaId;
    console.log("req.body -->", req.body.content);
    console.log(req.payload);

    if (req.body.content) {
      console.log('after if')
      
      Manga.findByIdAndUpdate(mangaId, {
        $push: { reviews: {user: req.payload._id, content: req.body.content} }
      }, {new:true})
        .then((response) => {
          console.log("Manga review added", response);
          res.json()
        })
        .catch((err) => {
          console.log('couldn update', err)});
    }
    Manga.findByIdAndUpdate(mangaId, req.body, { new: true })
    .then(() => {
      res.json();
    })
    .catch((err) => next(err));
  });

router.delete("/manga/:mangaId",isAdmin, (req, res, next) => {
    const mangaId = req.params.mangaId

    Manga.findByIdAndDelete(mangaId)
    .then(() => {
        res.json({message: "Manga was deleted."})
    })
    .catch((err) => next(err))
})

module.exports = router