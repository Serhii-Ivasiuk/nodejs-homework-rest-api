// Libs
const express = require('express');
const Joi = require('joi');
// Models
const fileAPI = require('../../models/contacts');
// Helpers
const HttpError = require('../../helpers/HttpError');

const router = express.Router();

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

router.get('/', async (req, res, next) => {
    try {
        const result = await fileAPI.listContacts();

        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const result = await fileAPI.getContactById(contactId);

        if (!result) {
            throw HttpError(404, 'Not found');
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = addContactSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await fileAPI.addContact(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const result = await fileAPI.removeContact(contactId);

        if (!result) {
            throw HttpError(404, 'Not found');
        }

        res.json({ message: 'contact deleted' });
    } catch (error) {
        next(error);
    }
});

router.put('/:contactId', async (req, res, next) => {
    try {
        const { error } = updateContactSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }

        const { contactId } = req.params;

        const result = await fileAPI.updateContact(contactId, req.body);

        if (!result) {
            throw HttpError(404, 'Not found');
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
