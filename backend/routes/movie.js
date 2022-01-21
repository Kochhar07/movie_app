// const express = require("express");
// const router = express.Router();
// const { check } = require("express-validator");

// const {
//   getMovieById,
//   createMovie,
//   getMovie,
//   getAllMovie,
//   updateMovie,
//   removeMovie,
// } = require("../controllers/movie");

// const { isSignIn, isAdmin, isAuthenticated } = require("../controllers/auth");
// const { getUserById } = require("../controllers/user");

// router.param("userId", getUserById);
// router.param("movieId", getMovieById);

// router.post(
//   "/movie/create/:userId",
//   isSignIn,
//   isAuthenticated,
//   isAdmin,
//   createMovie
// );

// router.get("/movie/:movieId", getMovie);
// router.get("/movies", getAllMovie);

// router.put(
//   "/movie/:movieId/:userId",
//   isSignIn,
//   isAuthenticated,
//   isAdmin,
//   updateMovie
// );

// router.delete(
//   "/movie/:movieId/:userId",
//   isSignIn,
//   isAuthenticated,
//   isAdmin,
//   removeMovie
// );

// module.exports = router;
