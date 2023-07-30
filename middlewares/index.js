const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const validateEmptyBody = require('./validateEmptyBody');
const authenticate = require('./authenticate');
const checkDuplicateContact = require('./checkDuplicateContact');

module.exports = {
    isValidId,
    validateBody,
    validateEmptyBody,
    authenticate,
    checkDuplicateContact,
};
