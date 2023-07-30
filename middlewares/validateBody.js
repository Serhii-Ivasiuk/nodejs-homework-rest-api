// Helpers
const { HttpError } = require('../helpers');

const validateBody = validationSchema => {
    const validate = (req, res, next) => {
        const { error } = validationSchema.validate(req.body);

        if (error) next(HttpError(400, error.message));

        next();
    };

    return validate;
};

module.exports = validateBody;
