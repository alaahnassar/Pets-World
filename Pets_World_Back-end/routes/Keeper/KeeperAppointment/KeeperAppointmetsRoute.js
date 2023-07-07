const express = require("express");
const KeeperAppointmentsRoute = express.Router();
const {
  getKeeperAppointments,
  getKeeperAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getKeeperLastAppointmentsById,
} = require("../../../controllers/Keeper/KeeperAppointment/KeeperAppointmentController");
const keeperAppointmentValidation = require("./../../../core/Validation/KeeperAppointmentValidation");
const {
  checkDate,
  dateValidate,
} = require("./../../../core/Validation/keeperAppointment");
const checkValidation = require("./../../../core/Validation/checkValidation");

KeeperAppointmentsRoute.route("/keeper/appointments")
  .get(getKeeperAppointments)
  .patch(updateAppointment)
  .delete(deleteAppointment);

KeeperAppointmentsRoute.route("/keeper/appointments/:id")
  .get(getKeeperAppointmentsById)
  .post(checkDate, dateValidate, addAppointment);

KeeperAppointmentsRoute.route("/keeper/lastAppointments/:id").get(
  keeperAppointmentValidation.getKeeperAppointmentByKeeperIdValidator,
  getKeeperLastAppointmentsById
);

module.exports = KeeperAppointmentsRoute;
