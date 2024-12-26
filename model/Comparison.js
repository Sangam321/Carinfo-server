const mongoose = require("mongoose")

const comparisonSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    car1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars"
    },

    car2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars"
    },
})

const Comparison = mongoose.model("comparison", comparisonSchema);
module.exports = Comparison;