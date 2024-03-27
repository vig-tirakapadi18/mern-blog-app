const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

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

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(errorHandler(400, "Email & Password must be provided."))
    }

    try {
        const validEmail = await User.findOne({ email });
        if (!validEmail) {
            return next(errorHandler(400, "Invalid credentials."));
        }

        const validPassword = bcryptjs.compareSync(password, validEmail.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid credentials."));
        }

        const token = jwt.sign({ id: validEmail._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validEmail._doc;

        res.status(200).cookie("token", token, { httpOnly: true }).json(rest);
    } catch (err) {
        next(err);
    }
};