const dotenv = require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const logger = require("./logger/log");
const connectDB = require("./connection/db");

//express parser
app.use(express.json());

//db connection
connectDB()

//routes
const menuRoute = require("./routes/menu");
const personRoute = require("./routes/person");

app.get("/", logger, (req, res) => {
    res.status(200).json({message: "Welcome To Hotel"});
});

app.use("/api/menu", logger, menuRoute);
app.use("/api/person", logger, personRoute);

app.listen(PORT, () => {
    console.log(`server is started running on port: ${PORT}`);
});

