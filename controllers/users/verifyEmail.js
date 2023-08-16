// Models
const { User } = require('../../models');
// Helpers
const { HttpError } = require('../../helpers');

const verifyEmail = async (req, res, next) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) throw HttpError(404, 'User not found');

    await User.findByIdAndUpdate(user._id, {
        verificationToken: 'empty',
        verify: true,
    });

    res.json({ message: 'Verification successful' });
};

module.exports = verifyEmail;
