const mongooose = require("mongoose")

const ratingSchema = new mongooose.Schema({
    userId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "users"
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