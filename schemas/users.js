// Libs
const Joi = require('joi');
// Constants
const { usersSubscriptionList } = require('../constants');

// Joi schemas
const register = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required()
        .messages({
            'any.required': 'missing required "email" field',
        }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'missing required "password" field',
    }),
    subscription: Joi.string()
        .valid(...usersSubscriptionList)
        .default('starter'),
    token: Joi.string().default(''),
});

const login = Joi.object({
    password: Joi.string().min(6).required().messages({
        'any.required': 'missing required "password" field',
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
});

const updateSubscription = Joi.object({
    subscription: Joi.string()
        .valid(...usersSubscriptionList)
        .required()
        .messages({
            'any.required': 'missing field "subscription"',
            'any.only':
                'Invalid subscription type. It should be one of "starter", "pro", or "business"',
        }),
});

const joiUsersSchemas = { register, login, updateSubscription };

// Mongoose schemas
const schema = {
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set "password" for user'],
    },
    subscription: {
        type: String,
        enum: usersSubscriptionList,
        default: 'starter',
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: { type: String, default: '' },
};

const settings = {
    versionKey: false,
};

const mongooseUsersSchema = [schema, settings];

module.exports = {
    joiUsersSchemas,
    mongooseUsersSchema,
};
