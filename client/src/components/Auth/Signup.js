import React, { Component } from "react";
import { signup } from "./Auth";
import { Link } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import "./auth.css";
import axios from "axios";
class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    profileImg: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
        this.setState({ profileImg: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(
      this.state.username,
      this.state.password,
      this.state.profileImg
    ).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projects"
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div class="auth-container">
          <div className="auth-info">
            <h1>Welcome </h1>
            <h5>Already have an account?</h5>
            <Link to="/login">
              <button className="button-active">Sign In</button>
            </Link>
          </div>
          <div class="auth-component">
            <h1>Create Account</h1>

            <Form className="form" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">Username: </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password: </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="profilePic">Profile Picture: </Form.Label>
                <Form.Control
                  name="profilePic"
                  type="file"
                  id="profileImg"
                  onChange={e => this.handleFileUpload(e)}
                />
              </Form.Group>
              {this.state.error && (
                <Alert variant="danger">{this.state.error}</Alert>
              )}
              <button className="button" type="submit">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
