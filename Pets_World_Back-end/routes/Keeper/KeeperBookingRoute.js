const express = require("express");
const keeperBookingController = require("./../../controllers/Keeper/keeperBookingController");
const keeperBookingValidation = require("./../../core/Validation/keeperBookingValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authorization = require("./../../core/Authorization/Authorization");
const keeperRoute = express.Router();

keeperRoute
  .route("/keeper/booking")
  .get(keeperBookingController.getKeeperBooking)
  .post(
    keeperBookingValidation.addKeeperBookingValidator,
    checkValidation,
    keeperBookingController.addKeeperBooking
  );

keeperRoute
  .route("/keeper/booking/:id")
  .get(
    keeperBookingValidation.getKeeperBookingByIdValidator,
    checkValidation,
    keeperBookingController.getKeeperBookingById
  )
  .patch(
    keeperBookingValidation.updateKeeperBookingValidator,
    checkValidation,
    keeperBookingController.updateKeeperBooking
  )
  .delete(
    keeperBookingValidation.deleteKeeperBookingValidator,
    checkValidation,
    keeperBookingController.deleteKeeperBooking
  );

module.exports = keeperRoute;
