// Models
const { Contact } = require('../models');
// Helpers
const { HttpError } = require('../helpers');

const checkDuplicateContact = async (req, res, next) => {
    const { _id: owner } = req.user;

    const { name, email, phone } = req.body;

    const duplicateContact = await Contact.findOne({
        owner,
        $or: [{ name }, { email }, { phone }],
    });

    if (!duplicateContact) return next();

    let errorMessage = '';

    if (duplicateContact.name === name) {
        errorMessage = `Object with name "${name}" is already exist`;
    } else if (duplicateContact.email === email) {
        errorMessage = `Object with email "${email}" is already exist`;
    } else if (duplicateContact.phone === phone) {
        errorMessage = `Object with phone "${phone}" is already exist`;
    }

    next(HttpError(409, errorMessage));
};

module.exports = checkDuplicateContact;
