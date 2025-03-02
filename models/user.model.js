import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car'
        }
    ],
    photoUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);