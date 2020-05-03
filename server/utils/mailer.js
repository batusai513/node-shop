const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

function makeNiceEmail(text) {
  return `
    <div style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
      <h2>Hello there</h2>
      <p>${text}</p>
      <p>😘, Richard Roncancio</p>
    </div>
  `;
}

exports.transport = transport;
exports.makeNiceEmail = makeNiceEmail;
