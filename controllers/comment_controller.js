const comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  if (req.isAuthenticated()) {
    Post.findById(req.query.id, function (err, post) {
      if (post) {
        comment.create(
          {
            content: req.body.content,
            user: req.user._id,
            post: req.query.id,
          },
          function (err, cmt) {
            if (err) {
              console.log("Error in posting comment", err);
              return res.redirect("back");
            }
            post.comments.push(cmt);
            post.save();
            return res.redirect("/");
          }
        );
      } else {
        console.log("Error in finding the post");
        return res.redirect("back");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};
