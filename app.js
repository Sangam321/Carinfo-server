const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./routes/userRoute")
const CarRouter = require("./routes/CarRoute")
const AuthRouter = require("./routes/AuthRoute")
const ComparisonRouter = require("./routes/ComparisonRoute")
const FavouritesRouter = require("./routes/FavouritesRoute")
const RatingRouter = require("./routes/RatingRoute")
const app = express();


connectDb();
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/car", CarRouter);
app.use("/api/comparison", ComparisonRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/favourites", FavouritesRouter);
app.use("/api/rating", RatingRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server running at http://localhost:${port}')
})