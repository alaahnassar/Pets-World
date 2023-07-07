const express = require("express");
const uploadImage = require("./../../core/upload_Image/userImage");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const vetRoute = express.Router();


vetRoute.route("/vets").get(vetController.getAllVet)
  .patch(
    uploadImage.single("image"),
    vetValidation.updateVetValidator,
    checkValidation,
    vetController.updateVetById
  );

vetRoute.route("/vets/:id")
  .get(
    vetValidation.getVetByIdValidator,
    checkValidation,
    vetController.getVetById
  )
  .patch(
    vetValidation.getVetByIdValidator,
    checkValidation,
    vetController.updateRating
  )

module.exports = vetRoute;
