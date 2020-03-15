import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Wishlist = props => {
  return props.user.wishlists.map(wishlist => {
    return (
      <div
        onClick={() => props.toggleDetail(wishlist._id)}
        className=" pointer button-active wishlist-card"
      >
        <div className="detail-card">
          {/* <div className="gift-num">{wishlist.gifts.length}</div> */}
          <h6 className="wishlist-name">{wishlist.name}</h6>
          <h6> {moment(wishlist.eventDate).fromNow()}</h6>
          {/* <p> posted {moment(wishlist.updated_at).fromNow()}</p> */}
        </div>
        {props.loggedIn._id === props.user._id && (
          <img
            className="pointer button-active"
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
