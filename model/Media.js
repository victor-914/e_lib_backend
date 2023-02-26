const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  data: {
    type: Buffer,
    contentType: String,
  },
  type: {
    type: String,
  },
});

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
      required: true,
    },

    url: {
      type: String,
    },

    // img: imageSchema,

    catergory: {
      type: String,
      unique: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
