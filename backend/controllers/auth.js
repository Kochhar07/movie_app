const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save the user",
        Err_msg: err,
      });
    }
    res.json(user);
  });
};

const login = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Incorrect email or password",
      });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 82400 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User logout successfully",
  });
};

//protected routes
const isSignIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// middlewares
const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED IN AUTHENTICATION",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  // console.log("req.profile.role: ", req.profile.role);
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "ACCESS DENIED IN ADMIN",
    });
  }
  next();
};

module.exports = {
  register,
  logout,
  login,
  isSignIn,
  isAuthenticated,
  isAdmin,
};
