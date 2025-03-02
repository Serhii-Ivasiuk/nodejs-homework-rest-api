// Libs
const { isValidObjectId } = require('mongoose');
// Helpers
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId))
        next(HttpError(400, `Id "${contactId}" is not valid id`));

    next();
};

module.exports = isValidId;
