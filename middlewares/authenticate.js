// Libs
const jwt = require('jsonwebtoken');
// Helpers
const { HttpError } = require('../helpers');
// Models
const { User } = require('../models');
// Environment variables
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') return next(HttpError(401, 'Not authorized'));

    try {
        const { id } = jwt.verify(token, JWT_SECRET_KEY); // automatically throwing error when token is not valid or expired (need try...catch)

        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token)
            return next(HttpError(401, 'Not authorized'));

        req.user = user;

        next();
    } catch {
        next(HttpError(401, 'Not authorized'));
    }
};

module.exports = authenticate;
