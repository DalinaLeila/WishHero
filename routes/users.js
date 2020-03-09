const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET all Users page */
router.get("/", (req, res, next) => {
  User.find({})
    .populate("wishlists")
    .populate("savedGifts")
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:username", (req, res, next) => {
  const username = req.params.username;
  console.log("USERNAME", username);
  if (username) {
    User.find({ username: new RegExp(username, "i") })
      .populate("wishlists")
      .populate("savedGifts")
      .then(user => {
        res.json(user);
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    User.find({})
      .populate("wishlists")
      .populate("savedGifts")
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.get("/profile/:id", (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .populate("wishlists")
    .populate("savedGifts")
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/follow/:id", (req, res, next) => {
  //this is only for following - still need to do pull for unfollow
  const profileId = req.params.id;
  User.findById(profileId).then(user => {
    if (user.followers.includes(req.user._id)) {
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: profileId } },
        { new: true }
      ).then(res => console.log("unfollowed"));
      User.findByIdAndUpdate(
        profileId,
        { $pull: { followers: req.user._id } },
        { new: true }
      ).then(user => {
        res.json(user);
      });
    } else {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: profileId } },
        { new: true }
      ).then(res => console.log("following"));
      User.findByIdAndUpdate(
        profileId,
        { $push: { followers: req.user._id } },
        { new: true }
      ).then(user => {
        res.json(user);
      });
    }
  });
});

module.exports = router;
