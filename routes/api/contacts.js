// Libs
const express = require('express');
// Controllers
const ctrl = require('../../controllers/contacts');
// Middlewares
const mdw = require('../../middlewares');
// Validation schemas
const { joiContactsSchemas } = require('../../schemas');

const contactsRouter = express.Router();

contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.get('/:contactId', mdw.isValidId, ctrl.getContactById);

contactsRouter.post(
    '/',
    mdw.validateBody(joiContactsSchemas.add),
    ctrl.addContact
);

contactsRouter.delete('/:contactId', mdw.isValidId, ctrl.deleteContactById);

contactsRouter.put(
    '/:contactId',
    mdw.isValidId,
    mdw.validateEmptyBody,
    mdw.validateBody(joiContactsSchemas.update),
    ctrl.updateContactById
);

contactsRouter.patch(
    '/:contactId/favorite',
    mdw.isValidId,
    mdw.validateBody(joiContactsSchemas.updateStatus),
    ctrl.updateContactStatusById
);

module.exports = contactsRouter;
