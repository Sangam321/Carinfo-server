const mongooose = require("mongoose")

const favouriteSchema = new mongooose.Schema({
    favouriteId: {
        type: String,
        required: true
    },
    carId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "cars"
    },
    userID: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "customers"
    }
})

const Favourites = mongooose.model("favourites", favouriteSchema);
module.exports = Favourites;