import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Gift = props => {
  console.log("gifts", props.gifts);
  let gift = props.gifts.map(gift => {
    return (
      <div className="gift-card">
        <h6 className="gift-name">{gift.name}</h6>
        {props.loggedIn._id === gift.owner && (
          <img
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
