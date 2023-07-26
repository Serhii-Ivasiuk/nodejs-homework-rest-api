// Libs
const { Schema, model } = require('mongoose');
// Hooks
const { handleDBSavingError, handleDBValidation } = require('../hooks');
// Modules
const { mongooseContactsSchema } = require('../schemas');

const contactSchema = new Schema(...mongooseContactsSchema);

contactSchema.pre('findOneAndUpdate', handleDBValidation);

contactSchema.post('save', handleDBSavingError);

contactSchema.post('findOneAndUpdate', handleDBSavingError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
