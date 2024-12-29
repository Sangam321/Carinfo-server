const mongooose = require("mongoose")

const comparisonSchema = new mongooose.Schema({
    customerId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "customers"
    },
    car1Id: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "cars"
    },

    car2Id: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "cars"
    },
})

const Comparison = mongooose.model("comparison", comparisonSchema);
module.exports = Comparison;