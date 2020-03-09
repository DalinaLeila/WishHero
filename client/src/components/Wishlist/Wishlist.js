import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Wishlist = props => {
  return props.user.wishlists.map(wishlist => {
    return (
      <div className="wishlist-card">
        {/* <div className="gift-num">{wishlist.gifts.length}</div> */}
        <Link key={wishlist._id} to={`/wishlists/${wishlist._id}`}>
          <h6 className="wishlist-name">{wishlist.name}</h6>
        </Link>
        <h6> {moment(wishlist.eventDate).fromNow()}</h6>
        {/* <p> posted {moment(wishlist.updated_at).fromNow()}</p> */}
        {props.loggedIn._id === props.user._id && (
          <img
            width="20px"
            src={require("../../assets/bin.png")}
            onClick={() => props.deleteWishlist(wishlist._id)}
          />
        )}
      </div>
    );
  });
};

export default Wishlist;
