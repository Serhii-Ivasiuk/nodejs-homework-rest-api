// Libs
const { Schema, model } = require('mongoose');
// Helpers
const { handleMongooseError } = require('../helpers');
// Modules
const { mongooseContactsSchema } = require('../schemas');

const contactSchema = new Schema(...mongooseContactsSchema);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
