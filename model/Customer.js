const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;