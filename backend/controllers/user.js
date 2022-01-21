const User = require("../models/user");

const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "No user was found",
      });
    }
    req.profile = user;

    next();
  });
};

const getUser = (req, res) => {
  return res.json(req.profile);
};

// const updateUser = (req, res) => {
//   User.findByIdAndUpdate(id);
//   console.log(req.body);
//     { id: req.profile._id },
//     { $set: req.body },
//     { new: true, useFindAndModify: false },
//     (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           err: "Not authorize to make changes",
//         });
//       }
//       res.json(user);
//     }
//   );
// };

module.exports = { getUserById, getUser };
