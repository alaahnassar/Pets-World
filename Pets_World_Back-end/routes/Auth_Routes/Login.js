const express = require("express");

const authenticationController = require("./../../controllers/AuthenticationController");
const userValidation = require("./../../core/Validation/userValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const loginRoute = express.Router();

loginRoute
  .route("/login")
  .post(
    userValidation.loginUserValidator,
    checkValidation,
    authenticationController.authenticationLogin
  );

module.exports = loginRoute;
