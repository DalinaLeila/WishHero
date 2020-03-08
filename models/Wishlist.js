const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./User");

const wishListSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  private: { type: Boolean, defualt: true },
  headerImg: { type: String, defualt: "../client/src/assets/pic.jpg" },
  eventDate: Date,
  gifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gift"
    }
  ],
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Wishlist = mongoose.model("Wishlist", wishListSchema);

module.exports = Wishlist;
