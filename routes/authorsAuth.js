const router = require("express").Router();
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Authors = require("../model/Author");

// LOGIN AUTHOR
router.post("/login", async (req, res) => {
  try {
    const author = await Authors.findOne({ email: req.body.email });
    !author && res.status(401).json("author not found");
    const unhashedPwd = cryptoJS.AES.decrypt(
      author.password,
      process.env.PWD_KEY
    ).toString(cryptoJS.enc.Utf8);

    unhashedPwd !== req.body.password && res.status(401).json("wrong password");
    const accessToken = jwt.sign(
      {
        id: author.id,
      },
      process.env.ACCESS_KEY,
      { expiresIn: "3d" }
    );
    res.send(accessToken);
    console.log(`POST req:@Login:  LOGIN SUCCESSFUL @${req.body.email}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// REGISTER AUTHOR
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let newAuthor = await new Authors({
      firstname: req.body.create.lastName,
      lastname: req.body.create.firstName,
      email: req.body.create.email,
      password: cryptoJS.AES.encrypt(
        req.body.create.password,
        process.env.PWD_KEY
      ).toString(),
    }).save();
    console.log(`POST req:@Login: create SUCCESSFUL @${req.body.email}`);
    return res.status(200).send(newAuthor);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
