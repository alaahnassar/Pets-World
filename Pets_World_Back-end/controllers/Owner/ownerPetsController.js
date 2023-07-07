const mongoose = require("mongoose");
const ownerSchema = mongoose.model("Owner");
const Pets = mongoose.model("Pets");

// Get all name of pet  by user ID 
// exports.getOwnerPets = async (req, res) => {
//   try {
//     const pets = await petSchema.find({ owner_id: req.params.id });
//     res.status(200).json(pets);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// }


// Get all  pet  by owner_id on pets collection
exports.getOwnerPets = async (req, res) => {
  try {
    const pets = await Pets.find({ owner_id: req.params.id });
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// create new pet from pets collection
exports.createOwnerPets = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await ownerSchema.findById(id);
    const pet = new Pets(req.body);
    pet.owner_id = owner._id;
    await pet.save();
    owner.pets_id = pet._id;
    await owner.save();
    res.status(200).json({ message: "pet created successfully.",status:'201'});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


//delete pet by  petid on pets collection
exports.deleteOwnerPets = async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.petid);
    await pet.deleteOne();
    res.status(200).json({ message: "pet deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
//edit pet by  petid on pets collection
exports.updateOwnerPets = async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.petid);
    Object.assign(pet, req.body);
    await pet.save();
    res.status(200).json({ message: "pet edit successfully.",status:'201'});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
