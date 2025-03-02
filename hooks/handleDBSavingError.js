const handleDBSavingError = (error, data, next) => {
    if (error.code === 11000 && error.name === 'MongoServerError') {
        const [field, value] = Object.entries(error.keyValue)[0];

        error.message = `Object with "${field}" "${value}" is already exist`;

        error.status = 409;
    } else {
        error.status = 400;
    }

    next();
};

module.exports = handleDBSavingError;
