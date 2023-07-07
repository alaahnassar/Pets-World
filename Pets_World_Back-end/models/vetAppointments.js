const mongoose = require("mongoose");
const { Schema } = mongoose;

const VetAppointmentsSchema = mongoose.Schema(
  {
    vet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vet",
      required: true,
    },
    day: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    number_of_clients: { type: Number, required: true },
  },
  { timestamps: true }
);

const VetAppointments = mongoose.model(
  "VetAppointments",
  VetAppointmentsSchema
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
