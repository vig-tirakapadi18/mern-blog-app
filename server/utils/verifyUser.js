const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return nect(errorHandler(401, "Unauthorized!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "Unauthroized!"))
        }
        req.user = user;
        next();
    })
}