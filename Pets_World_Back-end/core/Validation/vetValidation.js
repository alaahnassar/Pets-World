const { body, param, query } = require("express-validator");

module.exports.getVetByIdValidator = [
  param("id").isMongoId().withMessage("The Vet id isn't Valid"),
];

module.exports.addVetValidator = [
  body("user_id").isMongoId().withMessage("that User id isn't Valid"),
  body("experience")
    .isInt({ min: 0 })
    .withMessage("experience should be numeric and 0 or more"),
  body("cost")
    .isNumeric()
    .custom((value) => {
      return parseFloat(value) >= 10;
    })
    .withMessage("cost should be numeric and 10 or more"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description should be a string"),
  body("address").isString().withMessage("Address should be a string"),
];

module.exports.updateVetValidator = [
  body("experience")
    .optional()
    .isInt({ min: 0 })
    .withMessage("experience should be numeric and 0 or more"),
  body("cost")
    .optional()
    .isNumeric()
    .custom((value) => {
      return parseFloat(value) >= 10;
    })
    .withMessage("cost should be numeric and 10 or more"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description should be a string"),
  body("numberOfReviews")
    .optional()
    .isInt({ min: 0 })
    .withMessage("numberOfReviews should be integer and 0 or more"),
  body("totalOfReviews")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalOfReviews should be integer and 0 or more"),
  body("address").optional().isString().withMessage("Address should be a string"),
];

module.exports.deleteVetValidator = [
  param("id").isMongoId().withMessage("The Vet id isn't Valid"),
];
