const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const avatarName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(__dirname, "../../../", "public", "avatars", avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", avatarName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });

        const avatarSize = await Jimp.read(resultUpload);
        avatarSize.cover(250, 250).quality(60).writeAsync(resultUpload);
        
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error
    }
    
};

module.exports = updateAvatar;