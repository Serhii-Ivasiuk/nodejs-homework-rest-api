// Decorators
const { ctrlWrapper } = require('../../decorators');
// Controllers
const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const deleteContactById = require('./deleteContactById');
const updateContactById = require('./updateContactById');
const updateContactStatusById = require('./updateContactStatusById');

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateContactStatusById: ctrlWrapper(updateContactStatusById),
};
