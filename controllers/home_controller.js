const Post = require("../models/post");

module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    Post.findOne({ user: req.user._id }, function (err, posts) {
      if (err) {
        return res.render("home", {
          title: "Home",
          post: [],
        });
      }
      return res.render("home", {
        title: "Home",
        post: posts,
      });
    });
  } else {
    Post.find({}, function (err, posts) {
      if (err) {
        return res.render("home", {
          title: "Home",
          post: [],
        });
      }
      return res.render("home", {
        title: "Home",
        post: posts,
      });
    });
  }

  // return res.redirect("/users/sign-in");
};

// module.exports.actionName = function(req, res){}
