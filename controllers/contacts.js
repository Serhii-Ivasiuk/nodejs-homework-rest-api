// Models
const Contact = require('../models/contact');
// Helpers
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const result = await Contact.find();

    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

    if (!result) throw HttpError(404);

    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) throw HttpError(404);

    res.json({ message: 'contact deleted' });
};

const updateContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!result) throw HttpError(404);

    res.json(result);
};

const updateContactStatusById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!result) throw HttpError(404);

    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateContactStatusById: ctrlWrapper(updateContactStatusById),
};
