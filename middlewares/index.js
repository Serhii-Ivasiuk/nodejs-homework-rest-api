const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const validateEmptyBody = require('./validateEmptyBody');
const authenticate = require('./authenticate');
const checkDuplicateContact = require('./checkDuplicateContact');
const uploadAvatar = require('./uploadAvatar');
const modifyAvatar = require('./modifyAvatar');

module.exports = {
    isValidId,
    validateBody,
    validateEmptyBody,
    authenticate,
    checkDuplicateContact,
    uploadAvatar,
    modifyAvatar,
};
