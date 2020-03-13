import React, { Component } from "react";
import { signup } from "./Auth";
import { Link } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import "./auth.css";
class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(this.state.username, this.state.password).then(data => {
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

            <Form onSubmit={this.handleSubmit}>
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
