const { sendMail: doSendMail } = require("../utils/mail.js");

const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  const response = await doSendMail({
    from: email,
    // to: "contact@christopheakiki.me",
    to: process.env.OWNER_EMAIL,
    subject: "Mail from my portfolio website",
    text: `From: ${name}\n\n${message}`,
  });

  return res.json({
    success: response.accepted.length > 0,
  });
};

module.exports = {
  sendMail,
};
