const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorAuthRoute = require("./routes/authorsAuth");
const authorRoute = require("./routes/author");
const fileRoute = require("./routes/file");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ["http://localhost:3000", "https://anatomy-gallery.vercel.app"],
  optionsSuccessStatus: 200,
};

dotenv.config();
const app = express();

mongoose
  .connect(
    `mongodb+srv://victor_3d:${process.env.MONGOBD_PWD}@cluster0.9jmrg9q.mongodb.net/${process.env.MONGOBD_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("db connection successful");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.static("public"));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/author", authorAuthRoute);
app.use("/api/authors", authorRoute);
app.use("/api/file", fileRoute);

app.listen(process.env.PORT_NUM, () => {
  console.log(`server is up and running  on ${process.env.PORT_NUM}`);
});
