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


router.get("/users/:userName", (req, res, next) => {
  const userName = req.params.userName;
  console.log(userName)
  User.findOne({ userName })
  .populate("animeLists.favorites")
  .populate("animeLists.completed")
  .populate("animeLists.watching")
  .populate("animeLists.planToWatch")
  .populate("mangaLists.favorites")
  .populate("mangaLists.completed")
  .populate("mangaLists.reading") 
  .populate("mangaLists.planToRead")
  
  .then((response) => {
      console.log(response)
      res.json(response);
    })
    .catch((err) => {
      return next(err);
    });
});



router.put("/users/:userName/animeadd", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
switch (req.body.listType) {
  case "favorites":
    User.findOneAndUpdate(
      { userName },
      { $push: {"animeLists.favorites": req.body.id } }
    )
      .then((userFromDB) => {
        console.log('adding favoritee ', userFromDB)
        res.json(userFromDB);
      })
      .catch((err) => {
        console.log('error adding fav ', err)
        next(err)});
    break
  case "completed":
    User.findOneAndUpdate(
      { userName },
      { $push: { "animeLists.completed": req.body.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
      break

    case "currently watching":
      User.findOneAndUpdate(
        { userName },
        { $push: { "animeLists.currentlyWatching": req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
        break
    case "plan to watch":
      User.findOneAndUpdate(
        { userName },
        { $push: { "animeLists.planToWatch": req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
  }
});


router.put("/users/:userName/animeremove", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
  
switch(req.body.case) {
  case "favorites":
    User.findOneAndUpdate({userName} , { $pull: {"animeLists.favorites": req.body.animeId} }, {new:true} )
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
    User.findOneAndUpdate({userName} , { $pull: {"animeLists.planToWatch": req.body.animeId} }, {new:true} )
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
    User.findOneAndUpdate({userName} , { $pull: {"animeLists.watching": req.body.animeId} }, {new:true} )
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
    User.findOneAndUpdate({userName} , { $pull: {"animeLists.completed": req.body.animeId} }, {new:true} )
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


router.put("/users/:userName/mangaadd", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
switch (req.body.listType) {
  case "favorites":
    User.findOneAndUpdate(
      { userName },
      { $push: {"mangaLists.favorites": req.body.id } }
    )
      .then((userFromDB) => {
        console.log('adding favorite ', userFromDB)
        res.json(userFromDB);
      })
      .catch((err) => {
        console.log('error adding fav ', err)
        next(err)});
    break
  case "completed":
    User.findOneAndUpdate(
      { userName },
      { $push: { "mangaLists.completed": req.body.id } }
    )
      .then((userFromDB) => {
        res.json(userFromDB);
      })
      .catch((err) => next(err));
      break

    case "currently reading":
      User.findOneAndUpdate(
        { userName },
        { $push: { "animeLists.reading": req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
        break
    case "plan to read":
      User.findOneAndUpdate(
        { userName },
        { $push: { "animeLists.planToRead": req.body.id } }
      )
        .then((userFromDB) => {
          res.json(userFromDB);
        })
        .catch((err) => next(err));
  }
});
module.exports = router;


router.put("/users/:userName/mangaremove", isAuthenticated, (req, res, next) => {
  const userName = req.params.userName;
  
switch(req.body.case) {
  case "favorites":
    User.findOneAndUpdate({userName} , { $pull: {"mangaList.favorites": req.body.Id} }, {new:true} )
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
  case "planToRead":
    User.findOneAndUpdate({userName} , { $pull: {"mangaLists.planToRead": req.body.Id} }, {new:true} )
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
  case "currentlyReading":
    User.findOneAndUpdate({userName} , { $pull: {"mangaLists.reading": req.body.Id} }, {new:true} )
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
    User.findOneAndUpdate({userName} , { $pull: {"mangaLists.completed": req.body.Id} }, {new:true} )
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