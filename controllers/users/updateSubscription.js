// Models
const { User } = require('../../models');

const updateSubscription = async (req, res) => {
    const { _id } = req.user;

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    });

    res.json({
        email: updatedUser.email,
        subscription: updatedUser.subscription,
    });
};

module.exports = updateSubscription;
