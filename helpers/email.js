const nodemailer = require("nodemailer");

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * @param {{ EmailId: string }} userData
 * @param {string} subject
 * @param {string} htmlContent
 */
function sendMail(userData, subject, htmlContent) {
  const fromName = process.env.SMTP_FROM_NAME || "Auticare";
  // GoDaddy (and most SMTP providers) require From to match the authenticated user
  const fromEmail = process.env.SMTP_USER;

  if (!fromEmail) {
    console.error("[sendMail] SMTP_USER env var is not set — email not sent");
    return Promise.resolve();
  }

  return getTransporter()
    .sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: userData.EmailId,
      subject,
      html: htmlContent,
    })
    .then(() => {
      console.log("[sendMail] Sent to", userData.EmailId, "| Subject:", subject);
    })
    .catch((err) => {
      console.error("[sendMail] FAILED to", userData.EmailId, "|", err.message, "| Code:", err.code);
    });
}

exports.sendMail = sendMail;
