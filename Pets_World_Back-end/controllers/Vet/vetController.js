const mongoose = require("mongoose");
const VetSchema = mongoose.model("Vet");
const userSchema = mongoose.model("User");
const ownerSchema = mongoose.model("Owner");

getVetById = async (req, res, next) => {
  try {
    const vet = await VetSchema.findOne({
      _id: req.params.id,
    }).populate({
      path: "user_id",
    });
    return res.status(200).json(vet);
  } catch (err) {
    next(err);
  }
};

updateVetById = async (req, res, next) => {
  try {
    const vet = await VetSchema.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          experience: req.body.experience,
          cost: req.body.cost,
          description: req.body.description,
          address: req.body.address,
        },
      },
      { new: true }
    );
    const user = await userSchema.findOneAndUpdate(
      { _id: vet.user_id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
          ...req.file && { image: req.file.path }, // Merge image property if req.file exists
          // image: req.body.image,
        },
      },
      { new: true }
    );
    return res.status(200).json({ vet, user });
  } catch (err) {
    next(err);
  }
};

getAllVet = async (req, res, next) => {
  try {
    const vet = await VetSchema.find({}).populate({
      path: "user_id",
    });
    return res.status(200).json(vet);
  } catch (err) {
    next(err);
  }
};

//vet_id in params
//owner_id and rate in body
updateRating = async (req, res, next) => {
  try {
    const owner = await ownerSchema.findOne({
      _id: req.body.owner_id,
      vetRating: {
        $elemMatch: { vet_id: req.params.id },
      },
    });

    if (owner) {
      // Vet does exist in owner's ratings
      const ownerUpdateVetRate = await ownerSchema.findOneAndUpdate(
        { _id: req.body.owner_id, "vetRating.vet_id": req.params.id },
        { $set: { "vetRating.$.rate": req.body.rate } },
        { new: true }
      );

      if (ownerUpdateVetRate) {
        // compare the rating send in body with the rating of the found owner
        const existingRating = owner.vetRating.find(
          (rating) => rating.vet_id.toString() === req.params.id
        );
        const increment =
          Number(existingRating.rate) > Number(req.body.rate)
            ? -(Number(existingRating.rate) - Number(req.body.rate))
            : Number(req.body.rate) - Number(existingRating.rate);

        const vetRating = await VetSchema.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { totalOfReviews: increment },
          },
          { new: true }
        );

        if (vetRating) {
          return res.status(200).json(vetRating);
        } else {
          clg;
          return res
            .status(200)
            .json({ message: "can't update vet data rating" });
        }
      } else {
        return res
          .status(200)
          .json({ message: "can't update owner data rating" });
      }
    } else {
      // Vet does not exist in owner's ratings, push a new rating entry
      const updatedOwner = await ownerSchema.findOneAndUpdate(
        { _id: req.body.owner_id, "vetRating.vet_id": { $ne: req.params.id } }, // Find owner by ID and check if vetId is not already in vetRating
        {
          $push: { vetRating: { vet_id: req.params.id, rate: req.body.rate } },
        },
        { new: true }
      );

      if (updatedOwner) {
        const vetRating = await VetSchema.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { numberOfReviews: 1, totalOfReviews: req.body.rate },
          },
          { new: true }
        );

        if (vetRating) {
          return res.status(200).json(vetRating);
        } else {
          return res.status(200).json({ message: "Can't update vet rating" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Owner not found or vet rating already exists" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVetById,
  getAllVet,
  updateVetById,
  updateRating,
};
