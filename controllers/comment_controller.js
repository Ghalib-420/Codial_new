const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comment_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");
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
        cmt = await cmt.populate("user", "name email").execPopulate();
        // commentMailer.newComment(cmt);
        let job = queue.create("emails", cmt).save(function (err) {
          if (err) {
            console.log("Error in sending to the queue", err);
            return;
          }
          console.log("job enqueued", job.id);
        });

        // let job = await queueMicrotask
        //   .create("emails", cmt)
        //   .save(function (err) {
        //     if (err) {
        //       console.log("Error in creating a queue", err);
        //     }
        //     console.log(job.id);
        //   });
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
