///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello capstone_svelte");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));