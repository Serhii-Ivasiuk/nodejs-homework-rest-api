// Libs
const bcrypt = require('bcryptjs');
// Models
const { User } = require('../../models');
// Helpers
const { HttpError } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw HttpError(409, 'Email in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

module.exports = register;
