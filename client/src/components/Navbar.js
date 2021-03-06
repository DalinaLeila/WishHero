import React from "react";
import { Link } from "react-router-dom";

import { logout } from "./Auth/Auth";
import "./Auth/auth.css";

const Navbar = props => {
  const handleLogout = () => {
    logout();
    props.clearUser(null);
  };

  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img
          width="30px"
          height="30px"
          src={require("../assets/star.png")}
          alt=""
        />
        WishHero
      </Link>
      <label className="hamburger" htmlFor="toggle">
        &#9776;
      </label>
      <input type="checkbox" id="toggle" />
      <div className="menu">
        {props.user ? (
          <>
            ´{" "}
            <Link to={`/profile/${props.user._id}`}>
              <img
                className="profile-pic-nav"
                width="30px"
                height="30px"
                style={{ objectFit: "cover" }}
                src={props.user.profileImg}
                alt=""
              />
              Hello {props.user.username}
            </Link>
            <Link to={`/profile/wishlist/new/${props.user._id}`}>
              <img width="20px" src={require("../assets/pen.png")} />
            </Link>
            <Link to="/inbox">
              <img width="20px" src={require("../assets/chat.png")} />
            </Link>
            <Link to="/" onClick={() => handleLogout()}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// <Nav>
{
  /* <Nav className="nav navbar"> */
}
{
  /* <div>
    <Link to="/">
      <img
        width="30px"
        height="30px"
        style={{ marginRight: "10px" }}
        src={require("../assets/star.png")}
        alt=""
      />
      WishHero
    </Link>
  </div> */
}

// </Nav>
