const mongoose = require("mongoose");
const BlogSchema = mongoose.model("Blog");

getPets = async (req, res, next) => {
  try {
    const pets = await BlogSchema.find({
      type: req.query.type,
    });
    return res.status(200).json(pets);
  } catch (err) {
    next(err);
  }
};

addPet = async (req, res, next) => {
  try {
    const pet = new BlogSchema({
      name: req.body.name,
      description: req.body.description,
      life_span: req.body.life_span,
      image: req.body.image,
    });
    await pet.save();
    return res.status(201).json({ message: "pet is added successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPets,
  addPet,
};
