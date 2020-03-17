const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/Chat");

/*-------------------------------------------------*/
//POST /api/chat/inbox --> load user's inbox content

router.post("/inbox", (req, res) => {
  Chat.find({ users: { $in: [req.user._id] } })
    .populate("messages users")
    .then(chats => {
      res.send(chats);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/*-------------------------------------------------*/
//POST /api/chat/inbox/:id --> load chat content

router.post("/inbox/:id", (req, res) => {
  Chat.findById({ _id: req.params.id })
    .populate("messages")
    .then(chat => {
      res.send(chat);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/*-------------------------------------------------*/
//POST /api/chat/:id/new --> post new message to chat

router.post("/new", (req, res) => {
  const { message_body, chatId } = req.body;
  Message.create({
    sender: req.user._id,
    message_body: message_body
  })
    .then(newMessage => {
      Chat.findByIdAndUpdate(
        { _id: chatId },
        {
          $push: { messages: newMessage }
        },
        {
          new: true
        }
      )
        .populate({ path: "users messages", populate: { path: "sender" } })
        .then(chatDocument => {
          res.json(chatDocument);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

/*-------------------------------------------------*/
//POST /api/chat --> open chat between loggedin user and another member

router.post("/", (req, res) => {
  const { profileUser } = req.body;
  Chat.findOne({
    $and: [{ users: { $in: [req.user] } }, { users: { $in: [profileUser] } }]
  })
    .then(chat => {
      if (chat) {
        Chat.findById(chat._id)
          .populate("messages")
          .populate("users")
          .then(chat => {
            res.json(chat);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        Chat.create({
          users: [req.user, profileUser]
        })
          .then(chat => {
            res.json(chat);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
