const mongoose = require("mongoose");
const moment = require("moment");
const VetAppointmentsSchema = mongoose.model("VetAppointments");
const VetBookingSchema = mongoose.model("VetBooking");
getVetAppointments = async (req, res, next) => {
  try {
    const vetAppointments = await VetAppointmentsSchema.find({});
    return res.status(200).json(vetAppointments);
  } catch (err) {
    next(err);
  }
};

getVetAppointmentsById = async (req, res, next) => {
  try {
    const day = new Date();
    const dateTimeString = day.toISOString();
    const dateOnly = dateTimeString.split("T")[0];
    const vetAppointments = await VetAppointmentsSchema.find({
      day: { $gte: new Date(dateOnly) },
      vet_id: req.params.id,
    })
      .sort({ day: -1 })
      .exec();
    return res.status(200).json(vetAppointments);
  } catch (err) {
    next(err);
  }
};

getVetLastAppointmentsById = async (req, res, next) => {
  try {
    let startOfWeek = new Date();
    let endOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 1);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    const vetAppointments = await VetAppointmentsSchema.find({
      vet_id: req.params.id,
      day: { $gte: startOfWeek, $lte: endOfWeek },
    });
    return res.status(200).json(vetAppointments);
  } catch (err) {
    next(err);
  }
};

addAppointment = async (req, res, next) => {
  try {
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    for (start_date; start_date <= end_date; ) {
      const vetAppointments = await VetAppointmentsSchema.find({
        vet_id: req.params.id,
        day: start_date,
      });
      if (vetAppointments.length != 0) {
        for (let i = 0; i < vetAppointments.length; i++) {
          if (
            !(
              (start_time >= vetAppointments[i].start_time &&
                start_time <= vetAppointments[i].end_time) ||
              (end_time <= vetAppointments[i].end_time &&
                end_time >= vetAppointments[i].start_time)
            )
          ) {
            const appointment = new VetAppointmentsSchema({
              vet_id: req.params.id,
              day: start_date,
              start_time: req.body.start_time,
              end_time: req.body.end_time,
              number_of_clients: req.body.number_of_clients,
            });
            await appointment.save();
            break;
          }
        }
      } else {
        const appointment = new VetAppointmentsSchema({
          vet_id: req.params.id,
          day: start_date,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          number_of_clients: req.body.number_of_clients,
        });
        await appointment.save();
      }

      start_date.setDate(start_date.getDate() + 1);
    }
    return res
      .status(201)
      .json({ message: "appointment is added successfully", status: "201" });
  } catch (err) {
    next(err);
  }
};

updateAppointment = async (req, res, nex) => {
  try {
    const vet = await VetAppointmentsSchema.findOneAndUpdate(
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
    await VetBookingSchema.deleteMany({
      appointment_id: req.body.id,
    });
    await VetAppointmentsSchema.findOneAndDelete({
      _id: req.body.id,
    });
    return res
      .status(200)
      .json({ message: "appinotment has been deleted successfully vetapp" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVetAppointments,
  getVetAppointmentsById,
  getVetLastAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
