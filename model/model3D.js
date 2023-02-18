const mongoose = require("mongoose");

const model3DSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    catergory: {
      type: String,
      unique: false,
      required: true,
    },

    url: {
      type: String,
      unique: true,
      required: true,
    },
    credit: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("model", model3DSchema);
