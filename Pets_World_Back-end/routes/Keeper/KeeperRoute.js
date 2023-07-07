const express = require("express");
const keeperController = require("./../../controllers/Keeper/keeperController");
const keeperValidation = require("./../../core/Validation/keeperValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const keeperRoute = express.Router();


keeperRoute.route("/keepers/:id")
    .get(keeperValidation.getKeeperByIdValidator,
        checkValidation,
        keeperController.getKeeperById)
    .patch(keeperValidation.getKeeperByIdValidator,
        checkValidation,
        keeperController.updateRating)

keeperRoute.route("/keepers")
    .get(keeperController.getAllKeeprs)
module.exports = keeperRoute;


