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
        return res.redirect("/");
      } else {
        console.log("Error in finding the post");
        return res.redirect("back");
      }
    } else {
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    consile.log("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};
