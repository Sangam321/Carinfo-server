const mongooose = require("mongoose")

const userSchema = new mongooose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongooose.model("users", userSchema);
module.exports = User;