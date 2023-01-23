const Post = require("../models/post");
const Comment = require("../models/comment");

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
module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, function (err) {
        //TODO error handeling
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
