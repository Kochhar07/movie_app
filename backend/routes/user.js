const express = require("express");
const router = express.Router();
const { getUserById, getUser } = require("../controllers/user");
const { isAuthenticated, isSignIn, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignIn, isAuthenticated, getUser);

router.put("user/:userId", isSignIn, isAuthenticated);

module.exports = router;
