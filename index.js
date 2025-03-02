import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import carRoute from "./routes/car.route.js";
import carProgressRoute from "./routes/carProgress.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCar.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config({});

// call database connection here.......
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", carProgressRoute);


app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


