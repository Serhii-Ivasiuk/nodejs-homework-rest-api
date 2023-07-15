const handleMongooseError = (error, data, next) => {
    if (error.code === 11000) {
        const [field, value] = Object.entries(error.keyValue)[0];

        error.message = `Contact with "${field}" "${value}" is already exist`;
    }

    error.status = 400;

    next();
};

module.exports = handleMongooseError;
