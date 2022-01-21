require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongo = require("./db/mongo");
const cors = require("cors");

mongo();

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const movieRoutes = require("./routes/movie");
const ticketRoutes = require("./routes/ticket");

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// port
const port = process.env.PORT || 5000;

// routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
// app.use("/api", movieRoutes);
app.use("/api", ticketRoutes);

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
