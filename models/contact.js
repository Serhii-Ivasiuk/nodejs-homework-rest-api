// Libs
const { Schema, model } = require('mongoose');
// Hooks
const { handleMongooseError } = require('../hooks');
// Modules
const { mongooseContactsSchema } = require('../schemas');

const contactSchema = new Schema(...mongooseContactsSchema);

contactSchema.post('save', handleMongooseError);

contactSchema.post('findOneAndUpdate', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
