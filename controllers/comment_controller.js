const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  if (req.isAuthenticated()) {
    Post.findById(req.query.id, function (err, post) {
      if (post) {
        Comment.create(
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

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    //TODO handle error
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          // TODO handle error
          return res.redirect("/");
        }
      );
      // return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  });
};
