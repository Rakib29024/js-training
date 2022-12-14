const mongoose = require("mongoose");
module.exports = mongoose.model("Testimonial", new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:false
    },
  })
);
