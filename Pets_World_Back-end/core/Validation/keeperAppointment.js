const mongoose = require("mongoose");
const KeeperAppointmentSchema = mongoose.model("KeeperAppointments");

const checkDate = async (req, res, next) => {
  const start_time = new Date(req.body.start_time);
  const end_time = new Date(req.body.end_time);

  if (start_time > end_time) {
    return res.json({
      message: "start time can't be greater than end time",
      status: "400",
    });
  }

  next();
};

const dateValidate = async (req, res, next) => {
  const start_time = new Date(req.body.start_time);
  const end_time = new Date(req.body.end_time);
  const appointment = await KeeperAppointmentSchema.find({
    keeper_id: req.params.id,
    $or: [
      {
        start_time: { $lte: start_time },
        end_time: { $gte: start_time },
      },
      {
        start_time: { $lte: end_time },
        end_time: { $gte: end_time },
      },
      {
        start_time: { $gte: start_time },
        end_time: { $lte: end_time },
      },
    ],
  });
  if (appointment.length != 0) {
    return res.json({
      message: "you have an appointment in the same period",
      status: "400",
    });
  }
  next();
};

module.exports = { checkDate, dateValidate };
