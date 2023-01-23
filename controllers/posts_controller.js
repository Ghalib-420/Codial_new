const Post = require("../models/post");

module.exports.createPost = function (req, res) {
  if (req.isAuthenticated()) {
    Post.create(
      {
        content: req.body.content,
        user: req.user._id,
      },
      function (err, post) {
        if (err) {
          console.log("Error in creating Post in db");
          return res.redirect("back");
        }
        // console.log(post);
        return res.redirect("/");
      }
    );
  } else {
    return res.redirect("/users/sign-in");
  }
};
