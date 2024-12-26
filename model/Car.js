const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Car = mongoose.model("cars", carSchema);
module.exports = Car;