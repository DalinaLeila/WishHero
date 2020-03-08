import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "./Auth/Auth";

const Navbar = props => {
  const handleLogout = () => {
    logout();
    props.clearUser(null);
  };

  console.log(props);
  return (
    <Nav className="nav justify-content-end" bg="primary">
      <Link to="/">Home</Link>
      {props.user ? (
        <>
          <p>Hello {props.user.username}</p>
          <Link to={`/profile/${props.user._id}`}>Profile</Link>

          <Link to="/logout" onClick={() => handleLogout()}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </Nav>
  );
};

export default Navbar;
