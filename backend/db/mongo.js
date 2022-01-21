const mongoose = require("mongoose");
module.exports = () => {
  try {
    mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("Database error");
    throw err;
  }
};
