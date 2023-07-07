const jwt = require("jsonwebtoken");
const express = require("express");
module.exports = (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.role = decodedToken.role;
    req.id = decodedToken.id;
    next();
  } catch (error) {
    error.message = "Not Authenticated";
    error.status = 401;
    next(error);
  }
};

module.exports.checkVet = (req, res, next) => {
  if (req.role === "vet") next();
  else {
    let error = new Error("Vet Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.checkOwner = (req, res, next) => {
  if (req.role === "owner") next();
  else {
    let error = new Error("Owner Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.checkOwner = (req, res, next) => {
  if (req.role === "keeper") next();
  else {
    let error = new Error("Keeper Not Authorized");
    error.status = 403;
    next(error);
  }
};
