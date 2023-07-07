const { body, param, query } = require("express-validator");

module.exports.getVetBookingByIdValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];

module.exports.deleteVetAppointmentByIdValidator = [
  body("appointment_id").isMongoId().withMessage("The Appointment id isn't Valid"),
];

module.exports.addVetBookingValidator = [
  body("appointment_id").isMongoId().withMessage("that Appointment id isn't Valid"),
  body("vet_id").isMongoId().withMessage("that Vet id isn't Valid"),
  body("owner_id").isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").isMongoId().withMessage("that Pet id isn't Valid"),
  body("day").isDate().withMessage("Invalid day format"),

];

module.exports.updateVetBookingValidator = [
  body("appointment_id").optional().isMongoId().withMessage("that Appointment id isn't Valid"),
  body("vet_id").optional().isMongoId().withMessage("that Vet id isn't Valid"),
  body("owner_id").optional().isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").optional().isMongoId().withMessage("that Pet id isn't Valid"),
  body("day").optional().isDate().withMessage("Invalid day format"),

];

module.exports.deleteVetBookingValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];
