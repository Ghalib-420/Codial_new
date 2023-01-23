const Post = require("../models/post");

module.exports.createPost = function (req, res) {
  if (req.isAuthenticated()) {
    Post.create(req.body, function (err, post) {
      if (err) {
        console.log("Error in creating Post in db");
        return res.redirect("back");
      }
      console.log(post);
      return res.redirect("/");
    });
  }
};
