// Decorators
const { ctrlWrapper } = require('../../decorators');
// Controllers
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    updateSubscription: ctrlWrapper(updateSubscription),
};
