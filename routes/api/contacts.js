// Libs
const express = require('express');
// Controllers
const ctrl = require('../../controllers/contacts');
// Middlewares
const validateBody = require('../../middlewares/validateBody');
// Validation schemas
const { add, update } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(add), ctrl.addContact);

router.delete('/:contactId', ctrl.deleteContactById);

router.put('/:contactId', validateBody(update), ctrl.updateContactById);

module.exports = router;
