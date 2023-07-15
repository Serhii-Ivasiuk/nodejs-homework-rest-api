// Libs
const Joi = require('joi');

// Joi schemas
const add = Joi.object({
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
    favorite: Joi.boolean(),
});

const update = Joi.object({
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
    favorite: Joi.boolean(),
});

const updateStatus = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': 'missing field "favorite"',
    }),
});

const JoiSchemas = { add, update, updateStatus };

// Mongoose schemas
const schema = {
    name: {
        type: String,
        required: [true, 'Set "name" for contact'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Set "email" for contact'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Set "phone" for contact'],
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
};

const settings = {
    versionKey: false,
};

const mongooseSchema = [schema, settings];

module.exports = {
    JoiSchemas,
    mongooseSchema,
};
