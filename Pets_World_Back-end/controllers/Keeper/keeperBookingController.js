const mongoose = require("mongoose");
const KeeperBookingSchema = mongoose.model("KeeperBooking");
const KeeperAppointmentSchema = mongoose.model("KeeperAppointments");
const petsSchema = mongoose.model("Pets");

getKeeperBooking = async (req, res, next) => {
  try {
    const keeperBooking = await KeeperBookingSchema.find(req.query).populate([
      { path: "appointment_id" },
      {
        path: "owner_id",
        populate: {
          path: "user_id",
        },
      },
      {
        path: "keeper_id",
        populate: {
          path: "owner_id",
          populate: {
            path: "user_id",
          },
        },
      },
      {
        path: "pet_id",
      },
    ]);
    return res.status(200).json(keeperBooking);
  } catch (err) {
    next(err);
  }
};

getKeeperBookingById = async (req, res, next) => {
  try {
    const keeperBooking = await KeeperBookingSchema.findOne({
      _id: req.params.id,
    }).populate([
      { path: "appointment_id" },
      {
        path: "owner_id",
        populate: {
          path: "user_id",
        },
      },
      { path: "pet_id" },
    ]);
    return res.status(200).json(keeperBooking);
  } catch (err) {
    next(err);
  }
};

addKeeperBooking = async (req, res, next) => {
  try {
    const check = await KeeperBookingSchema.findOne({
      appointment_id: req.body.appointment_id,
      owner_id: req.body.owner_id,
      pet_id: req.body.pet_id,
    });

    if (check) {
      return res.status(400).json({ message: "Booking done before" });
    }

    const checkPetOwner = await petsSchema.findOne({
      _id: req.body.pet_id,
      owner_id: req.body.owner_id,
    });

    if (!checkPetOwner) {
      return res
        .status(404)
        .json({ message: "This pet doesn't belong to this owner" });
    }

    const keeperBooking = new KeeperBookingSchema({
      appointment_id: req.body.appointment_id,
      keeper_id: req.body.keeper_id,
      owner_id: req.body.owner_id,
      pet_id: req.body.pet_id,
      day: req.body.day,
    });

    await keeperBooking.save();

    await KeeperAppointmentSchema.findOneAndUpdate(
      { _id: req.body.appointment_id },
      {
        $inc: {
          number_of_pets: -1,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "booking done successfully" });
  } catch (err) {
    next(err);
  }
};

updateKeeperBooking = async (req, res, next) => {
  // check that the date is before the appiontment by 2 hours at least handel in front first
  try {
    if (req.body.pet_id) {
      const checkPetOwner = await petsSchema.findOne({
        _id: req.body.pet_id,
        owner_id: req.body.owner_id, // will get in token
      });

      if (!checkPetOwner) {
        return res
          .status(404)
          .json({ message: "This pet doesn't belong to this owner" });
      }
    }

    const keeperBooking = await KeeperBookingSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pet_id: req.body.pet_id,
        },
      },
      { new: true }
    );
    return res.status(200).json(keeperBooking);
  } catch (err) {
    next(err);
  }
};

deleteKeeperBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await KeeperBookingSchema.findOneAndDelete({
      _id: bookingId,
    });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    const appointment = await KeeperAppointmentSchema.findOneAndUpdate(
      { _id: req.query.appointment_id },
      {
        $inc: {
          number_of_pets: 1,
        },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getKeeperBooking,
  getKeeperBookingById,
  addKeeperBooking,
  updateKeeperBooking,
  deleteKeeperBooking,
};
