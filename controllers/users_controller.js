const User = require("../models/user");

module.exports.profile = async function (req, res) {
  let user = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
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
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      req.flash("success", "User updated Successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "Unauthorized User");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
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
