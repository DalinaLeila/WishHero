import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Gift = props => {
  console.log("gifts", props.gifts);
  let gift = props.gifts.map(gift => {
    return (
      <div className="wishlist-card">
        <h6 className="wishlist-name">{gift.name}</h6>
        {props.loggedIn._id === gift.owner && (
          <button onClick={() => props.handleDelete(gift._id)}>X</button>
        )}
      </div>
    );
  });
  return <div>{gift}</div>;
};

export default Gift;
