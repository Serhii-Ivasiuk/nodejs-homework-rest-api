// Libs
const { Schema, model } = require('mongoose');
// Modules
const { mongooseSchema } = require('../schemas/contacts');

const contactSchema = new Schema(...mongooseSchema);

const Contact = model('contact', contactSchema);

module.exports = Contact;
