const express = require("express")
const connectDB = require("./config/db")
const CustomerRouter = require("./routes/CustomerRoute")
const app = express();


connectDB();
app.use(express.json());
app.use("/api/customer", CustomerRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server running at http://localhost:${port}')
})