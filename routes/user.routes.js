const User = require("../models/User.model");
const express = require("express");
const router = express.Router();

router.get("/users", (req, res, next) => {
  User.find()
    .then((userArr) => {
      res.json(userArr);
    })
    .catch((err) => next(err));
});

router.put("/users/:userName", (req, res, next) => {
  const userName = req.params.userName;
  const requestBody = req.body;
  console.log(requestBody);
  console.log(userName);
  if (requestBody.listType == "favorites") {
    User.findOneAndUpdate(
      { userName },
      { $push: { favoritesList: requestBody.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
  }
  if (requestBody.listType == "completed") {
    User.findOneAndUpdate(
      { userName },
      { $push: { completedList: requestBody.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
  }
  if (requestBody.listType == "currently watching") {
    User.findOneAndUpdate(
      { userName },
      { $push: { currentlyWatchingList: requestBody.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
  }
  if (requestBody.listType == "plan to watch") {
    User.findOneAndUpdate(
      { userName },
      { $push: { planToWatchList: requestBody.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
  }
});

router.get("/users/:userName", (req, res, next) => {
  const userName = req.params.userName;
  console.log(":username route 1");
  User.find({ userName })
    .populate("favoritesList")
    .populate("currentlyWatchingList")
    .populate("completedList")
    .populate("planToWatchList")
    .then((response) => {
      res.json(response);
      console.log(":username route 2");
    })
    .catch((err) => {
      console.log(":username route 3");
      return next(err);
    });
});

module.exports = router;
