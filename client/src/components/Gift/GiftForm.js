import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class GiftForm extends Component {
  state = {
    name: "",
    details: "",
    price: 0,
    quantity: 1,
    giftLink: "",
    giftImg: "",
    importance: 0
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMIT");
    if (!this.state.name || !this.state.details || !this.state.price) return;
    axios
      .post(`/api/gift/add/${this.props.wishlistId}`, {
        name: this.state.name,
        details: this.state.details,
        price: this.state.price
      })
      .then(response => {
        console.log(response.data);
        this.props.getData();
        this.setState({
          name: "",
          details: "",
          price: 0
        });
        this.props.toggleForm("addGift");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
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
          <Form.Label htmlFor="details">Details: </Form.Label>
          <Form.Control
            type="text"
            name="details"
            id="details"
            onChange={this.handleChange}
            value={this.state.details}
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
        </Form.Group>

        {/* upload image or post link */}
        <Button type="submit">Add a Gift</Button>
      </Form>
    );
  }
}

export default GiftForm;
