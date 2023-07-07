const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.model("User");
const OwnerSchema = mongoose.model("Owner");
const PetsSchema = mongoose.model("Pets");
const VetSchema = mongoose.model("Vet");

updateUserPassword = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ _id: req.params.id }); // user_id

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        const updatedUser = await userSchema.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { password: hashedPassword } },
          { new: true }
        );

        console.log(updatedUser);
        return res.status(200).json(updatedUser);
      }

      return res.status(400).json({ message: 'Wrong Password' });
    }

    return res.status(404).json({ message: 'User Not Found' });
  } catch (error) {
    next(error);
  }
}

addUser = async (req, res, next) => {
  try {
    if (req.body.retypePassword === req.body.password) {
      console.log(req.body);
      const newUser = new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        gender: req.body.gender,
      });

      if (req.files && req.files.length > 0) {
        // const userImages = req.files.filter(
        //   (file) => file.fieldname === "image"
        // );
        // if (userImages.length > 0) {
        //   newUser.image = userImages[0].path;
        // }
        newUser.image = req.files[0].path;
      }

      // Code to check if the email is already registered
      const existingUser = await userSchema.findOne({ email: req.body.email });
      if (existingUser) {
        // Return an error response with a specific message for duplicate email
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }

      const savedUser = await newUser.save();

      if (req.body.role === "owner") {
        const owner = new OwnerSchema({
          user_id: savedUser._id,
        });
        await owner.save();
        if (req.body.pets) {
          const pets = JSON.parse(req.body.pets || "[]"); // Assume an array of pets is sent in the request body
          console.log(pets);
          const petPromises = pets.map(async (pet) => {
            const newPet = new PetsSchema({
              owner_id: owner._id,
              name: pet.name,
              type: pet.type,
              gender: pet.gender,
              dateOfBirth: pet.dateOfBirth,
              age: pet.age,
              description: pet.description,
            });
            await newPet.save();
          });
        }
        // const petData = await Promise.all(petPromises);
      } else {
        const vet = new VetSchema({
          user_id: savedUser._id,
          cost: req.body.cost,
          experience: req.body.experience,
          description: req.body.description,
          address: req.body.address,
        });
        // Handle the license image
        if (req.files && req.files.length > 1) {
          // const licenseImages = req.files.filter(
          //   (file) => file.fieldname === "license"
          // );
          // if (licenseImages.length > 0) {
          //   vet.licence = licenseImages[0].path;
          // }
          vet.licence = req.files[1].path;
        }

        await vet.save();
      }

      // Return a success response
      return res.status(201).json({ data: savedUser });
    } else {
      // Passwords do not match
      const error = new Error("Passwords do not match.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};

getUserById = async (req, res, next) => {
  try {
    const user = await userSchema
      .findOne({
        _id: req.params.id,
      })
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'No such user' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addUser,
  updateUserPassword,
  getUserById
};
