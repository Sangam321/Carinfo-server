const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/db_Carinfo");
        console.log("Mongoose Connected")

    } catch (e) {
        console.log("MongoDb not Connected");

    }
}
module.exports = connectDB;