// Libs
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// Models
const { User } = require('../../models');
// Helpers
const { HttpError, generateId, sendEmail } = require('../../helpers');
// Environment variables
const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw HttpError(409, 'Email in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = await generateId();

    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        avatarURL,
        verificationToken,
    });

    const verificationEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
    };

    await sendEmail(verificationEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

module.exports = register;
