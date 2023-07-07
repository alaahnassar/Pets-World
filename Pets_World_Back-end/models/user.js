const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 7, max: 20 },
  phone: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  image: {
    type: String,
    required: false,
    default: "assets\\images\\anonymous.png",
  },
  role: {
    type: String,
    required: true,
    enum: ["owner", "vet"],
  },
}, { timestamps: true });
// for hash password
UserSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  },
  { timestamps: true }
);

UserSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();

  if (!update.password || !update.password.length) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(update.password, 10);
    this.set({ password: hash });
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", UserSchema);
