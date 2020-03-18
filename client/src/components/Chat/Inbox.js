import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export class Inbox extends Component {
  state = {
    activeUser: this.props.user,
    inboxItems: [],
    chatId: ""
  };

  componentDidMount = () => {
    this.getInbox();
  };

  getInbox = () => {
    axios
      .post("/api/chat/inbox")
      .then(res => {
        this.setState({
          inboxItems: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const inbox = this.state.inboxItems;
    if (inbox.length === 0) {
      return (
        <>
          <h3>Your inbox is empty</h3>
          <p>Connect with people through their profiles</p>
        </>
      );
    } else {
      return (
        <div className="user-list">
          <div className="users">
            <h2>Chats</h2>
            {inbox.map(chat => {
              return chat.users.map(user => {
                return (
                  user.username !== this.state.activeUser.username && (
                    <NavLink
                      key={chat._id}
                      to={`/inbox/${chat._id}`}
                      otherUser={user}
                    >
                      <div className="img-container">
                        <img src={user.profileImg} alt={user.username} />
                      </div>
                      <div className="message">
                        <h5>{user.username}</h5>
                        <div className="lastMessages">
                          <small className="time">
                            {chat.messages.length > 0
                              ? chat.messages[
                                  chat.messages.length - 1
                                ].created_at.slice(11, 16)
                              : ""}
                          </small>
                          <small>
                            {chat.messages.length > 0
                              ? chat.messages[
                                  chat.messages.length - 1
                                ].message_body.slice(0, 25) + "..."
                              : ""}
                          </small>
                        </div>
                      </div>
                    </NavLink>
                  )
                );
              });
            })}
          </div>
        </div>
      );
    }
  }
}

export default Inbox;
