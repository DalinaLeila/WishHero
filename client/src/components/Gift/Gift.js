import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Gift = props => {
  console.log("gifts", props.gifts);
  let gift = props.gifts.map(gift => {
    return (
      <div key={gift._id}>
        <h1>{gift.name}</h1>
        {props.user._id === props.owner && (
          <button onClick={() => props.handleDelete(gift._id)}>X</button>
        )}
      </div>
    );
  });
  return <div>{gift}</div>;
};

export default Gift;
