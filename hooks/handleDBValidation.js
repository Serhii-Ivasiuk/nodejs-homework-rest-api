const handleDBValidation = function (next) {
    this.options.runValidators = true;

    next();
};

module.exports = handleDBValidation;
