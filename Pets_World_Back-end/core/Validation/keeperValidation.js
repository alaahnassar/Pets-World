const { body, param, query } = require("express-validator");

module.exports.getKeeperByIdValidator = [
  param("id").isMongoId().withMessage("The Keeper id isn't Valid"),
];

module.exports.addKeeperValidator = [
  body("owner_id").isMongoId().withMessage("that User id isn't Valid"),
  body("experience").isInt().isLength({ min: 0 }).withMessage("experience should be numeric and 0 or more"),
  body("cost").isNumeric().isLength({ min: 10 }).withMessage("experience should be numeric and 10 or more"),
  body("description").optional().isString().withMessage("Description should be a string"),
  body("address").isString().withMessage("Address should be a string"),
];

module.exports.updateKeeperValidator = [
  body("experience").optional().isInt().isLength({ min: 0 }).withMessage("experience should be numeric and 0 or more"),
  body("cost").optional().isNumeric().isLength({ min: 10 }).withMessage("experience should be numeric and 10 or more"),
  body("description").optional().isString().withMessage("Description should be a string"),
  body("address").optional().isString().withMessage("Address should be a string"),
  body("numberOfReviews").optional().isInt().isLength({ min: 0 }).withMessage("numberOfReviews should be integer and 0 or more"),
  body("totalOfReviews").optional().isInt().isLength({ min: 0 }).withMessage("totalOfReviews should be integer and 0 or more"),
];

module.exports.deleteKeeperValidator = [
  param("id").isMongoId().withMessage("The Keeper id isn't Valid"),
];
