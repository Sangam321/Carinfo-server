import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carTitle: {
        type: String,
        required: true
    },
    subTitle: { type: String },
    description: { type: String },
    category: {
        type: String,
        required: true
    },
    carLevel: {
        type: String,
        enum: ["Sport", "Sedan", "SUV"]
    },
    carPrice: {
        type: Number
    },
    carThumbnail: {
        type: String
    },
    enrolledUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const Car = mongoose.model("Car", carSchema);