const User = require("../models/user");
const fs = require("fs");

module.exports.profile = async function (req, res) {
  let user = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    user: user,
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Password Mismatched");
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      req.flash("success", "Sign Up Successfully");
      return res.redirect("/users/sign-in");
    } else {
      req.flash("error", "User Already Present");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};
//Updating the user info
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****Multer Error", err);
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          // if()
          //this is saving the path of uploaded file into the avtar field in the db
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized User");
    return res.redirect("back");
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

// Sign out Or Destroying Session
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "Logged Out Successfully");

  return res.redirect("/");
};
