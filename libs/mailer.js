var nodemailer = require("nodemailer");
var config = require('../config');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.get("crashEmailFrom"),
        pass: config.get("crashEmailPassword")
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Roadmap Viewer ✔ <reporttool.server@gmail.com>", // sender address
    to: config.get("crashEmailRecipients"), // list of recipients
    subject: "Uncaught Error on server ✔", // Subject line
    text: "Error Happened ✔", // plaintext body
    html: "<b>Error Happened ✔</b>" // html body
};

exports.sendMail = function(message, log) {
    mailOptions.text = message + "/n" + log;
    mailOptions.html = "<h2>" + message + "</h2><span>" + log + "</span>";

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};
