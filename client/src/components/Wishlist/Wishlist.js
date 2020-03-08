import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import WishlistForm from "./WishlistForm";

class Wishlist extends Component {
  state = {
    wishlists: null,
    showForm: false
  };

  // componentWillUnmount() {
  //   console.log("PROJECTS UNMOUNT");
  // }

  getData = () => {
    // axios
    //   .get("http://localhost:5555/api/projects")
    axios
      .get("/api/wishlist/mywishlists")
      .then(response => {
        this.setState({
          wishlists: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }

  handleClick = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if (!this.state.wishlists) return <div></div>;
    return (
      <div className="projects-container">
        {/* <Button onClick={this.handleClick}>New Wishlist</Button> */}
        <Link to="wishlist/new">New Wishlist</Link>

        <div>
          {/* {this.state.showForm && (
            <WishlistForm
              handleClick={this.handleClick}
              refreshData={this.getData}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default Wishlist;
