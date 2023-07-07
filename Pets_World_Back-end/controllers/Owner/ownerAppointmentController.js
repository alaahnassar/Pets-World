const mongoose = require("mongoose");
const appointment= mongoose.model("VetAppointments");
const vetSchema = mongoose.model("Vet");



// Get all  appointment  by vet_id on appointment collection
exports.getVetAppointments = async (req, res) => {
    try {
        const appointments = await appointment.find({ vet_id: req.params.id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }