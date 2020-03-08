import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import GiftForm from "../Gift/GiftForm";
import Gift from "../Gift/Gift";

class WishlistDetail extends Component {
  state = {
    wishlist: null,
    error: "",
    editForm: false,
    name: "",
    description: ""
  };

  getData = () => {
    // get the data from the API
    // update the state accordingly

    const wishlistId = this.props.match.params.id;
    // console.log("/api/projects/" + id);

    axios
      .get(`/api/wishlist/${wishlistId}`)
      .then(response => {
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
    this.getData();
  }

  deleteWishlist = () => {
    const wishlistId = this.state.wishlist._id;
    axios
      .delete(`/api/wishlist/${wishlistId}`)
      .then(response => {
        console.log(this.props.history);
        this.props.history.push(`/profile/${this.props.user._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleEdit = () => {
    this.setState({
      editForm: !this.state.editForm
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

    const wishlistId = this.props.match.params.id;
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
          editForm: false
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
    const { wishlist, editForm } = this.state;
    console.log(wishlist);
    return (
      <div>
        <>
          <h1>{wishlist.name}</h1>
          <p>{wishlist.description}</p>
          <Gift
            user={this.props.user}
            owner={wishlist.owner}
            handleDelete={this.handleDeleteGift}
            gifts={wishlist.gifts}
          />
        </>

        {this.props.user._id === wishlist.owner && (
          <>
            <Button onClick={this.toggleEdit}>Show Edit Form</Button>

            <Button variant="danger" onClick={this.deleteWishlist}>
              Delete wishlist
            </Button>

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

            <GiftForm
              wishlistId={this.state.wishlist._id}
              getData={this.getData}
            />
          </>
        )}
      </div>
    );
  }

  handleDeleteGift = giftId => {
    axios
      .delete(`/api/gift/delete/${giftId}`)
      .then(response => {
        console.log(this.props.history);
        console.log(response);
        this.setState({
          wishlist: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default WishlistDetail;
