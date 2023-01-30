const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      let post = await Post.findById(req.query.id);

      if (post) {
        let cmt = await Comment.create({
          content: req.body.content,
          user: req.user._id,
          post: req.query.id,
        });

        post.comments.push(cmt);
        post.save();
        req.flash("success", "Posted");
        return res.redirect("/");
      } else {
        console.log("Error in finding the post");
        return res.redirect("back");
      }
    } else {
      req.flash("alert", "Sign In First");
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      req.flash("success", "Deleted");

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      // if (req.xhr) {
      //   // console.log("xhr call");
      //   return res.status(200).json({
      //     data: {
      //       comment_id: req.params.id,
      //     },
      //     message: "Comment Deleted",
      //     type: "success",
      //   });
      // }

      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};
