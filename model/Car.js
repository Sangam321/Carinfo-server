const mongooose = require("mongoose")

const carSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
})

const Car = mongooose.model("cars", carSchema);
module.exports = Car;