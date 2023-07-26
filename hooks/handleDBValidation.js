const handleDBValidation = next => {
    this.options.runValidators = true;

    next();
};

module.exports = handleDBValidation;
