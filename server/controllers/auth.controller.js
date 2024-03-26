const bcryptjs = require('bcryptjs');

const User = require("../models/user.model");
const { errorHandler } = require('../utils/error');

exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        next(errorHandler(400, "All fields are required!"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(200).json({ message: "Signup successful!" });
    } catch (err) {
        next(err);
    }
};