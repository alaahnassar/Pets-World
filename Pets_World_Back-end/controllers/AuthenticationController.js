const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");
const Owner = mongoose.model("Owner");
const Keeper = mongoose.model("Keeper");
const Vet = mongoose.model("Vet");

module.exports.authenticationLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new Error("Please enter email and password.");
    error.status = 400;
    throw error;
  }

  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        let error = new Error("Invalid email or password.");
        error.status = 401;
        throw error;
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        let owner;
        let keeper;
        let vet;
        let routeRole;

        if (user.role === 'owner') {
          owner = await Owner.findOne({ user_id: user._id });
          if (owner.isKeeper) {
            keeper = await Keeper.findOne({ owner_id: owner._id });
            routeRole = 'keeper';
          } else {
            routeRole = 'owner';
          }
        } else if (user.role === 'vet') {
          vet = await Vet.findOne({ user_id: user._id });
          routeRole = 'vet';
        } else {
          routeRole = user.role;
        }

        const tokenPayload = {
          role: routeRole,
          id: user._id,
        };

        if (vet) {
          tokenPayload.vet_id = vet._id;
        }

        if (owner) {
          tokenPayload.owner_id = owner._id;
        }

        if (keeper) {
          tokenPayload.keeper_id = keeper._id;
        }

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY);

        res.status(200).json({ message: "User authenticated.", token });
      } else {
        let error = new Error("Invalid email or password.");
        error.status = 401;
        throw error;
      }
    })
    .catch((error) => next(error));
};
