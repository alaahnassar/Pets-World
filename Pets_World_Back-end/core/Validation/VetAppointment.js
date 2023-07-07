const mongoose = require("mongoose");

const checkDate = async (req, res, next) => {
  const start_date = new Date(req.body.start_date);
  const end_date = new Date(req.body.end_date);
  if (start_date > end_date) {
    return res.json({
      message: "start date can't be greater than end date",
      status: "400",
    });
  }

  next();
};
const checkTime = async (req, res, next) => {
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  if (start_time > end_time) {
    return res.json({
      message: "start time can't be greater than end time",
      status: "400",
    });
  }

  next();
};

module.exports = { checkDate, checkTime };
