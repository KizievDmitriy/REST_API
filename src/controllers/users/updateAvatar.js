const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;

    try {
        const resultUpload = path.join(__dirname, "../../../", "public", "avatars", originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", originalname);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error
    }
};

module.exports = updateAvatar;