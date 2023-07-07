const { body, param, query } = require("express-validator");

module.exports.getKeeperAppointmentByIdValidator = [
    param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];

module.exports.getKeeperAppointmentByKeeperIdValidator = [
    param("id").isMongoId().withMessage("The Keeper id isn't Valid"),
];

module.exports.addKeeperAppointmentValidator = [
    param("id").isMongoId().withMessage("that Keeper id isn't Valid"),
    body("start_time").isDate().withMessage("Invalid start_time format"),
    body("end_time").isDate().withMessage("Invalid end_time format"),
    body("number_of_pets").isInt({ min: 1 }).withMessage("Number Of pets should be Integer and 1 or more"),
];

module.exports.updateKeeperAppointmentValidator = [
    body("id").isMongoId().withMessage("that Keeper id isn't Valid"),
    body("start_time").optional().isDate().withMessage("Invalid start_time format"),
    body("end_time").optional().isDate().withMessage("Invalid end_time format"),
    body("number_of_pets").optional().isInt({ min: 1 }).withMessage("Number Of pets should be Integer and 1 or more"),
]

module.exports.deleteKeeperAppointmentValidator = [
    param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];
