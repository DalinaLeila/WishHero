import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <div className="landing-container">
        <div>
          <h1>Create your wishlists</h1>
          <h2>Share with anyone</h2>
          <Link to="/signup">
            {" "}
            <button className="start-button">Get started</button>
          </Link>
        </div>
      </div>
      <div className="landing-content">
        <div>
          <h1>Build. Add. Share.</h1>
          <ul>
            <li>
              Easily add gifts from websites and shopping apps or create a
              custom gift
            </li>
            <li>
              Share your wish lists with others or keep it just for yourself –
              it’s up to you
            </li>
            <Link to="/signup"> Start wish-listing</Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Landing;
