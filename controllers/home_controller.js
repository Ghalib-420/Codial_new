const { populate } = require("../models/post");
const Post = require("../models/post");
// const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")

      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({}).sort("-createdAt");

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};
