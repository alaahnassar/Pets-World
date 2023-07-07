const { body, param, query } = require("express-validator");

module.exports.getPetsByOwnerIdValidator = [
  param("id").isMongoId().withMessage("The Owner id isn't Valid"),
];
