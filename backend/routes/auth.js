const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { logout, register, login, isSignIn } = require("../controllers/auth");

router.post(
  "/register",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "Valid Email ID is required").isEmail(),
    check("password", "password should be at least 5 char").isLength({
      min: 5,
    }),
    check("phone_number", "phone_number should be at least 10 char").isLength({
      min: 10,
    }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "password is required").isLength({
      min: 5,
    }),
  ],
  login
);

router.get("/logout", logout);

// router.get("/testroute", (req, res) => {
//   res.send("A protected route");
// });

module.exports = router;
