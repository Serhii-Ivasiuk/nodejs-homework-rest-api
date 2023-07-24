// Libs
const { Schema, model } = require('mongoose');
// Hooks
const { handleMongooseError } = require('../hooks');
// Modules
const { mongooseUsersSchema } = require('../schemas');

const userSchema = new Schema(...mongooseUsersSchema);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
