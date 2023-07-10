const ctrlWrapper = ctrl => {
    const wrappedCtrl = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    return wrappedCtrl;
};

module.exports = ctrlWrapper;
