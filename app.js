const express = require("express")
const connectDb = require("./config/db")
const CustomerRouter = require("./routes/customerRoute")
const app = express();


connectDb();
app.use(express.json());
app.use("/api/customer", CustomerRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server running at http://localhost:${port}')
})