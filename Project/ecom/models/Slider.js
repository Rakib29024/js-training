const mongoose = require("mongoose");
module.exports = mongoose.model("Slider", new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:false
    },
  })
);
