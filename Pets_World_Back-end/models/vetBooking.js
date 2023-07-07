const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");

const vetBookingSchema = mongoose.Schema(
  {
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VetAppointments",
      required: true,
    },
    vet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vet",
      required: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true,
    },
    day: { type: Date, required: true },
  },
  { timestamps: true }
);

vetBookingSchema.pre("save", function (next) {
  const currentDateTime = moment().add(3, "hours").toDate();
  this.createdAt = currentDateTime;
  this.updatedAt = currentDateTime;
  next();
});

const VetBooking = mongoose.model("VetBooking", vetBookingSchema);
