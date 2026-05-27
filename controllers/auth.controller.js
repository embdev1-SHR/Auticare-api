const { hash, compare } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const { forgotPasswordHTML } = require("../helpers/consts");
const { generateOTP } = require("../helpers/randomNumbers");
const {
  signAccessToken,
  signRefreshToken,
  signConfirmOtpToken,
} = require("../middleware/authentication");
const {
  getUserByEmailId,
  getUserByUserId,
  updateUserOtp,
  updateUserPasswordByUserID,
  createRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshToken,
  getUserByEmailIdNRoles,
} = require("../services/users.service");
const { sendMail } = require("../helpers/email");

exports.login = (req, res) => {
  const data = {
    EmailId: req.body.EmailId,
    Password: req.body.Password,
  };

  getUserByEmailIdNRoles(data.EmailId, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(400).send({
        success: false,
        errors: { message: "Invalid email" },
      });
    }
    compare(data.Password, results[0].Password, (error, compareResult) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (compareResult) {
        // Removing password from results
        results[0].Password = undefined;
        createRefreshToken(
          results[0].UserID,
          (error, createRefreshTokenResults) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .send({ success: false, errors: { message: error } });
            }
            const tokenData = {
              UserID: results[0].UserID,
              EmailId: results[0].EmailId,
              RefreshTokenID: createRefreshTokenResults.insertId,
            };
            // Generating tokens
            const accessToken = signAccessToken(tokenData);
            const refreshToken = signRefreshToken(tokenData);

            return res.status(200).send({
              success: true,
              results: { accessToken, refreshToken },
            });
          }
        );
      } else {
        return res.status(400).send({
          success: false,
          errors: { message: "Invalid password" },
        });
      }
    });
  });
};

exports.logout = (req, res) => {
  const data = {
    RefreshToken: req.body.RefreshToken,
  };
  verify(
    data.RefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      getUserByUserId(results.UserID, (error, getUserByUserIdResults) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        if (!getUserByUserIdResults.length) {
          return res.status(400).send({
            success: false,
            errors: { message: "Invalid token" },
          });
        }
        deleteRefreshToken(results, (error) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .send({ success: false, errors: { message: error } });
          }
          return res.status(200).send({
            success: true,
            results: { message: "Logged out successfully" },
          });
        });
      });
    }
  );
};

exports.logoutAll = (req, res) => {
  const data = {
    RefreshToken: req.body.RefreshToken,
  };
  verify(
    data.RefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      getUserByUserId(results.UserID, (error, getUserByUserIdResults) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        if (!getUserByUserIdResults.length) {
          return res.status(400).send({
            success: false,
            errors: { message: "Invalid token" },
          });
        }
        deleteAllRefreshToken(results.UserID, (error) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .send({ success: false, errors: { message: error } });
          }
          return res.status(200).send({
            success: true,
            results: { message: "Logged out from all devices successfully" },
          });
        });
      });
    }
  );
};

exports.refreshToken = (req, res) => {
  const data = {
    RefreshToken: req.body.RefreshToken,
  };
  verify(
    data.RefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      getUserByUserId(results.UserID, (error, getUserByUserIdResults) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        if (!getUserByUserIdResults.length) {
          return res.status(400).send({
            success: false,
            errors: { message: "Invalid token" },
          });
        }
        getRefreshToken(results, (error, results) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .send({ success: false, errors: { message: error } });
          }
          if (!results.length) {
            return res.status(401).send({
              success: false,
              errors: { message: "Refresh token expired" },
            });
          }
          // Generating tokens
          const accessToken = signAccessToken(getUserByUserIdResults[0]);
          const refreshToken = data.RefreshToken;

          return res.status(200).send({
            success: true,
            results: { accessToken, refreshToken },
          });
        });
      });
    }
  );
};

exports.forgotPassword = (req, res) => {
  let data = {
    EmailId: req.body.EmailId,
  };
  getUserByEmailId(data.EmailId, (error, getUserByEmailIdResults) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!getUserByEmailIdResults.length) {
      return res.status(400).send({
        success: false,
        errors: { message: "Invalid email" },
      });
    }
    data.otp = generateOTP();
    updateUserOtp(data, (error, updateUserResults, status) => {
      if (error) {
        console.log(error);
        return res
          .status(status || 500)
          .send({ success: false, errors: { message: error } });
      }
      sendMail(
        getUserByEmailIdResults[0],
        "Password Reset OTP",
        forgotPasswordHTML(data)
      )
        .then((result) => {
          if (result.status == 200 || result.status == 201) {
            return res.status(200).send({
              success: true,
              results: { message: "Email Send Successfully" },
            });
          } else {
            return res
              .status(result.status || 500)
              .send({ success: false, errors: { message: result.statusText } });
          }
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(status || 500)
            .send({ success: false, errors: { message: error } });
        });
    });
  });
};

exports.confirmOtp = (req, res) => {
  const data = {
    EmailId: req.body.EmailId,
    PasswordResetOtp: req.body.PasswordResetOtp,
  };
  getUserByEmailId(data.EmailId, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(400).send({
        success: false,
        errors: { message: "Invalid email" },
      });
    }

    if (
      data.PasswordResetOtp == results[0].PasswordResetOtp &&
      new Date() <
        new Date(new Date(results[0].OtpCreate_TS).getTime() + 20 * 60000)
    ) {
      // Generating token
      const token = signConfirmOtpToken(results[0]);

      return res.status(200).send({ success: true, results: { token } });
    } else {
      return res.status(400).send({
        success: false,
        errors: { message: "Invalid OTP or OTP expired" },
      });
    }
  });
};

exports.resetPassword = (req, res) => {
  hash(req.body.Password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    const data = {
      UserID: req.userData.UserID,
      Password: hash,
    };
    updateUserPasswordByUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res
          .status(status || 500)
          .send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  });
};
