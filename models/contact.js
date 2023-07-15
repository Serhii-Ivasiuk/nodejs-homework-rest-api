// Libs
const { Schema, model } = require('mongoose');
// Helpers
const handleMongooseError = require('../helpers/handleMongooseError');
// Modules
const { mongooseSchema } = require('../schemas/contacts');

const contactSchema = new Schema(...mongooseSchema);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
