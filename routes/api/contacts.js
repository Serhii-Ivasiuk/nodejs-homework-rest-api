// Libs
const express = require('express');
// Controllers
const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.deleteContactById);

router.put('/:contactId', ctrl.updateContactById);

module.exports = router;
