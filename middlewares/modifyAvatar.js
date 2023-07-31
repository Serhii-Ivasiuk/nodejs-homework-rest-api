// Libs
const fs = require('fs/promises');
const Jimp = require('jimp');
// Helpers
const { HttpError } = require('../helpers');

const modifyAvatar = async (req, res, next) => {
    if (!req.file) return next(HttpError(400, 'No file provided'));

    const { path } = req.file;

    try {
        const uploadedFile = await Jimp.read(path);

        uploadedFile.cover(250, 250).write(path);
    } catch {
        await fs.unlink(path);

        return next(HttpError(400, 'Bad file'));
    }

    next();
};

module.exports = modifyAvatar;
