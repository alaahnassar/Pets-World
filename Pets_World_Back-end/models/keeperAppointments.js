const mongoose = require("mongoose");
const { Schema } = mongoose;

const KeeperAppointmentsSchema = mongoose.Schema(
  {
    keeper_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Keeper",
      required: true,
    },
    start_time: { type: Date, required: true }, //day
    end_time: { type: Date, required: true }, //day
    number_of_pets: { type: Number, required: true },
  },
  { timestamps: true }
);

const KeeperAppointments = mongoose.model(
  "KeeperAppointments",
  KeeperAppointmentsSchema
);

// start_hour: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 23
//   },
//   start_minute: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 59
//   },
