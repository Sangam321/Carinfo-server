import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId: { type: String },
    viewed: { type: Boolean }
});

const carProgressSchema = new mongoose.Schema({
    userId: { type: String },
    carId: { type: String },
    completed: { type: Boolean },
    lectureProgress: [lectureProgressSchema]
});

export const CarProgress = mongoose.model("CarProgress", carProgressSchema);