// Contacts
const { joiContactsSchemas } = require('./contacts');
const { mongooseContactsSchema } = require('./contacts');
// Users
const { joiUsersSchemas } = require('./users');
const { mongooseUsersSchema } = require('./users');

module.exports = {
    // Contacts
    joiContactsSchemas,
    mongooseContactsSchema,
    // Users
    joiUsersSchemas,
    mongooseUsersSchema,
};
