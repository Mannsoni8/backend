const mongoose = require("mongoose");

const postSchemea = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("posts", postSchemea);

export default postModel;
