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
            wishes and communicate with other WishHero members{" "}
          </p>
          <Link to="/signup">
            {" "}
            <button className="start-button">Get started for free</button>
          </Link>
        </div>
      </div>
      <div className="white">
        <img width="900px" src={require("./assets/responsive.png")} alt="" />
        <div className="features">
          <h1>Create. Share. Explore.</h1>
          <ul>
            <li>Create as many wish lists as you like</li>
            <li>Easily add gifts, include links and upload pictures</li>
            <li>
              Explore other users wishlists and make their dreams come true
            </li>
          </ul>
        </div>
      </div>
      <div className="phone-right">
        <h1>Easy to manage</h1>
        <img
          className="phone-overlay"
          width="300px"
          src={require("./assets/chat_phone.png")}
          alt=""
        />
        <img width="300px" src={require("./assets/profile_phone.png")} alt="" />
        <h1>Easy to add</h1>
      </div>
      <div className="footer">
        &copy; {new Date().getFullYear()} Dalina Weidinger
      </div>
    </>
  );
};

export default Landing;
