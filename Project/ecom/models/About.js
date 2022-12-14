const mongoose = require("mongoose");
module.exports = mongoose.model("About", new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:false
    },
  })
);
