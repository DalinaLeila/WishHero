import React from "react";
import { Link } from "react-router-dom";
import Confetti from "./components/Confetti";
const Landing = () => {
  return (
    <>
      <Confetti />
      <div className="landing-container">
        <div>
          <h1>Platform to create and share wishlists</h1>
          <p>
            WishHero lets you keep track of your wishlists, fullfill other users
            wishes and communicate with other WishHero users{" "}
          </p>
          <Link to="/signup">
            {" "}
            <button className="start-button">Get started for free</button>
          </Link>
        </div>
      </div>
      <div className="white">
        <img width="900px" src={require("./assets/responsive.png")} alt="" />
      </div>
    </>
  );
};

export default Landing;
