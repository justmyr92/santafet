const express = require("express");
const cors = require("cors");
const pool = require("./db/sfm_db");
const app = express();
const bcrypt = require("bcrypt");
const sfm = require("./routes/route");
app.use(express.json());

app.use(cors());

//routes

app.use("/api", sfm);

app.listen(7722, () => {
    console.log("Server has started on port 7722");
});
