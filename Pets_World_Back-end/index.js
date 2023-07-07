const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var cors = require("cors");
require("./databaseCreation");
const registerRoute = require("./routes/Auth_Routes/Register");
const authorizationMW = require("./core/Authorization/Authorization");
const loginRoute = require("./routes/Auth_Routes/Login");
const VetAppointmentsRoute = require("./routes/Vet/VetAppointment/VetAppointmentsRoute");
const KeeperAppointmentssRoute = require("./routes/Keeper/KeeperAppointment/KeeperAppointmetsRoute");
const VetRoute = require("./routes/Vet/VetRoute");
const VetBookingRoute = require("./routes/Vet/VetBookingRoute");
const KeeperRoute = require("./routes/Keeper/KeeperRoute");
const KeeperBookingRoute = require("./routes/Keeper/KeeperBookingRoute");
const OwnerRoute = require("./routes/Owner/ownerRoute");
const BlogRoute = require("./routes/Owner/blogRoute");
const PetsRoute = require("./routes/Pets/petsRoute");
const UserRoute = require("./routes/Auth_Routes/user");

////// please don't change anything and use the middlewores //////

//connect to database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Example app listening on port 8080!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// first layer logging middleware
app.use((req, res, next) => {
  next();
});
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:4200' // Replace with your Angular app's URL
// }));

app.use(express.json());
app.use("/assets", express.static("assets"));

//  middelware layers of routing and authentication
app.use(VetAppointmentsRoute);
app.use(KeeperAppointmentssRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(authorizationMW);
app.use(UserRoute);
app.use(VetRoute);
app.use(VetBookingRoute);
app.use(KeeperRoute);
app.use(KeeperBookingRoute);
app.use(OwnerRoute);
app.use(BlogRoute);
app.use(PetsRoute);

//  third layer no page found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

// fourth layer for handling errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err + " " });
});
