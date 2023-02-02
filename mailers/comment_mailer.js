const nodeMailer = require("../config/nodemailer");

//this is another way of exporting a method

exports.newComment = (comment) => {
  console.log("inside newComment mailer");
  nodeMailer.transporter.sendMail(
    {
      from: "mkumardummy270@gmail.com",
      to: comment.user.email,
      subject: "New Comment",
      html: "<h1>Yup ,Your comment is now publised",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
