// Libs
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Models
const { User } = require('../../models');
// Helpers
const { HttpError } = require('../../helpers');
// Environment variables
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, 'Email or password is wrong');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw HttpError(401, 'Email or password is wrong');

    const jwtPayload = { id: user._id };

    const token = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: '23h' });

    await User.findByIdAndUpdate(user.id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

module.exports = login;
