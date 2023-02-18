const router = require("express").Router();
const model3D = require("../model/model3D");
const { verifyAdmin } = require("./verifyToken");

// UPLOAD MODEL
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newModel = await new model3D({
      title: req.body.title,
      url: req.body.url,
      catergory: req.body.catergory,
      credit: req.body.credit,
    }).save();
    res.status(200).send(newModel);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "error");
  }
});

// GET ALL MODELS
router.get("/", async (req, res) => {
  try {
    const models = await model3D.find();
    res.status(200).send(models);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//  EDIT  Model
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedmodel = await model3D.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedmodel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Model
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await model3D.findByIdAndDelete(req.params.id);
    res.status(200).json("model deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Model
router.get("/find/:id", async (req, res) => {
  try {
    const model = await model3D.findById(req.params.id);
    res.status(200).json(model);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL Models

module.exports = router;
