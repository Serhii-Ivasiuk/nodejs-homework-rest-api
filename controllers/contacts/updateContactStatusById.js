// Models
const { Contact } = require('../../models');
// Helpers
const { HttpError } = require('../../helpers');

const updateContactStatusById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!result) throw HttpError(404);

    res.json(result);
};

module.exports = updateContactStatusById;
