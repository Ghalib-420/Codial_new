const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const { Strategy } = require("passport-jwt");

const router = express.Router();
const postsApi = require("../../../controllers/api/v1/posts_api");
// const postsApi_v2 = require("../../../controllers/api/v2/posts_api");
// router.get("/", postsApi.index);
router.get("/", postsApi.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
);

module.exports = router;
