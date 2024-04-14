const Post = require("../models/post.modal");
const { errorHandler } = require("../utils/error");

exports.create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are unauthorized to create a post!"));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please fill all the required fields!"));
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-");
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}; 