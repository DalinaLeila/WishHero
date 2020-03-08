import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

class Home extends Component {
  state = {
    users: null,
    search: ""
  };

  getData = () => {
    axios
      .get("/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSearch = e => {
    e.preventDefault();
    let input = e.target.value;
    this.setState({
      search: input
    });

    axios
      .get(`/api/users/${input}`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFollow = userId => {
    axios
      .put(`api/users/follow/${userId}`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
    console.log(this.state.users);
  }

  render() {
    console.log("ME", this.props.user);
    if (!this.state.users) return <div></div>;
    let users = this.state.users.map(user => {
      if (this.props.user._id === user._id) return;
      return (
        <li>
          <Link key={user._id} to={`/profile/${user._id}`}>
            <div>
              <img width="2%" src={user.profileImg} alt="user-profile-img" />
              <h3>{user.username}</h3>
            </div>
          </Link>
          {/* <button onClick={() => this.handleFollow(user._id)}>
            {user.followers.includes(this.props.user._id)
              ? "Unfollow"
              : "Follow"}
          </button> */}
        </li>
      );
    });
    return (
      <div className="home-container">
        <input onChange={e => this.handleSearch(e)} type="text" />
        <Link to="/profile/wishlist/new">
          <button>New Wishlist</button>
        </Link>
        <div className="flex-user-container">
          <ul>{users}</ul>
        </div>
      </div>
    );
  }
}

export default Home;
