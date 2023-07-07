const mongoose = require("mongoose");
const { Schema } = mongoose;

const KeeperSchema = mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
    experience: { type: Number, required: false, min: 0, default: 0 },
    cost: { type: Number, required: true, min: 10 },
    description: { type: String, required: false },
    address: { type: String, required: true },
    numberOfReviews: { type: Number, min: 0, default: 0 },
    totalOfReviews: { type: Number, min: 0, default: 0 },
}, { timestamps: true });

const Keeper = mongoose.model("Keeper", KeeperSchema);
