const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./User");

const giftSchema = new Schema({
  name: String,
  // details: String,
  price: Number,
  imageUrl: { type: String },
  // quantity: Number,
  giftLink: String,
  // fulfilled: Boolean,
  // importance: { type: Number, min: 1, max: 5 },
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: "Wishlist"
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;
