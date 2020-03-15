const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,

    profileImg: {
      type: String,
      default:
        "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
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
