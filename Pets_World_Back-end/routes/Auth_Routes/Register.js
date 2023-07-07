const express = require("express");
const uploadImage = require("./../../core/upload_Image/userImage");
const userController = require("./../../controllers/userController");
const userValidation = require("./../../core/Validation/userValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const registerRoute = express.Router();

registerRoute
  .route("/register")
  .post(
    // uploadImage.single("image"),
    uploadImage.array("images", 2),
    userValidation.addUserValidator,
    checkValidation,
    userController.addUser
  );

module.exports = registerRoute;
