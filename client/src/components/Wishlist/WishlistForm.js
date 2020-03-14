import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class WishlistForm extends Component {
  state = {
    name: "",
    description: "",
    private: true,
    eventDate: "",
    headerImg: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  togglePrivate = () => {
    this.setState({
      private: !this.state.private
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // axios.post('http://localhost:5555/api/projects')
    axios
      .post("/api/wishlist", {
        name: this.state.name,
        description: this.state.description,
        private: this.state.private,
        eventDate: this.state.eventDate,
        headerImg: this.state.headerImg
      })
      .then(response => {
        // this.props.handleClick();
        this.setState({
          name: "",
          description: "",
          private: true,
          eventDate: "",
          headerImg: "",
          eventDate: "",
          private: true
        });
        this.props.togglePopup();
        // this.props.history.push(`/profile/${this.props.user._id}`);
        this.props.getUserProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // headerImg: { type: String, defualt: "../client/src/assets/pic.jpg" },

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h6 onClick={this.props.togglePopup}>X</h6>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Private"
                checked={this.state.private}
                onChange={this.togglePrivate}
              />
            </Form.Group>
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
              <Form.Label htmlFor="description">Description: </Form.Label>
              <Form.Control
                type="text"
                name="description"
                id="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="eventDate">Event Date: </Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                id="eventDate"
                onChange={this.handleChange}
                value={this.state.eventDate}
              />
            </Form.Group>

            {/* upload image or post link */}
            <Button type="submit">Create a Wishlist</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default WishlistForm;
