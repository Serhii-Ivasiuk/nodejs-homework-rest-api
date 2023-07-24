// Helpers
const { ctrlWrapper } = require('../../decorators');
// Controllers
const register = require('./register');
const login = require('./login');

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};
