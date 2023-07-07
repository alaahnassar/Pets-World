const { body, param, query } = require("express-validator");
const role = (value) => {
  const validValues = ["owner", "vet"];
  return validValues.includes(value);
};
const gender = (value) => {
  const validValues = ["male", "female"];
  return validValues.includes(value);
};
module.exports.addUserValidator = [
  body("firstName")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastName")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars"),
  body("email").isEmail().withMessage("Email must be in email format"),
  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("password  must be string and more than 5 chars"),
  body("phone").isMobilePhone("ar-EG").withMessage("phone number not valid"),
  body("gender").custom(gender).withMessage("Gender isn't valid"),
  body("role").custom(role).withMessage("Role isn't valid"),
];
module.exports.loginUserValidator = [
  body("email").isEmail().withMessage("Email must be in email format"),
  body("password")
    .isString()
    .isLength({ min: 7 })
    .withMessage("password  must be string and more than 7 chars"),
];

module.exports.updateUserValidator = [
  param("id").isMongoId().withMessage("User id dosen't exist"),
  body("firstName")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastName")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars"),

  body("email").isEmail().withMessage("Email must be in email format"),

  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("password  must be string and more than 5 chars"),
];

module.exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("User id is must be valid"),
];

module.exports.getUserByIdValidator = [
  param("id").isMongoId().withMessage("The User id is doesn't exist"),
];

module.exports.updateUserPasswordValidator = [
  param("id").isMongoId().withMessage("The User id is doesn't exist"),
  body("password")
    .isString()
    .isLength({ min: 7 })
    .withMessage("password  must be string and more than 7 chars"),
  body("newPassword")
    .isString()
    .isLength({ min: 7 })
    .withMessage("password  must be string and more than 7 chars"),
];
