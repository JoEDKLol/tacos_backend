const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.GMAIL_APP_KEY,
  },
});

const sendEmail = async (sendEmail, numbers) => {
  try {
 
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER, // 보내는 이메일
      to: sendEmail, // 받는 이메일
      subject: `Tacos Email Verify Numbers`,
      html: `<p>${numbers}</p>`,
    });

    return true;

  } catch (error) {
    return false;
  }
};

module.exports.sendEmail = sendEmail;