const mongooose = require("mongoose")

const ratingSchema = new mongooose.Schema({
    customerId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "customers"
    },
    carId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "cars"
    },
    rating: {
        type: Number,

    },
    comment: {
        type: String,

    }
})

const Rating = mongooose.model("ratings", ratingSchema);
module.exports = Rating;