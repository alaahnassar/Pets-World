const { body, param, query } = require("express-validator");

module.exports.getKeeperBookingByIdValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];

module.exports.deleteKeeperAppointmentByIdValidator = [
  body("appointment_id").isMongoId().withMessage("The Appointment id isn't Valid"),
];

module.exports.addKeeperBookingValidator = [
  body("appointment_id").isMongoId().withMessage("that Appointment id isn't Valid"),
  body("keeper_id").isMongoId().withMessage("that Keeper id isn't Valid"),
  body("owner_id").isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").isMongoId().withMessage("that Pet id isn't Valid"),
  // body("day").isDate().withMessage("Invalid day format"),
];

module.exports.updateKeeperBookingValidator = [
  body("appointment_id").optional().isMongoId().withMessage("that Appointment id isn't Valid"),
  body("keeper_id").optional().isMongoId().withMessage("that Keeper id isn't Valid"),
  body("owner_id").optional().isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").optional().isMongoId().withMessage("that Pet id isn't Valid"),
  // body("day").optional().isDate().withMessage("Invalid day format"),
];

module.exports.deleteKeeperBookingValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];
