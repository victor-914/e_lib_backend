const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    url: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.export = materialSchema;
// module.exports = mongoose.model("material", materialSchema);
