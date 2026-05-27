const fetch = require("node-fetch");

function sendMail(userData, subject, htmlContent) {
  return fetch(process.env.SEND_IN_BLUE_API, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.SEND_IN_BLUE_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Auticare",
        email: "mail@embrightinfotech.com",
      },
      to: [
        {
          email: userData.EmailId,
          name: userData.UserName,
        },
      ],
      subject,
      htmlContent,
    }),
  });
}

exports.sendMail = sendMail;