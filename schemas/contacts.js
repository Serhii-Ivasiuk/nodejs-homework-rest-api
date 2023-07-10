// Libs
const Joi = require('joi');

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
});

module.exports = {
    add,
    update,
};
