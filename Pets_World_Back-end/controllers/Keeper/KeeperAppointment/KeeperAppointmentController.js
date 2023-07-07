const mongoose = require("mongoose");
const KeeperAppointmentSchema = mongoose.model("KeeperAppointments");
const KeeperBookingSchema = mongoose.model("KeeperBooking");

getKeeperAppointments = async (req, res, next) => {
  try {
    const KeeperAppointment = await KeeperAppointmentSchema.find({});
    return res.status(200).json(KeeperAppointment);
  } catch (err) {
    next(err);
  }
};

getKeeperAppointmentsById = async (req, res, next) => {
  try {
    const day = new Date();
    const dateTimeString = day.toISOString();
    const dateOnly = dateTimeString.split("T")[0];
    const KeeperAppointment = await KeeperAppointmentSchema.find({
      start_time: { $gte: new Date(dateOnly) },
      keeper_id: req.params.id,
    }).sort({ createdAt: -1 });
    return res.status(200).json(KeeperAppointment);
  } catch (err) {
    next(err);
  }
};

getKeeperLastAppointmentsById = async (req, res, next) => {
  try {
    const keeperAppointments = await KeeperAppointmentSchema.findOne({
      keeper_id: req.params.id,
    })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json(keeperAppointments);
  } catch (err) {
    next(err);
  }
};

addAppointment = async (req, res, next) => {
  try {
    const appointment = new KeeperAppointmentSchema({
      keeper_id: req.params.id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      number_of_pets: req.body.number_of_pets,
    });
    await appointment.save();
    return res
      .status(201)
      .json({ message: "appointment is added successfully", status: "201" });
  } catch (err) {
    next(err);
  }
};

updateAppointment = async (req, res, nex) => {
  try {
    const keeper = await KeeperAppointmentSchema.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(201).json({ status: "201" });
  } catch (err) {
    next(err);
  }
};

deleteAppointment = async (req, res, next) => {
  try {
    await KeeperBookingSchema.deleteMany({
      appointment_id: req.body.id,
    });
    await KeeperAppointmentSchema.findOneAndDelete({
      _id: req.body.id,
    });
    return res
      .status(200)
      .json({ message: "appointment has been deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getKeeperAppointments,
  getKeeperAppointmentsById,
  getKeeperLastAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
