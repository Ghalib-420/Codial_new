const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVTAR_PATH = path.join("/uploads/users/avatars");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVTAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static function

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avtar"
);
userSchema.statics.avatarPath = AVTAR_PATH;
const User = mongoose.model("User", userSchema);

module.exports = User;
