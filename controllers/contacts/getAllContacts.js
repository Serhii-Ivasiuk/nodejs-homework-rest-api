// Models
const { Contact } = require('../../models');

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Contact.find({ owner }).populate(
        'owner',
        'email subscription'
    );

    res.json(result);
};

module.exports = getAllContacts;
