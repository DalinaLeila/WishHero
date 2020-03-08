const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password is too short." });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({ username: username, password: hash });
        })
        .then(newUser => {
          //passport login function
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      //err when trying to retrieve user from the data base
      return res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
    }

    if (!user) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      return res.status(401).json(failureDetails);
      // 0R .json({ message: "no user was found with username or passport did not match" });
    }

    // save user in session
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: "Session save went bad." });
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(user);
    });
  })(req, res, next); //you need to do this !
});

router.delete("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  // if (req.isAuthenticated()) {
  return res.status(200).json(req.user);
  // }
  // res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
