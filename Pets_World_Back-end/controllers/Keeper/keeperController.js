const mongoose = require("mongoose");
const KeeperSchema = mongoose.model("Keeper");
const ownerSchema = mongoose.model("Owner");

getKeeperById = async (req, res, next) => {
  try {
    const keeper = await KeeperSchema.findOne({
      _id: req.params.id,
    }).populate({
      path: "owner_id",
      populate: {
        path: "user_id",
      },
    });
    res.status(200).json(keeper);
  } catch (err) {
    next(err);
  }
};
getAllKeeprs = async (req, res, next) => {
  try {
    const keeper = await KeeperSchema.find({
      owner_id: { $ne: req.query.id },
    }).populate({
      path: "owner_id",
      populate: {
        path: "user_id",
      },
    });
    res.status(200).json(keeper);
  } catch (err) {
    next(err);
  }
};

//keeper_id in params
//owner_id and rate in body
updateRating = async (req, res, next) => {
  try {
    const owner = await ownerSchema.findOne({
      _id: req.body.owner_id,
      keeperRating: {
        $elemMatch: { keeper_id: req.params.id }
      }
    });

    if (owner) {
      // Keeper does exist in owner's ratings
      const ownerUpdateKeeperRate = await ownerSchema.findOneAndUpdate(
        { _id: req.body.owner_id, 'keeperRating.keeper_id': req.params.id },
        { $set: { 'keeperRating.$.rate': req.body.rate } },
        { new: true }
      );

      if (ownerUpdateKeeperRate) {
        // compare the rating send in body with the rating of the found owner
        const existingRating = owner.keeperRating.find(rating => rating.keeper_id.toString() === req.params.id);

        const increment = Number(existingRating.rate) > Number(req.body.rate)
          ? -(Number(existingRating.rate) - Number(req.body.rate))
          : Number(req.body.rate) - Number(existingRating.rate);

        const keeperRating = await KeeperSchema.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc:
            {
              totalOfReviews: increment
            }
          },
          { new: true }
        );

        if (keeperRating) {
          return res.status(200).json(keeperRating);
        } else {
          return res.status(200).json({ message: "can't update Keeper data rating" });
        }

      } else {
        return res.status(200).json({ message: "can't update owner data rating" });
      }
    } else {
      // Keeper does not exist in owner's ratings, push a new rating entry
      const updatedOwner = await ownerSchema.findOneAndUpdate(
        { _id: req.body.owner_id, "keeperRating.keeper_id": { $ne: req.params.id } }, // Find owner by ID and check if KeeperId is not already in keeperRating
        { $push: { keeperRating: { keeper_id: req.params.id, rate: req.body.rate } } },
        { new: true }
      );

      if (updatedOwner) {
        const keeperRating = await KeeperSchema.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc:
            {
              numberOfReviews: 1,
              totalOfReviews: req.body.rate
            }
          },
          { new: true }
        );


        if (keeperRating) {
          return res.status(200).json(keeperRating);
        } else {
          return res.status(200).json({ message: "Can't update Keeper rating" });
        }
      } else {
        return res.status(404).json({ message: "Owner not found or Keeper rating already exists" });
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getKeeperById,
  getAllKeeprs,
  updateRating,
};
