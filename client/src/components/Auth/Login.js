import React, { Component } from "react";
import { login } from "./Auth";
import { Alert, Form, Button } from "react-bootstrap";
import "./auth.css";
class Login extends Component {
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

    login(this.state.username, this.state.password).then(data => {
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
          <div className="auth-component">
            <h1>Log In</h1>
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
              {this.state.error && (
                <Alert variant="danger">{this.state.error}</Alert>
              )}
              <button className="button" type="submit">
                Log in
              </button>
            </Form>
          </div>
          <div className="auth-info">
            <h1>Welcome Back</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
