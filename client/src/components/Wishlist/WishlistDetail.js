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
    addGift: false,
    name: "",
    description: ""
  };

  getData = () => {
    // get the data from the API
    // update the state accordingly

    // const wishlistId = this.props.match.params.id;
    const wishlistId = this.props.detailId;
    // console.log("/api/projects/" + id);

    axios
      .get(`/api/wishlist/${wishlistId}`)
      .then(response => {
        console.log("DETAIL", response.data);
        this.setState({
          wishlist: response.data
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
    console.log("MOUTNED");
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("update");
      this.getData();
    }
  }

  toggleForm = key => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  handleChange = event => {
    console.log("hiii", event.target.value);
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
          addGift: false
        });
        console.log(response);
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
    const { wishlist, addGift, editForm } = this.state;
    console.log(wishlist);
    return (
      <div>
        <button onClick={() => this.props.toggleDetail()}>Back</button>
        <>
          <h1>{wishlist.name}</h1>
          <p>{wishlist.description}</p>
          <Gift
            loggedIn={this.props.loggedIn}
            handleDelete={this.props.handleDelete}
            gifts={wishlist.gifts}
            user={this.props.user}
          />
        </>

        {this.props.loggedIn._id === wishlist.owner && (
          <>
            <Button onClick={() => this.toggleForm("editForm")}>
              Show Edit Form
            </Button>
            <Button onClick={() => this.toggleForm("addGift")}>
              Add Gift{" "}
            </Button>
            <img
              width="20px"
              src={require("../../assets/bin.png")}
              onClick={() =>
                this.props.deleteWishlist(this.props.match.params.id)
              }
            />

            {editForm && (
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
            )}
            {addGift && (
              <GiftForm
                getGifts={this.props.getGifts}
                toggleForm={this.toggleForm}
                wishlistId={this.state.wishlist._id}
                getData={this.getData}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default WishlistDetail;
