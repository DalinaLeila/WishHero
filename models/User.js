const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    profileImg: {
      type: String,
      default:
        "https://res.cloudinary.com/dfpjrvoqo/image/upload/v1584983114/thing-gallery/profile_default.jpg.jpg"
    },
    about: String,
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    wishlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wishlist"
      }
    ],
    savedGifts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Gift"
      }
    ]
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
