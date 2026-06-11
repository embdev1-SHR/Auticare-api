exports.forgotPasswordHTML2 = (data) => {
  return `<!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            
            <head>
              <meta charset="utf-8"> <!-- utf-8 works for most cases -->
              <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
              <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
              <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
              <title>Auticare Password Reset OTP</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
            
              <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
            
              <!-- CSS Reset : BEGIN -->
              <style>
                /* What it does: Remove spaces around the email design added by some email clients. */
                /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                html,
                body {
                  margin: 0 auto !important;
                  padding: 0 !important;
                  height: 100% !important;
                  width: 100% !important;
                  background: #f1f1f1;
                }
            
                /* What it does: Stops email clients resizing small text. */
                * {
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
                }
            
                /* What it does: Centers email on Android 4.4 */
                div[style*="margin: 16px 0"] {
                  margin: 0 !important;
                }
            
                /* What it does: Stops Outlook from adding extra spacing to tables. */
                table,
                td {
                  mso-table-lspace: 0pt !important;
                  mso-table-rspace: 0pt !important;
                }
            
                /* What it does: Fixes webkit padding issue. */
                table {
                  border-spacing: 0 !important;
                  border-collapse: collapse !important;
                  table-layout: fixed !important;
                  margin: 0 auto !important;
                }
            
                /* What it does: Uses a better rendering method when resizing images in IE. */
                img {
                  -ms-interpolation-mode: bicubic;
                }
            
                /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
                a {
                  text-decoration: none;
                }
            
                /* What it does: A work-around for email clients meddling in triggered links. */
                *[x-apple-data-detectors],
                /* iOS */
                .unstyle-auto-detected-links *,
                .aBn {
                  border-bottom: 0 !important;
                  cursor: default !important;
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
            
                /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
                .a6S {
                  display: none !important;
                  opacity: 0.01 !important;
                }
            
                /* What it does: Prevents Gmail from changing the text color in conversation threads. */
                .im {
                  color: inherit !important;
                }
            
                /* If the above doesn't work, add a .g-img class to any image in question. */
                img.g-img+div {
                  display: none !important;
                }
            
                /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
                /* Create one of these media queries for each additional viewport size you'd like to fix */
            
                /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                  u~div .email-container {
                    min-width: 320px !important;
                  }
                }
            
                /* iPhone 6, 6S, 7, 8, and X */
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                  u~div .email-container {
                    min-width: 375px !important;
                  }
                }
            
                /* iPhone 6+, 7+, and 8+ */
                @media only screen and (min-device-width: 414px) {
                  u~div .email-container {
                    min-width: 414px !important;
                  }
                }
              </style>
              <!-- CSS Reset : END -->
              <!-- Progressive Enhancements : BEGIN -->
              <style>
                .primary {
                  background: #30e3ca;
                }
            
                .bg_white {
                  background: #ffffff;
                }
            
                .bg_light {
                  background: #fafafa;
                }
            
                .bg_black {
                  background: #000000;
                }
            
                .bg_dark {
                  background: rgba(0, 0, 0, .8);
                }
            
                .email-section {
                  padding: 2.5em;
                }
            
                /*BUTTON*/
                .btn {
                  padding: 10px 15px;
                  display: inline-block;
                }
            
                .btn.btn-primary {
                  border-radius: 5px;
                  background: #30e3ca;
                  color: #ffffff;
                }
            
                .btn.btn-white {
                  border-radius: 5px;
                  background: #ffffff;
                  color: #000000;
                }
            
                .btn.btn-white-outline {
                  border-radius: 5px;
                  background: transparent;
                  border: 1px solid #fff;
                  color: #fff;
                }
            
                .btn.btn-black-outline {
                  border-radius: 0px;
                  background: transparent;
                  border: 2px solid #000;
                  color: #000;
                  font-weight: 700;
                }
            
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                  font-family: 'Lato', sans-serif;
                  color: #000000;
                  margin-top: 0;
                  font-weight: 400;
                }
            
                body {
                  font-family: 'Lato', sans-serif;
                  font-weight: 400;
                  font-size: 15px;
                  line-height: 1.8;
                  color: rgba(0, 0, 0, .4);
                }
            
                a {
                  color: #30e3ca;
                }
            
                table {}
            
                /*LOGO*/
                .logo h1 {
                  margin: 0;
                }
            
                .logo h1 a {
                  color: #30e3ca;
                  font-size: 24px;
                  font-weight: 700;
                  font-family: 'Lato', sans-serif;
                }
            
                /*HERO*/
                .hero {
                  position: relative;
                  z-index: 0;
                }
            
                .hero .text {
                  color: rgba(0, 0, 0, .3);
                }
            
                .hero .text h2 {
                  color: #000;
                  font-size: 40px;
                  margin-bottom: 0;
                  font-weight: 400;
                  line-height: 1.4;
                }
            
                .hero .text h3 {
                  font-size: 24px;
                  font-weight: 300;
                }
            
                .hero .text h2 span {
                  font-weight: 600;
                  color: #30e3ca;
                }
            
                /*HEADING SECTION*/
                .heading-section {}
            
                .heading-section h2 {
                  color: #000000;
                  font-size: 28px;
                  margin-top: 0;
                  line-height: 1.4;
                  font-weight: 400;
                }
            
                .heading-section .subheading {
                  margin-bottom: 20px !important;
                  display: inline-block;
                  font-size: 13px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  color: rgba(0, 0, 0, .4);
                  position: relative;
                }
            
                .heading-section .subheading::after {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: -10px;
                  content: '';
                  width: 100%;
                  height: 2px;
                  background: #30e3ca;
                  margin: 0 auto;
                }
            
                .heading-section-white {
                  color: rgba(255, 255, 255, .8);
                }
            
                .heading-section-white h2 {
                  line-height: 1;
                  padding-bottom: 0;
                }
            
                .heading-section-white h2 {
                  color: #ffffff;
                }
            
                .heading-section-white .subheading {
                  margin-bottom: 0;
                  display: inline-block;
                  font-size: 13px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  color: rgba(255, 255, 255, .4);
                }
            
                ul.social {
                  padding: 0;
                }
            
                ul.social li {
                  display: inline-block;
                  margin-right: 10px;
                }
            
                /*FOOTER*/
                .footer {
                  border-top: 1px solid rgba(0, 0, 0, .05);
                  color: rgba(0, 0, 0, .5);
                }
            
                .footer .heading {
                  color: #000;
                  font-size: 20px;
                }
            
                .footer ul {
                  margin: 0;
                  padding: 0;
                }
            
                .footer ul li {
                  list-style: none;
                  margin-bottom: 10px;
                }
            
                .footer ul li a {
                  color: rgba(0, 0, 0, 1);
                }
            
                @media screen and (max-width: 500px) {}
              </style>
            </head>
            
            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
              <center style="width: 100%; background-color: #f1f1f1;">
                <div
                  style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                </div>
                <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                  <!-- BEGIN BODY -->
                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                    style="margin: auto;">
                    <tr>
                      <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td class="logo" style="text-align: center;">
                              <h1><a href="#">Auticare</a></h1>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr><!-- end tr -->
                    <tr>
                      <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                        <table>
                          <tr>
                            <td>
                              <div class="text" style="padding: 0 2.5em; text-align: center;">
                                <h2>${data.otp}</h2>
                                <h3>Your Password Reset OTP</h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr><!-- end tr -->
                    <!-- 1 Column Text + Button : END -->
                  </table>
                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                    style="margin: auto;">
                    <tr>
                      <td class="bg_light" style="text-align: center;">
                        <p>Auticare</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </center>
            </body>
            </html>`;
};

exports.forgotPasswordHTML = (data) => {
  return `<!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email</title>
      <meta name="description" content="Reset Password Email">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested OTP to reset your password</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Your Password Reset OTP
                                          </p>
                                          <a style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${data.otp}</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.auticare.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`;
};

const BASE_STYLE = `
  <style>
    body{margin:0;padding:0;background:#f2f3f8;font-family:'Open Sans',Arial,sans-serif;}
    .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.08);overflow:hidden;}
    .header{background:#30e3ca;padding:28px 40px;text-align:center;}
    .header h1{margin:0;color:#fff;font-size:26px;font-weight:700;letter-spacing:.5px;}
    .body{padding:36px 40px;}
    .body h2{color:#1e1e2d;font-size:20px;margin:0 0 8px;}
    .body p{color:#555;font-size:15px;line-height:1.7;margin:0 0 16px;}
    .cred-box{background:#f7f8fa;border:1px solid #e2e6ea;border-radius:6px;padding:16px 20px;margin:20px 0;}
    .cred-box p{margin:4px 0;font-size:14px;color:#333;}
    .cred-box span{font-weight:700;color:#1e1e2d;}
    .btn{display:inline-block;margin-top:24px;padding:12px 32px;background:#30e3ca;color:#fff;border-radius:50px;font-size:15px;font-weight:600;text-decoration:none;}
    .footer{background:#f7f8fa;border-top:1px solid #eee;padding:16px 40px;text-align:center;color:#aaa;font-size:12px;}
  </style>
`;

exports.welcomeMailHTML = (data) => {
  const loginUrl = (process.env.FRONTEND_URL || "https://dashboard.myauticare.com") + "/login";
  const accountType = data.AccountType || "account";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Welcome to Auticare</title>${BASE_STYLE}</head>
  <body>
    <div class="wrap">
      <div class="header"><h1>Welcome to Auticare</h1></div>
      <div class="body">
        <h2>Your ${accountType} is ready!</h2>
        <p>Hi${data.Name ? " " + data.Name : ""},</p>
        <p>Your Auticare ${accountType} has been created. Here are your login credentials:</p>
        <div class="cred-box">
          <p>Email / Username: <span>${data.EmailId}</span></p>
          <p>Password: <span>${data.Password}</span></p>
        </div>
        <p>Please log in and change your password after first sign-in.</p>
        <a href="${loginUrl}" class="btn">Log In to Auticare</a>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} Auticare &mdash; <a href="https://www.myauticare.com" style="color:#30e3ca;">www.myauticare.com</a></div>
    </div>
  </body></html>`;
};

exports.centerApprovalHTML = (data) => {
  const loginUrl = (process.env.FRONTEND_URL || "https://dashboard.myauticare.com") + "/login";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Center Account Approved</title>${BASE_STYLE}</head>
  <body>
    <div class="wrap">
      <div class="header"><h1>Account Approved!</h1></div>
      <div class="body">
        <h2>Your center registration has been approved</h2>
        <p>Hi${data.CenterName ? " " + data.CenterName : ""},</p>
        <p>Great news! Your center registration on Auticare has been reviewed and <strong>approved</strong>. Your account is now active.</p>
        <div class="cred-box">
          <p>Email: <span>${data.EmailId}</span></p>
          <p>Center: <span>${data.CenterName || "—"}</span></p>
        </div>
        <p>Use the email and password you registered with to log in.</p>
        <a href="${loginUrl}" class="btn">Log In to Auticare</a>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} Auticare &mdash; <a href="https://www.myauticare.com" style="color:#30e3ca;">www.myauticare.com</a></div>
    </div>
  </body></html>`;
};

exports.centerRejectionHTML = (data) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Center Registration Update</title>${BASE_STYLE}</head>
  <body>
    <div class="wrap">
      <div class="header" style="background:#e74c3c;"><h1>Registration Update</h1></div>
      <div class="body">
        <h2>Your registration could not be approved</h2>
        <p>Hi${data.CenterName ? " " + data.CenterName : ""},</p>
        <p>Thank you for registering your center on Auticare. After review, we were unable to approve your registration at this time.</p>
        <p>If you believe this is a mistake or need clarification, please contact our support team at <a href="mailto:support@myauticare.com">support@myauticare.com</a>.</p>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} Auticare &mdash; <a href="https://www.myauticare.com" style="color:#30e3ca;">www.myauticare.com</a></div>
    </div>
  </body></html>`;
};

exports._welcomeMailHTML_UNUSED = (data) => {
  return `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title>Auticare</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
  
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
  
    <!-- CSS Reset : BEGIN -->
    <style>
      /* What it does: Remove spaces around the email design added by some email clients. */
      /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
      }
  
      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
  
      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }
  
      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
  
      /* What it does: Fixes webkit padding issue. */
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }
  
      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
        text-decoration: none;
      }
  
      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],
      /* iOS */
      .unstyle-auto-detected-links *,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }
  
      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
        color: inherit !important;
      }
  
      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img+div {
        display: none !important;
      }
  
      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */
  
      /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u~div .email-container {
          min-width: 320px !important;
        }
      }
  
      /* iPhone 6, 6S, 7, 8, and X */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u~div .email-container {
          min-width: 375px !important;
        }
      }
  
      /* iPhone 6+, 7+, and 8+ */
      @media only screen and (min-device-width: 414px) {
        u~div .email-container {
          min-width: 414px !important;
        }
      }
  
      .primary {
        background: #30e3ca;
      }
  
      .bg_white {
        background: #ffffff;
      }
  
      .bg_light {
        background: #fafafa;
      }
  
      .bg_black {
        background: #000000;
      }
  
      .bg_dark {
        background: rgba(0, 0, 0, .8);
      }
  
      .email-section {
        padding: 2.5em;
      }
  
      /*BUTTON*/
      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
  
      .btn.btn-primary {
        border-radius: 5px;
        background: #30e3ca;
        color: #ffffff;
      }
  
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
  
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
  
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }
  
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Lato', sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }
  
      body {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, .4);
      }
  
      a {
        color: #30e3ca;
      }
  
      table {}
  
      /*LOGO*/
      .logo h1 {
        margin: 0;
      }
  
      .logo h1 a {
        color: #30e3ca;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Lato', sans-serif;
      }
  
      /*HERO*/
      .hero {
        position: relative;
        z-index: 0;
      }
  
      .hero .text {
        color: rgba(0, 0, 0, .3);
      }
  
      .hero .text h2 {
        color: #000;
        font-size: 40px;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 1.4;
      }
  
      .hero .text h3 {
        font-size: 24px;
        font-weight: 300;
      }
  
      .hero .text h2 span {
        font-weight: 600;
        color: #30e3ca;
      }
  
      /*HEADING SECTION*/
      .heading-section {}
  
      .heading-section h2 {
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
        font-weight: 400;
      }
  
      .heading-section .subheading {
        margin-bottom: 20px !important;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(0, 0, 0, .4);
        position: relative;
      }
  
      .heading-section .subheading::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: '';
        width: 100%;
        height: 2px;
        background: #30e3ca;
        margin: 0 auto;
      }
  
      .heading-section-white {
        color: rgba(255, 255, 255, .8);
      }
  
      .heading-section-white h2 {
        line-height: 1;
        padding-bottom: 0;
      }
  
      .heading-section-white h2 {
        color: #ffffff;
      }
  
      .heading-section-white .subheading {
        margin-bottom: 0;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, .4);
      }
  
      ul.social {
        padding: 0;
      }
  
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }
  
      /*FOOTER*/
      .footer {
        border-top: 1px solid rgba(0, 0, 0, .05);
        color: rgba(0, 0, 0, .5);
      }
  
      .footer .heading {
        color: #000;
        font-size: 20px;
      }
  
      .footer ul {
        margin: 0;
        padding: 0;
      }
  
      .footer ul li {
        list-style: none;
        margin-bottom: 10px;
      }
  
      .footer ul li a {
        color: rgba(0, 0, 0, 1);
      }
  
      @media screen and (max-width: 500px) {}
    </style>
  </head>
  
  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
    <center style="width: 100%; background-color: #f1f1f1;">
      <div
        style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto;" class="email-container">
        <!-- BEGIN BODY -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="margin: auto;">
          <tr>
            <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="logo" style="text-align: center;">
                    <h1><a href="#">Auticare</a></h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr><!-- end tr -->
          <tr>
            <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
              <table>
                <tr>
                  <td>
                    <div class="text" style="padding: 0 2.5em; text-align: center;">
                      <h3>Email: ${data.EmailId}</h3>
                      <h3>Password: ${data.Password}</h3>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
        </table>
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="margin: auto;">
          <tr>
            <td class="bg_light" style="text-align: center;">
              <p>Auticare</p>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
  
  </html>`;
};
