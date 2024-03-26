const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

mongoose
    .connect(process.env.CONN_STR)
    .then(() => console.log("Connected with MongoDB!"))
    .catch(err => console.log(err));

app.listen(5000, () => console.log("Server is listening on port 5000"));