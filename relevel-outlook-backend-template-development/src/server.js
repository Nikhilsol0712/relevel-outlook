require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = require("./config/serverConfig");
const dbUri = require("./config/db.config");
const authRoutes = require("./routes/auth");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token"
  );
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

authRoutes(app);

// sample for express server
// app.use("/", (req, res, next) => {
//   res.status(200).json({ success: true, data: "Start Here" });
// });

// const PORT = process.env.PORT || 8080;

// app.listen(
//   PORT,
//   console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
// );

// // fetch routes
// let userRouter = require('./routes/user');

// //define root routes.
// app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log("server is listening to the port:", PORT);

  //connect to mongo db and it creates db also
  mongoose.connect(dbUri).then(
    () => {
      console.log("connect to mongo db successfully");
    },
    (err) => {
      console.log("Error occured:", err);
    }
  );
});
