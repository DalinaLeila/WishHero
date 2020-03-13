import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import GiftForm from "../Gift/GiftForm";
import Gift from "../Gift/Gift";
import { Link } from "react-router-dom";

class WishlistDetail extends Component {
  state = {
    wishlist: null,
    error: "",
    editForm: false,
    popupAddGift: false,
    name: "",
    description: ""
  };

  togglePopup = () => {
    this.setState({
      popupAddGift: !this.state.popupAddGift
    });
  };

  getData = () => {
    const wishlistId = this.props.detailId;

    axios
      .get(`/api/wishlist/${wishlistId}`)
      .then(response => {
        this.setState({
          wishlist: response.data,
          name: response.data.name,
          description: response.data.description
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  toggleForm = key => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const id = this.state.project._id

    // const wishlistId = this.props.match.params.id;
    const wishlistId = this.props.detailId;

    axios
      .put(`/api/wishlist/${wishlistId}`, {
        name: this.state.name,
        description: this.state.description
      })
      .then(response => {
        this.setState({
          wishlist: response.data,
          // title: response.data.title,
          // description: response.data.description,
          editForm: false,
          popupAddGift: false
        });
        this.props.getUserProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.wishlist === null) {
      return <div></div>;
    }
    const { wishlist, popupAddGift, editForm } = this.state;
    return (
      <div>
        <button onClick={() => this.props.toggleDetail()}>Back</button>

        {editForm && this.props.loggedIn._id === wishlist.owner ? (
          <Form onSubmit={this.handleSubmit}>
            <h2>Edit form</h2>
            <Form.Group>
              <Form.Label htmlFor="name">name: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description: </Form.Label>
              <Form.Control
                type="text"
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit">Edit</Button>
          </Form>
        ) : (
          <>
            {this.props.loggedIn._id === wishlist.owner && (
              <div onClick={() => this.toggleForm("editForm")}>Edit</div>
            )}
            <h1>{wishlist.name}</h1>
            <p>{wishlist.description}</p>
          </>
        )}
        {this.props.loggedIn._id === wishlist.owner && (
          <>
            {popupAddGift && (
              <GiftForm
                getGifts={this.props.getGifts}
                toggleForm={this.toggleForm}
                wishlistId={this.state.wishlist._id}
                getData={this.getData}
                popupForm={this.togglePopup}
              />
            )}
          </>
        )}
        <div className="profile-content">
          {this.props.loggedIn._id === wishlist.owner && (
            <button
              onClick={this.togglePopup}
              className="gift-card flex-add-gift"
            >
              <img width="30px" src={require("../../assets/plus.png")} />
              Add Gift
            </button>
          )}
          <Gift
            loggedIn={this.props.loggedIn}
            handleDelete={this.props.handleDelete}
            gifts={wishlist.gifts}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default WishlistDetail;
