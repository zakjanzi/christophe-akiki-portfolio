const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // TLS requires secureConnection to be false
  port: 465, // port for secure SMTP
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
  connectionTimeout: 20000,
});

const sendMail = async (mailContent) => {
  let info = await transporter.sendMail({
    // from: "********", // sender address
    // to: to, // list of receivers
    // subject: subject, // Subject line
    // html: html, // html body
    from: mailContent.from,
    to: mailContent.to,
    subject: mailContent.subject,
    text: mailContent.text,
  });

  console.log(info);
  return info;
};

module.exports = {
  sendMail,
};
