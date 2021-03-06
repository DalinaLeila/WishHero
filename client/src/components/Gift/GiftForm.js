import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class GiftForm extends Component {
  state = {
    name: "",
    giftLink: "",
    price: 0,
    quantity: 1,
    giftLink: "",
    imageUrl: "",
    importance: 0,
    loading: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post("/api/upload/upload", uploadData)
      .then(res => res.data)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name || !this.state.giftLink || !this.state.price) return;
    axios
      .post(`/api/gift/add/${this.props.wishlistId}`, this.state)
      .then(res => res.data)
      .then(res => {
        this.props.getData();
        this.setState({
          name: "",
          giftLink: "",
          price: 0,
          imageUrl: ""
        });
        this.props.popupForm("popupAddGift");
        this.props.getGifts();
        // here you would redirect to some other page
      })
      .catch(err => {
        console.log("Error while adding the thing: ", err);
      });
  };
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h6 className="button-active pointer" onClick={this.props.popupForm}>
            X
          </h6>
          <h1>Add Gift</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Name: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="giftLink">Link: </Form.Label>
              <Form.Control
                type="text"
                name="giftLink"
                id="giftLink"
                onChange={this.handleChange}
                value={this.state.giftLink}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="pice">Price: </Form.Label>
              <Form.Control
                type="number"
                name="price"
                id="price"
                onChange={this.handleChange}
                value={this.state.price}
              />
              <Form.Control
                type="file"
                onChange={e => this.handleFileUpload(e)}
              />
            </Form.Group>

            {/* upload image or post link */}
            <button className="button-active form-button" type="submit">
              Add
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

export default GiftForm;
