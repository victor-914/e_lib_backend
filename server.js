const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorAuthRoute = require("./routes/authorsAuth");
const authorRoute = require("./routes/author");
const modelRoute = require("./routes/model3d");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
dotenv.config();
const app = express();

// dbConnection();

mongoose
  .connect(process.env.MONGOBD_PWD, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connection successful");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/author", authorAuthRoute);
app.use("/api/model", modelRoute);
app.use("/api/authors", authorRoute);

app.listen(process.env.PORT_NUM, () => {
  console.log(`server is up and running  on ${process.env.PORT_NUM}`);
});
