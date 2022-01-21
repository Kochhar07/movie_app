// const Movie = require("../models/movie");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");
// // const path = require("path");

// const getMovieById = (req, res, next, id) => {
//   Movie.findById(id).exec((err, movie) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Movie not found",
//       });
//     }
//     req.movie = movie;
//     next();
//   });
// };

// const createMovie = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   // console.log("req:", req);
//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Problem with image",
//       });
//     }
//     // console.log("I am in form Parse 1");

//     const { title, description, rating, releaseDate } = fields;

//     if (!title || !description || !rating || !releaseDate) {
//       return res.status(400).json({
//         error: "Please include all fields",
//       });
//     }

//     let movie = new Movie(fields);

//     // handle file here
//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big",
//         });
//       }

//       movie.photo.data = fs.readFileSync(file.photo.filepath);
//       movie.photo.contentType = file.photo.type;
//     }

//     movie.save((err, movie) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Saving in DB failed",
//         });
//       }
//       return res.json(movie);
//     });
//   });
// };

// const getMovie = (req, res) => {
//   return res.json(req.movie);
// };

// const getAllMovie = (req, res) => {
//   Movie.find().exec((err, allMovies) => {
//     if (err) {
//       return res.status(400).json({
//         error: "No movies found",
//       });
//     }
//     res.json(allMovies);
//   });
// };

// const updateMovie = (req, res) => {
//   const movie = req.movie;
//   movie.title = req.body.title;

//   movie.save((err, updatedMovie) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Falied to update movie",
//       });
//     }
//     res.json(updatedMovie);
//   });
// };

// const removeMovie = (req, res) => {
//   const movie = req.movie;

//   movie.remove((err, movie) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Falied to delete movie",
//       });
//     }
//     res.json({
//       message: `succesfully deleted ${movie}`,
//     });
//   });
// };

// module.exports = {
//   getMovieById,
//   createMovie,
//   getAllMovie,
//   getMovie,
//   updateMovie,
//   removeMovie,
// };
