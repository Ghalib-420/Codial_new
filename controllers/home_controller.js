const { populate } = require("../models/post");
const Post = require("../models/post");

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
    .exec(function (err, posts) {
      if (err) {
        return res.render("home", {
          title: "Home",
          post: [],
        });
      }
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

// return res.redirect("/users/sign-in");

// module.exports.actionName = function(req, res){}
