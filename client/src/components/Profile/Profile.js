import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wishlist from "../Wishlist/Wishlist";
import axios from "axios";
import "./Profile.css";
import moment from "moment";
import Gift from "../Gift/Gift";
import WishlistDetail from "../Wishlist/WishlistDetail";
import WishlistForm from "../Wishlist/WishlistForm";
export default class Profile extends Component {
  state = {
    user: null,
    gifts: [],
    wishlistShow: true,
    wishlistDetail: false,
    detailId: null,
    showPopup: this.props.showPopup
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  getGifts = () => {
    console.log("ID", this.props.match.params);
    const userId = this.props.match.params.id;

    axios
      .get(`/api/gift/gifts/view/${userId}`)
      .then(res => {
        this.setState({
          gifts: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUserProfile = () => {
    const userId = this.props.match.params.id;
    axios
      .get(`/api/users/profile/${userId}`)
      .then(response => {
        console.log(response.data, "should work");
        this.setState({
          user: response.data
        });
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
      this.setState({
        wishlistShow: true,
        wishlistDetail: false,
        showPopup: this.props.showPopup
      });
      this.getUserProfile();
      this.getGifts();
    }
  }

  handleFollow = userId => {
    axios
      .put(`/api/users/follow/${userId}`)
      .then(response => {
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
    const { user, gifts, wishlistDetail, wishlistShow } = this.state;
    if (!user) return <div></div>;

    return (
      <>
        <div className="profile-banner">
          {this.state.showPopup && (
            <WishlistForm
              togglePopup={this.togglePopup}
              getUserProfile={this.getUserProfile}
            />
          )}
          <h3>{user.username.toUpperCase()}</h3>
          {/* <p>member since {moment(user.created_at)}</p> */}
        </div>
        <div className="profile-info">
          <div>
            <img width="50%" src={user.profileImg} alt="" />

            {this.props.user._id !== user._id && (
              <button
                className="button-active"
                onClick={() => this.handleFollow(user._id)}
              >
                {user.followers.includes(this.props.user._id)
                  ? "Unfollow "
                  : "Follow "}
                {user.username}
              </button>
            )}
          </div>
          <div>
            <p>Gift wishes: {gifts.length}</p>
            <hr />
            <p>Followers: {user.followers.length}</p>
            <hr />

            <p>Following: {user.following.length}</p>
          </div>
        </div>
        <div className="component-wrapper">
          <div className="profile-wrapper">
            {wishlistDetail ? (
              <WishlistDetail
                loggedIn={this.props.user}
                detailId={this.state.detailId}
                toggleDetail={this.showListDetail}
                gifts={gifts}
                handleDelete={this.handleDeleteGift}
                user={user}
                getGifts={this.getGifts}
                getUserProfile={this.getUserProfile}
              />
            ) : (
              <div>
                <div className="button-wrapper">
                  <button
                    className="view-button button-active"
                    onClick={() => this.handleView(true, "list")}
                  >
                    <img width="20px" src={require("../../assets/heart.png")} />
                    lists
                  </button>
                  <button
                    className="view-button button-active"
                    onClick={() => this.handleView(false, "gift")}
                  >
                    <img
                      width="20px"
                      src={require("../../assets/gift-box.png")}
                    />
                    gifts
                  </button>
                </div>
                {this.props.user._id === user._id && (
                  // <Link to="wishlist/new">
                  <div onClick={this.togglePopup} className="profile-content">
                    <div className="wishlist-card create-card">
                      New Wishlist
                      <img width="20px" src={require("../../assets/add.png")} />
                    </div>
                  </div>
                  // </Link>
                )}
                <div className="profile-content">
                  {wishlistShow ? (
                    <Wishlist
                      loggedIn={this.props.user}
                      user={user}
                      deleteWishlist={this.props.deleteWishlist}
                      toggleDetail={this.showListDetail}
                    />
                  ) : (
                    <Gift
                      gifts={gifts}
                      user={user}
                      loggedIn={this.props.user}
                      handleDelete={this.handleDeleteGift}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
