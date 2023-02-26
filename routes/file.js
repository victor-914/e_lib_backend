const router = require("express").Router();
const fileUpload = require("express-fileupload");
const filesExtLimiter = require("../middleware/fileExtLimiter");
const filesPayloadExists = require("../middleware/filesPayLoadExists");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const Media = require("../model/Media");
const fs = require("fs");
const { upload } = require("../cloudinary");

router.post(
  "/img",
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
  filesPayloadExists,
  filesExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  async (req, res) => {
    const file = req.files;
    const name = Object.keys(file);

    try {
      const cloudFile = await upload(file[name].tempFilePath);
      const newMedia = new Media({
        title: req.body.title,
        comment: req.body.comment,
        url: cloudFile.url,
        catergory: req.body.catergory,
      });
      await newMedia.save();
      res.status(200).send(newMedia);
    } catch (error) {
      res.status(500).json({ status: "err", message: error });
    }

    Object.keys(file).forEach((key) => {
      file[key].mv(`images/${file[key].name}`, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
  }
);

router.get("/:catergory", async (req, res) => {
  try {
    const allNewMedia = await Media.find({ catergory: req.params.catergory });
    res.status(200).send(allNewMedia);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
