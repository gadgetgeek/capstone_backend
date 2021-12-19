///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

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
// MODELS
////////////////////////////////
//DailyDids schema
const DidsSchema = new mongoose.Schema({
    pickOne: [String],
    activity: String,
    time: String,
},
    { timestamps: true }
);

const Dids = mongoose.model("Dids", DidsSchema);

  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies
  app.use(express.urlencoded({extended: true})) //just in case

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello capstone_svelte");
});

// index route (GET)
// returns all /dids as json
app.get("/dids", async (req, res) => {
    try {
        res.json(await Dids.find({}));
    } catch (error) {
        res.status(400).json({ error });
    }
});

//create route (POST)
// post request to /dids, uses request body to make a new did
app.post("/dids", async (req, res) => {
    try {
      // create a new dids
        res.json(await Dids.create(req.body));
    } catch (error) {
        res.status(400).json({ error });
    }
});

// update route (PUT)
// put request to /dids/:id, updates the dids based on id with request body
app.put("/dids/:id", async (req, res) => {
    try {
      // update a new did (dids/:id)
        res.json(
        await Dids.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Destroy Route (DELETE)
// delete request to "/dids/:id"
app.delete("/dids/:id", async (req, res) => {
    try {
      // delete a dids
        res.json(await Dids.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Show Route (GET)
// show request to "/dids/:id", shows the individual did specified
app.get("/dids/:id", async (req, res) => { 
    try {
      // delete a dids
        res.json(await Dids.findById(req.params.id));
    } catch (error) {
        res.status(400).json({ error });
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));