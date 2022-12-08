const mongoose = require("mongoose");
module.exports = mongoose.model("Blog", new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },
    
    icon: {
      type: String,
      required:false
    },
  })
);
