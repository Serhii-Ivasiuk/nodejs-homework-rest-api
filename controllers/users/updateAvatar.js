// Libs
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
// Models
const { User } = require('../../models');
// Helpers
const { HttpError } = require('../../helpers');

const avatarsDirPath = path.join(__dirname, '..', '..', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
    if (!req.file) return next(HttpError(400, 'No file provided'));

    const { _id, avatarURL: oldAvatarURL } = req.user;

    const oldAvatarPath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        oldAvatarURL
    );

    const { path: tempFilePath, originalname } = req.file;

    try {
        const uploadedFile = await Jimp.read(tempFilePath);

        uploadedFile.cover(250, 250).write(tempFilePath);
    } catch {
        await fs.unlink(tempFilePath);

        return next(HttpError(400, 'Bad file'));
    }

    const fileName = `${_id}_${originalname}`;

    const resultFilePath = path.join(avatarsDirPath, fileName);

    await fs.rename(tempFilePath, resultFilePath);

    try {
        await fs.access(oldAvatarPath);

        if (oldAvatarPath !== resultFilePath) await fs.unlink(oldAvatarPath);
    } catch {
        console.log('--- old avatar image does not found ---');
    }

    const avatarURL = path.join('avatars', fileName);

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { avatarURL },
        {
            new: true,
        }
    );

    res.json({ avatarURL: updatedUser.avatarURL });
};

module.exports = updateAvatar;
