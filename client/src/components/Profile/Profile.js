import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wishlist from "../Wishlist/Wishlist";
import axios from "axios";

export default class Profile extends Component {
  state = {
    wishlists: [],
    user: null
  };

  getUserProfile = () => {
    const userId = this.props.match.params.id;
    //axios call to get the user requested
    console.log("params ID", userId);
    axios
      .get(`/api/users/profile/${userId}`)
      .then(response => {
        this.setState({
          user: response.data,
          wishlists: response.data.wishlists
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getUserProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getUserProfile();
    }
  }

  handleFollow = () => {
    //need to pull the follower if clicked again
    //need to allow only one time follow
    //need to change text in front end
    const userId = this.props.match.params.id;
    console.log(this.props);
    axios
      .put(`/api/users/follow/${userId}`)
      .then(response => {
        console.log("following", response.data.followers);
        this.setState({
          user: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { user } = this.state;
    if (!user) return <div></div>;
    console.log(this.state.user);
    const wishlists = user.wishlists.map(wishlist => {
      return (
        <>
          <Link key={wishlist._id} to={`/wishlists/${wishlist._id}`}>
            <h2>{wishlist.name}</h2>
          </Link>
          <h6>for {wishlist.eventDate}</h6>
        </>
      );
    });
    return (
      <div>
        <img width="10%" src={user.profileImg} alt="" />
        <h1>Profile of {user.username}</h1>
        {this.props.user._id === user._id && <Wishlist />}
        {wishlists}
        {/* {this.props.user._id !== user._id && (
          <button onClick={this.handleFollow}>Follow</button>
        )} */}
      </div>
    );
  }
}
