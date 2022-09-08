const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const photoResize = async (path) => {
  const image = await Jimp.read(path);

  image.resize(250, 250).write(path);
};

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    await photoResize(tempUpload);
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = updateAvatar;
