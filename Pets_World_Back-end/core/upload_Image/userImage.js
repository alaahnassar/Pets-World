const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images/userImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename of the uploaded image
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
