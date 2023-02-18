const { verifyTokenAndAuthorization, verifyAdmin } = require("./verifyToken");
const cryptoJS = require("crypto-js");
const router = require("express").Router();
const Author = require("../model/Author");





// EDIT AUTHOR
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PWD_KEY
    ).toString();
  }
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...other } = updatedAuthor._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE AUTHOR
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json("author deleted sucessfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET AUTHOR
router.get("/find/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const { password, ...other } = author._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL AUTHORs
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const authors = query
      ? await Author.find().sort({ _id: -1 }).limit(5)
      : await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
