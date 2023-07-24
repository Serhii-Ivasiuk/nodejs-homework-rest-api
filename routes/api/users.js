// Libs
const express = require('express');
// Controllers
const ctrl = require('../../controllers/users');
// Middlewares
const mdw = require('../../middlewares');
// Validation schemas
const { joiUsersSchemas } = require('../../schemas');

const usersRouter = express.Router();

usersRouter.post(
    '/register',
    mdw.validateEmptyBody,
    mdw.validateBody(joiUsersSchemas.register),
    ctrl.register
);

usersRouter.post(
    '/login',
    mdw.validateEmptyBody,
    mdw.validateBody(joiUsersSchemas.login),
    ctrl.login
);

module.exports = usersRouter;
