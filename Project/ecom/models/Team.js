const mongoose = require("mongoose");
module.exports = mongoose.model("Team", new mongoose.Schema({
    name: {
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
    facebook: {
      type: String,
      required:false
    },
    twitter: {
      type: String,
      required:false
    },
    instagram: {
      type: String,
      required:false
    },
    linkedin: {
      type: String,
      required:false
    },
  })
);
