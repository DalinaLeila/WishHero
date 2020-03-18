import React from "react";
import "./App.css";
import { Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistForm from "./components/Wishlist/WishlistForm";
import Landing from "./Landing";
import Inbox from "./components/Chat/Inbox";
import InboxChat from "./components/Chat/InboxChat";
import WishlistDetail from "./components/Wishlist/WishlistDetail";
// import GiftDetail from "./components/GiftDetail";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./Home";
class App extends React.Component {
  state = { user: this.props.user };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  deleteWishlist = id => {
    const wishlistId = id;
    axios
      .delete(`/api/wishlist/delete/${wishlistId}`)
      .then(response => {
        this.props.history.push(`/profile/${this.state.user._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />
        <Route
          exact
          path="/"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return <Home {...props} user={this.state.user} />;
            } else {
              return <Landing />;

              // return <Redirect to="/" />;
            }
          }}
        />

        {/* <Route exact path="/" component={Test} /> */}

        <Route
          exact
          path="/profile/:id"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return (
                <Profile
                  {...props}
                  user={this.state.user}
                  deleteWishlist={this.deleteWishlist}
                  showPopup={false}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        {/* wishlist */}

        <Route
          exact
          path="/wishlists/:id"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return (
                <WishlistDetail
                  {...props}
                  user={this.state.user}
                  deleteWishlist={this.deleteWishlist}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/wishlists"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return <Wishlist {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/profile/wishlist/new/:id"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              // return <WishlistForm {...props} user={this.state.user} />;
              return (
                <Profile
                  {...props}
                  user={this.state.user}
                  deleteWishlist={this.deleteWishlist}
                  showPopup={true}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} setUser={this.setUser} />} //passing all the router props and the user props
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} setUser={this.setUser} />} //passing all the router props and the user props
        />
        <div className="chatPage">
          <Route
            path="/inbox"
            render={props => {
              if (this.state.user) {
                return <Inbox {...props} user={this.state.user} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route
            path="/inbox/:id"
            render={props => {
              if (this.state.user) {
                return <InboxChat {...props} user={this.state.user} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
