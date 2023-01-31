const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "936820081649-ce9m6gc3brpni133ck8u26pfkdabgg4o.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error**", err);
          return;
        }
        console.log(profile);

        //if found ,set this user as req.user
        if (user) {
          return done(null, user);
        } else {
          //if not found ,create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error**", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
