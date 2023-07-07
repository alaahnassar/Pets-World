const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    name: { type: String },
    type: { type: String },
    description: { type: String },
    life_span: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
