import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Gift = props => {
  let gift = props.gifts.map(gift => {
    console.log(gift);
    return (
      <div className="gift-card">
        <a target="_blank" href={gift.giftLink}>
          <h6 className="gift-name">{gift.name}</h6>
        </a>
        <h3>{gift.price}€</h3>

        <img
          className="gift-img"
          width="200px"
          height="200px"
          src={gift.imageUrl || require("../../assets/gift.png")}
        />
        {props.loggedIn._id === gift.owner && (
          <img
            className="pointer button-active"
            width="20px"
            src={require("../../assets/bin.png")}
            onClick={() => props.handleDelete(gift._id)}
          />
        )}
      </div>
    );
  });
  return <>{gift}</>;
};

export default Gift;
