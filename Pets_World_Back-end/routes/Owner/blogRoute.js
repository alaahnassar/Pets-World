const express = require("express");
const blog = express.Router();
const { getPets, addPet } = require("../../controllers/Owner/blogController");
blog.route("/blog").get(getPets).post(addPet);
module.exports = blog;
