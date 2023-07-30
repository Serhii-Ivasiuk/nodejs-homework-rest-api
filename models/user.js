// Libs
const { Schema, model } = require('mongoose');
// Hooks
const { handleDBSavingError, handleDBValidation } = require('../hooks');
// Modules
const { mongooseUsersSchema } = require('../schemas');

const userSchema = new Schema(...mongooseUsersSchema);

userSchema.pre('findOneAndUpdate', handleDBValidation);

userSchema.post('save', handleDBSavingError);

userSchema.post('findOneAndUpdate', handleDBSavingError);

const User = model('user', userSchema);

module.exports = User;
