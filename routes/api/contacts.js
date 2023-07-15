// Libs
const express = require('express');
// Controllers
const ctrl = require('../../controllers/contacts');
// Middlewares
const validateBody = require('../../middlewares/validateBody');
const isValidId = require('../../middlewares/isValidId');
// Validation schemas
const { JoiSchemas } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(JoiSchemas.add), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.deleteContactById);

router.put(
    '/:contactId',
    isValidId,
    validateBody(JoiSchemas.update),
    ctrl.updateContactById
);

router.patch(
    '/:contactId/favorite',
    isValidId,
    validateBody(JoiSchemas.updateStatus),
    ctrl.updateContactStatusById
);

module.exports = router;
