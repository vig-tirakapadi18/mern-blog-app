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

        const token = jwt.sign({ id: validEmail._id, isAdmin: validEmail.isAdmin }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validEmail._doc;

        res.status(200).cookie("token", token, { httpOnly: true }).json(rest);
    } catch (err) {
        next(err);
    }
};

exports.google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie("token", token, {
                httpOnly: true
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie("token", token, { httpOnly: true }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}