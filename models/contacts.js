// Libs
const fs = require('fs/promises');
const path = require('path');
// Helpers
const generateId = require('../helpers/generateId');
const checkExistingContact = require('../helpers/checkExistingContact');
const HttpError = require('../helpers/HttpError');

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
    const buffer = await fs.readFile(contactsPath);

    return JSON.parse(buffer);
};

const getContactById = async contactId => {
    const allContacts = await listContacts();

    const contactById = allContacts.find(item => item.id === contactId);

    return contactById || null;
};

const removeContact = async contactId => {
    const allContacts = await listContacts();

    const index = allContacts.findIndex(item => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const [removedContact] = allContacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

    return removedContact;
};

const addContact = async body => {
    const allContacts = await listContacts();

    const isExistingContact = checkExistingContact(
        allContacts,
        body.name,
        body.email,
        body.phone
    );

    if (isExistingContact) {
        throw HttpError(400, isExistingContact);
    }

    const newContact = {
        id: await generateId(),
        ...body,
    };

    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

    return newContact;
};

const updateContact = async (contactId, body) => {
    const allContacts = await listContacts();

    const index = allContacts.findIndex(item => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const updatedContact = (allContacts[index] = {
        id: contactId,
        ...body,
    });

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));

    return updatedContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
