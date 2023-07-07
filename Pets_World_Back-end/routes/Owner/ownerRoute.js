const express = require("express");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const ownerController = require("./../../controllers/Owner/ownerController");
const ownerPetsController = require("./../../controllers/Owner/ownerPetsController");
const uploadImage = require("./../../core/upload_Image/userImage");
const ownerRoute = express.Router();

ownerRoute
  .route("/owners")
  .patch(uploadImage.single("image"), ownerController.updateOwnerById);
ownerRoute.route("/owner/:id").get(ownerController.getOwnerById);

ownerRoute.route("/owners/pets/:id").get(ownerPetsController.getOwnerPets);
ownerRoute
  .route("/owners/pets/:id/:petid")
  .delete(ownerPetsController.deleteOwnerPets);
ownerRoute.route("/owners/pets/:id").post(ownerPetsController.createOwnerPets);
ownerRoute
  .route("/owners/pets/:id/:petid")
  .patch(ownerPetsController.updateOwnerPets);

module.exports = ownerRoute;
