const handleDBValidation = function (next) {
    this.options.runValidators = true; // using function declaration because of "this"

    next();
};

module.exports = handleDBValidation;
