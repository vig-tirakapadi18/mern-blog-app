const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();

dotenv.config();

mongoose
    .connect(process.env.CONN_STR)
    .then(() => console.log("Connected with MongoDB!"))
    .catch(err => console.log(err));

app.listen(5000, () => console.log("Server is listening on port 5000"));