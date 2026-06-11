const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * @param {{ EmailId: string, UserName?: string }} userData
 * @param {string} subject
 * @param {string} htmlContent
 */
function sendMail(userData, subject, htmlContent) {
  const fromName = process.env.SMTP_FROM_NAME || "Auticare";
  const fromEmail = process.env.SMTP_FROM_EMAIL;

  return transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: userData.EmailId,
    subject,
    html: htmlContent,
  }).catch((err) => {
    console.error("[sendMail] Failed to send to", userData.EmailId, err.message);
  });
}

exports.sendMail = sendMail;
