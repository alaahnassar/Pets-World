const mongoose = require("mongoose");
const petsSchema = mongoose.model("Pets");

getPets = async (req, res, next) => {
    try {
        const pets = await petsSchema.find();
        return res.json(pets);
    } catch (err) {
        next(err);
    }
};

getPetsByOwnerId = async (req, res, next) => {
    try {
        const pets = await petsSchema.find({
            owner_id: req.params.id,
        }).populate([
            { path: "owner_id" },
        ]);
        return res.status(200).json(pets);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getPets,
    getPetsByOwnerId,
};
