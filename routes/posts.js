const express = require("express");
const router = express.Router();
const passport = require("passport");
const postsController = require("../controllers/posts_controller");

router.post(
  "/create-post",
  //   passport.checkAuthentication,
  postsController.createPost
);

module.exports = router;
