const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const Gift = require("../models/Gift");
const User = require("../models/User");

/* GET all wishlists */
router.get("/", (req, res, next) => {
  Wishlist.find({})
    .populate("gifts")
    .then(wishlists => {
      res.json(wishlists);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/* GET user wishlists */

router.get("/mywishlists", (req, res, next) => {
  Wishlist.find({ owner: req.user._id })
    .populate("gifts")
    .then(wishlists => {
      res.json(wishlists);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET specific project
router.get("/:id", (req, res) => {
  // return 1 project w/ a given id
  const wishlistId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(wishlistId)) {
    res.status(400).json({ message: "WishlistId is not valid" });
    return;
  }

  Wishlist.findById(wishlistId)
    .populate("gifts")
    .then(wishlist => {
      console.log("populate gift", wishlist);
      if (!wishlist) {
        res.status(404).json({ message: "Wishlist not found" });
      } else res.json(wishlist);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST a wishlist
router.post("/", (req, res) => {
  const { name, description, private, eventDate, headerImg } = req.body;
  Wishlist.create({
    name,
    description,
    private,
    eventDate,
    headerImg,
    owner: req.user._id
  })
    .then(wishlist => {
      return User.findByIdAndUpdate(req.user._id, {
        $push: { wishlists: wishlist._id }
      });
    })
    .then(wishlist => {
      res.json(wishlist);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Update a wishlist
router.put("/:id", (req, res) => {
  const wishlistId = req.params.id;
  const { name, description, private, eventDate, headerImg } = req.body;
  Wishlist.findByIdAndUpdate(
    wishlistId,
    {
      name,
      description,
      private,
      headerImg,
      owner: req.user._id
    },
    { new: true }
  )
    .populate("gifts")
    .then(wishlist => {
      res.json(wishlist);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE a wishlist including its gifts
router.delete("/delete/:id", (req, res) => {
  const wishlistId = req.params.id;

  Wishlist.findByIdAndDelete(wishlistId)
    .then(wishlist => {
      // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `wishlist.gifts` array

      User.findByIdAndUpdate(req.user._id, {
        $pull: { wishlists: wishlistId }
      }).then(() => {
        console.log("deleted wishlist link");
      });
      Gift.deleteMany({ _id: { $in: wishlist.gifts } }).then(() =>
        res.json({ message: "ok" })
      );
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
