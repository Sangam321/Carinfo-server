import mongoose from "mongoose";
const carPurchaseSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        required: true
    }

}, { timestamps: true });
export const CarPurchase = mongoose.model('CarPurchase', carPurchaseSchema);