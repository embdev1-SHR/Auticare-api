const { hash, compare } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const { forgotPasswordHTML, centerApprovalHTML, centerRejectionHTML, clientApprovalHTML, clientRejectionHTML } = require("../helpers/consts");
const { sendMail } = require("../helpers/email");
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
  getUserByEmailIdForPasswordReset,
  checkEmailExists,
  createPendingCenter,
  getPendingCenters,
  createPendingClient,
  getPendingClients,
  superAdminExists,
  createSuperAdmin,
} = require("../services/users.service");
const { centerCreateFromPending, rejectPendingCenter } = require("../services/center.service");
const { clientCreateFromPending, rejectPendingClient } = require("../services/client.service");

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
  getUserByEmailIdForPasswordReset(data.EmailId, (error, getUserByEmailIdResults) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!getUserByEmailIdResults.length) {
      return res.status(400).send({
        success: false,
        errors: { message: "Email not found or not eligible for password reset" },
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
      ).finally(() => {
        return res.status(200).send({
          success: true,
          results: { message: "Email Send Successfully" },
        });
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

exports.getPendingCentersList = (req, res) => {
  getPendingCenters((error, results) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: results } });
  });
};

exports.approvePendingCenter = (req, res) => {
  const data = {
    UserID: req.body.UserID,
    ClientID: req.body.ClientID,
  };
  centerCreateFromPending(data, (error, result, centerInfo) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    const emailPromise = (centerInfo && centerInfo.EmailId)
      ? sendMail(
          { EmailId: centerInfo.EmailId },
          "Your Auticare Center Account is Approved!",
          centerApprovalHTML({ EmailId: centerInfo.EmailId, CenterName: centerInfo.CenterName })
        )
      : Promise.resolve();

    emailPromise.finally(() => {
      res.status(200).send({ success: true, results: { message: result } });
    });
  });
};

exports.rejectPendingCenterRegistration = (req, res) => {
  const UserID = req.params.UserID;
  rejectPendingCenter(UserID, (error, result, centerInfo) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    const emailPromise = (centerInfo && centerInfo.EmailId)
      ? sendMail(
          { EmailId: centerInfo.EmailId },
          "Auticare Center Registration Update",
          centerRejectionHTML({ CenterName: centerInfo.CenterName })
        )
      : Promise.resolve();

    emailPromise.finally(() => {
      res.status(200).send({ success: true, results: { message: result } });
    });
  });
};

exports.clientSignup = (req, res) => {
  const data = {
    EmailId: req.body.EmailId,
    Phone: req.body.Phone || "",
    Password: req.body.Password,
    OrgName: req.body.OrgName || "",
    AddressLine1: req.body.AddressLine1 || "",
    AddressLine2: req.body.AddressLine2 || "",
    City: req.body.City || "",
    District: req.body.District || "",
    Pincode: req.body.Pincode || "",
    State: req.body.State || "",
    Country: req.body.Country || "",
  };

  checkEmailExists(data.EmailId, (error, exists) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    if (exists) {
      return res.status(400).send({ success: false, errors: { message: "Email already registered" } });
    }
    hash(data.Password, 10, (error, hashedPassword) => {
      if (error) {
        return res.status(500).send({ success: false, errors: { message: error.message } });
      }
      createPendingClient({ ...data, Password: hashedPassword }, (error, result) => {
        if (error) {
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: "Registration submitted. An admin will review and activate your account." },
        });
      });
    });
  });
};

exports.getPendingClientsList = (req, res) => {
  getPendingClients((error, results) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: results } });
  });
};

exports.approvePendingClient = (req, res) => {
  const data = { UserID: req.body.UserID };
  clientCreateFromPending(data, (error, result, clientInfo) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    const emailPromise = (clientInfo && clientInfo.EmailId)
      ? sendMail(
          { EmailId: clientInfo.EmailId },
          "Your Auticare Account is Approved!",
          clientApprovalHTML({ EmailId: clientInfo.EmailId, OrgName: clientInfo.OrgName })
        )
      : Promise.resolve();

    emailPromise.finally(() => {
      res.status(200).send({ success: true, results: { message: result } });
    });
  });
};

exports.rejectPendingClientRegistration = (req, res) => {
  const UserID = req.params.UserID;
  rejectPendingClient(UserID, (error, result, clientInfo) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    const emailPromise = (clientInfo && clientInfo.EmailId)
      ? sendMail(
          { EmailId: clientInfo.EmailId },
          "Auticare Registration Update",
          clientRejectionHTML({ OrgName: clientInfo.OrgName })
        )
      : Promise.resolve();

    emailPromise.finally(() => {
      res.status(200).send({ success: true, results: { message: result } });
    });
  });
};

exports.centerSignup = (req, res) => {
  const data = {
    EmailId: req.body.EmailId,
    Phone: req.body.Phone,
    Password: req.body.Password,
    AddressLine1: req.body.AddressLine1 || "",
    AddressLine2: req.body.AddressLine2 || "",
    City: req.body.City || "",
    District: req.body.District || "",
    Pincode: req.body.Pincode || "",
    State: req.body.State || "",
    Country: req.body.Country || "",
    CenterName: req.body.CenterName || "",
  };

  checkEmailExists(data.EmailId, (error, exists) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    if (exists) {
      return res.status(400).send({ success: false, errors: { message: "Email already registered" } });
    }
    hash(data.Password, 10, (error, hashedPassword) => {
      if (error) {
        return res.status(500).send({ success: false, errors: { message: error.message } });
      }
      createPendingCenter({ ...data, Password: hashedPassword }, (error, result) => {
        if (error) {
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: "Registration submitted. An admin will review and activate your account." },
        });
      });
    });
  });
};

exports.setupSuperAdmin = (req, res) => {
  const { EmailId, UserName, Password } = req.body;
  superAdminExists((error, exists) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    if (exists) return res.status(403).send({ success: false, errors: { message: "A super admin account already exists. Use the login page." } });
    hash(Password, 10, (error, hashedPassword) => {
      if (error) return res.status(500).send({ success: false, errors: { message: error.message } });
      createSuperAdmin({ EmailId, UserName: UserName || EmailId, Password: hashedPassword }, (error, result) => {
        if (error) return res.status(500).send({ success: false, errors: { message: error } });
        return res.status(201).send({ success: true, results: { message: result } });
      });
    });
  });
};
