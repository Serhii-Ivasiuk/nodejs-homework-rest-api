// Libs
const Joi = require('joi');
// Models
const dataAPI = require('../models/contacts');
// Helpers
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'any.required': 'missing required "name" field',
    }),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required()
        .messages({
            'any.required': 'missing required "email" field',
        }),

    phone: Joi.string().required().messages({
        'any.required': 'missing required "phone" field',
    }),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'any.required': 'missing field "name"',
    }),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required()
        .messages({
            'any.required': 'missing field "email"',
        }),

    phone: Joi.string().required().messages({
        'any.required': 'missing field "phone"',
    }),
});

const getAllContacts = async (req, res) => {
    const result = await dataAPI.listContacts();

    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await dataAPI.getContactById(contactId);

    if (!result) {
        throw HttpError(404, 'Not found');
    }

    res.json(result);
};

const addContact = async (req, res) => {
    const { error } = addContactSchema.validate(req.body);

    if (error) {
        throw HttpError(400, error.message);
    }

    const result = await dataAPI.addContact(req.body);

    res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await dataAPI.removeContact(contactId);

    if (!result) {
        throw HttpError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
};

const updateContactById = async (req, res) => {
    const { error } = updateContactSchema.validate(req.body);

    if (error) {
        throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await dataAPI.updateContact(contactId, req.body);

    if (!result) {
        throw HttpError(404, 'Not found');
    }

    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
};
