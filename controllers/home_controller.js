const { populate } = require("../models/post");
const Post = require("../models/post");
// const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // Post.find({}, function (err, posts) {
  //   if (err) {
  //     return res.render("home", {
  //       title: "Home",
  //       post: [],
  //     });
  //   }
  //   return res.render("home", {
  //     title: "Home",
  //     post: posts,
  //   });
  // });
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      //TODO handle error

      User.find({}, function (err, users) {
        // TODO handle error

        return res.render("home", {
          title: "Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
