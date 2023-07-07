const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetsSchema = mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ["dog", "cat", "bird", "turtle"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    dateOfBirth: { type: Date, required: false },
    age: { type: Number, required: true },
    description: { type: String, required: false, default: "" },
    // image: { type: String, required: false, default: "Assets\\images\\anonymous.png" },
}, { timestamps: true });

const Pets = mongoose.model("Pets", PetsSchema);
