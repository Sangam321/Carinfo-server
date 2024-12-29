const express = require("express")
const connectDb = require("./config/db")
const CustomerRouter = require("./routes/customerRoute")
const CarRouter = require("./routes/CarRoute")
const AuthRouter = require("./routes/AuthRoute")
const ComparisonRouter = require("./routes/ComparisonRoute")
const app = express();


connectDb();
app.use(express.json());
app.use("/api/customer", CustomerRouter);
app.use("/api/car", CarRouter);
app.use("/api/comparison", ComparisonRouter);
app.use("/api/auth", AuthRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server running at http://localhost:${port}')
})