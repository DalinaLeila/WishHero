import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wishlist from "../Wishlist/Wishlist";
import axios from "axios";
import "./Profile.css";
import moment from "moment";
import Gift from "../Gift/Gift";
import WishlistDetail from "../Wishlist/WishlistDetail";
export default class Profile extends Component {
  state = {
    wishlists: [],
    user: null,
    gifts: [],
    wishlistShow: true,
    wishlistDetail: false,
    detailId: null
  };

  getGifts = () => {
    const userId = this.props.match.params.id;

    axios
      .get(`/api/gift/gifts/view/${userId}`)
      .then(res => {
        this.setState({
          gifts: res.data
        });
        console.log("halllooo", res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
    this.getGifts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getUserProfile();
      this.getGifts();
    }
  }

  handleFollow = userId => {
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

  handleView = (bool, view) => {
    this.setState({ wishlistShow: bool });
    if (view === "gift") {
      this.getGifts();
    }
  };

  handleDeleteGift = giftId => {
    axios
      .delete(`/api/gift/delete/${giftId}`)
      .then(response => {
        this.getGifts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  showListDetail = id => {
    console.log("WHATS GOING ON", id);
    if (id) {
      this.setState({
        wishlistDetail: true,
        detailId: id
      });
    } else {
      this.setState({
        wishlistDetail: false
      });
    }
  };
  render() {
    console.log("STATTTEEE", this.state.user);

    const { user, gifts, wishlistDetail, wishlistShow } = this.state;
    if (!user) return <div></div>;

    return (
      <>
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img width="50%" src={user.profileImg} alt="" />

          <h3>{user.username}</h3>

          {this.props.user._id !== user._id && (
            <button onClick={() => this.handleFollow(user._id)}>
              {user.followers.includes(this.props.user._id)
                ? "Unfollow"
                : "Follow"}
            </button>
          )}

          <p>Gift wishes: {gifts.length}</p>
          <p>Followers: {user.followers.length}</p>
          <p>Following: {user.following.length}</p>
        </div>
        <div className="profile-wrapper">
          {wishlistDetail ? (
            <WishlistDetail
              loggedIn={this.props.user}
              deleteWishlist={this.props.deleteWishlist}
              detailId={this.state.detailId}
              toggleDetail={this.showListDetail}
              gifts={gifts}
              handleDelete={this.handleDeleteGift}
              user={user}
              getGifts={this.getGifts}
            />
          ) : (
            <div>
              <div className="button-wrapper">
                <button onClick={() => this.handleView(true, "list")}>
                  Lists
                </button>
                <button onClick={() => this.handleView(false, "gift")}>
                  Gifts
                </button>
              </div>
              {this.props.user._id === user._id && (
                <Link to="wishlist/new">
                  <div className="profile-content">
                    <div className="wishlist-card create-card">
                      New Wishlist
                    </div>
                  </div>
                </Link>
              )}
              {wishlistShow ? (
                <div className="profile-content">
                  <Wishlist
                    loggedIn={this.props.user}
                    user={user}
                    deleteWishlist={this.props.deleteWishlist}
                    toggleDetail={this.showListDetail}
                  />
                </div>
              ) : (
                <div className="profile-content">
                  <Gift
                    gifts={gifts}
                    user={user}
                    loggedIn={this.props.user}
                    handleDelete={this.handleDeleteGift}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}
