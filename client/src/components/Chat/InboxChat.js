import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./styles.css";

const socket = socketIOClient();

export class InboxChat extends Component {
  state = {
    messages: [],
    newMessage: "",
    chatId: this.props.match.params.id,
    activeUser: this.props.user
  };

  componentDidMount() {
    if (this.props.match.params) {
      socket.on("message", msg => {
        this.getInboxChat();
      });
      this.getInboxChat();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getInboxChat();
    }
  }

  getInboxChat = () => {
    axios
      .post(`/api/chat/inbox/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          messages: res.data.messages
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  /*---------------------------------------*/
  // send new message to a chat

  handleChange = event => {
    this.setState({
      newMessage: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    if (!this.state.newMessage) return false;

    axios
      .post(`/api/chat/new`, {
        message_body: this.state.newMessage,
        chatId: this.props.match.params.id
      })
      .then(response => {
        const msg =
          response.data.messages[response.data.messages.length - 1]
            .message_body;
        this.setState({
          messages: response.data.messages
        });
        socket.send(msg);
        this.setState({
          newMessage: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const conversation = this.state.messages;
    return (
      <div className="chatContainer">
        <div className="main">
          <div className="bg-header" />

          <div className="container">
            <div className="chat">
              {conversation.map((message, i) => {
                return (
                  <div key={message._id + i}>
                    {message.sender !== this.state.activeUser._id ? (
                      <div className="chat-bubble leftSide">
                        <p>{message.message_body}</p>
                        <small>{message.created_at.slice(11, 16)}</small>
                      </div>
                    ) : (
                      <div className="chat-bubble rightSide">
                        <p>{message.message_body}</p>
                        <small>{message.created_at.slice(11, 16)}</small>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <form className="chat-form" onSubmit={this.submitForm}>
              <textarea
                type="text"
                name="newMessage"
                value={this.state.newMessage}
                onChange={this.handleChange}
              />
              <button type="submit" className="sendButton">
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InboxChat;
