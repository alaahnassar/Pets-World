const express = require("express");
const petsValidation = require("./../../core/Validation/petsValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const petController = require("./../../controllers/Pets/petController");
const petsRoute = express.Router();

petsRoute.route("/pets/:id")
    .get(petsValidation.getPetsByOwnerIdValidator,
        petController.getPetsByOwnerId);

module.exports = petsRoute;
