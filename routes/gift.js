const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gift = require("../models/Gift");
const Wishlist = require("../models/Wishlist");
//Get all gifts

router.get("/:id", (req, res) => {
  const giftId = req.params.id;

  Gift.findById(giftId)
    .then(gift => {
      res.json(gift);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//post a gift
router.post("/add/:id", (req, res) => {
  let wishlistId = req.params.id;
  const {
    name,
    price,
    // quantity,
    //importance,
    details
  } = req.body;
  console.log(req.body);
  Gift.create({
    name,
    details,
    price,
    // fulfilled: false,
    // importance: 0,
    wishlist: req.params.id,
    owner: req.user._id
  })
    .then(gift => {
      return Wishlist.findByIdAndUpdate(wishlistId, {
        $push: { gifts: gift._id }
      })
        .populate("gifts")
        .then(wishlist => {
          res.json(wishlist);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//update a gift
router.put("/:id", (req, res, next) => {
  const giftId = req.params.id;
  const {
    name,
    details,
    price,
    quantity,
    giftLink,
    giftImg,
    fulfilled,
    importance,
    wishlistId
  } = req.body;

  Gift.findByIdAndUpdate(
    giftId,
    {
      name,
      details,
      price,
      quantity,
      giftLink,
      giftImg,
      fulfilled,
      importance
    },
    { new: true }
  )
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//delete a gift
router.delete("/delete/:id", (req, res, next) => {
  const giftId = req.params.id;

  Gift.findByIdAndDelete(giftId)
    .then(gift => {
      return Wishlist.findByIdAndUpdate(gift.wishlist, {
        $pull: { gifts: gift._id },
        new: true
      });
    })
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/gifts/view/:id", (req, res, next) => {
  Gift.find({ owner: req.params.id })
    .then(gifts => {
      console.log(gifts);
      res.json(gifts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
