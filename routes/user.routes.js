const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/users", (req, res, next) => {
  User.find()
    .then((userArr) => {
      res.json(userArr);
    })
    .catch((err) => next(err));
});

router.put("/users/:userName/push", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
switch (req.body.listType) {
  case "favorites":
    User.findOneAndUpdate(
      { userName },
      { $push: { favoritesList: req.body.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
    break
  case "completed":
    User.findOneAndUpdate(
      { userName },
      { $push: { completedList: req.body.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
      break

    case "currently watching":
      User.findOneAndUpdate(
        { userName },
        { $push: { currentlyWatchingList: req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
        break
    case "plan to watch":
      User.findOneAndUpdate(
        { userName },
        { $push: { planToWatchList: req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
  }
});

router.get("/users/:userName", (req, res, next) => {
  const userName = req.params.userName;
  User.find({ userName })
    .populate("favoritesList")
    .populate("currentlyWatchingList")
    .populate("completedList")
    .populate("planToWatchList")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/users/:userName/pull", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
  
switch(req.body.case) {
  case "favorites":
    User.findOneAndUpdate({userName} , { $pull: {favoritesList: req.body.animeId} }, {new:true} )
    .then((response) => {
      console.log(response)
      res.json(response)
        })
    .catch((err) => {
      console.log(err)
      next(err)
    }
      );
    break
  case "planToWatch":
    User.findOneAndUpdate({userName} , { $pull: {planToWatchList: req.body.animeId} }, {new:true} )
    .then((response) => {
      console.log(response)
      res.json(response)
        })
    .catch((err) => {
      console.log(err)
      next(err)
    }
      );
    break
  case "currentlyWatching":
    User.findOneAndUpdate({userName} , { $pull: {currentlyWatchingList: req.body.animeId} }, {new:true} )
    .then((response) => {
      console.log(response)
      res.json(response)
        })
    .catch((err) => {
      console.log(err)
      next(err)
    }
      );
    break
  case "completed":
    User.findOneAndUpdate({userName} , { $pull: {completedList: req.body.animeId} }, {new:true} )
    .then((response) => {
      console.log(response)
      res.json(response)
        })
    .catch((err) => {
      console.log(err)
      next(err)
    }
      );
      
      default:
      break;
}
  
}
)

module.exports = router;
