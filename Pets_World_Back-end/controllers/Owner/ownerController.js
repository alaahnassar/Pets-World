const mongoose = require("mongoose");
const ownerSchema = mongoose.model("Owner");
const userSchema = mongoose.model("User");
const keeperSchema = mongoose.model("Keeper");

getOwnerById = async (req, res, next) => {
  try {
    const owner = await ownerSchema
      .findOne({
        _id: req.params.id,
      })
      .populate({
        path: "user_id",
      });
    if (owner.isKeeper == true) {
      const keeper = await keeperSchema.findOne({
        owner_id: req.params.id,
      });
      return res.status(200).json({ owner, keeper });
    }
    return res.status(200).json({ owner });
  } catch (err) {
    next(err);
  }
};

updateOwnerById = async (req, res, next) => {
  try {
    const owner = await ownerSchema.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          isKeeper: req.body.isKeeper,
        },
      },
      { new: true }
    );
    if (owner && owner.isKeeper === true) {
      const keeper = await keeperSchema.findOne({ owner_id: owner._id });
      if (keeper) {
        //   update
        const keeper = await keeperSchema.findOneAndUpdate(
          {
            owner_id: owner._id,
          },
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
      } else {
        //   create
        const createKeeper = new keeperSchema({
          owner_id: owner._id,
          experience: req.body.experience,
          cost: req.body.cost,
          description: req.body.description,
          address: req.body.address,
        });
        await createKeeper.save();
      }
    }
    const user = await userSchema.findOneAndUpdate(
      { _id: owner.user_id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
          ...(req.file && { image: req.file.path }), // Merge image property if req.file exists
        },
      },
      { new: true }
    );
    return res.status(200).json({ owner, user });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  updateOwnerById,
  getOwnerById,
};
