const { body, param, query } = require("express-validator");

module.exports.getVetAppointmentByIdValidator = [
  param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];

module.exports.getVetAppointmentByVetIdValidator = [
  param("id").isMongoId().withMessage("The Vet id isn't Valid"),
];

module.exports.addVetAppointmentValidator = [
  param("id").isMongoId().withMessage("that Vet id isn't Valid"),
  body("start_date").isDate().withMessage("Invalid start_date format"),
  body("end_date").isDate().withMessage("Invalid end_date format"),
  body("start_time").isString().withMessage("Invalid start_time format"),
  body("end_time").isString().withMessage("Invalid end_time format"),
  body("number_of_clients")
    .isInt({ min: 1 })
    .withMessage("Number Of Clients should be Integer and 1 or more"),
];

module.exports.updateVetAppointmentValidator = [
  body("id").isMongoId().withMessage("that Vet id isn't Valid"),
  body("start_date")
    .optional()
    .isDate()
    .withMessage("Invalid start_date format"),
  body("end_date").optional().isDate().withMessage("Invalid end_date format"),
  body("start_time")
    .optional()
    .isDate()
    .withMessage("Invalid start_time format"),
  body("end_time").optional().isDate().withMessage("Invalid end_time format"),
  body("number_of_clients")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number Of Clients should be Integer and 1 or more"),
];

module.exports.deleteVetAppointmentValidator = [
  param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];
