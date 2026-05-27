const { verify, sign } = require("jsonwebtoken");
const { getUserNRoleByUserId } = require("../services/users.service");

exports.verifyAccessToken = (req, res, next) => {
  const reqAuthHeader = req.headers.authorization;
  if (!reqAuthHeader)
    return res.status(401).send({
      success: false,
      errors: {
        message: "The user must authenticated to get the requested response",
      },
    });
  const accessToken = reqAuthHeader.split(" ")[1];

  verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (error, jwtPayload) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: error });
    }
    getUserNRoleByUserId(jwtPayload.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(401).send({
          success: false,
          errors: { message: "The user does not have access" },
        });
      }
      req.userData = jwtPayload;
      req.userData.RoleID = results[0].RoleID;
      req.userData.RoleName = results[0].RoleName;
      req.userData.EmailId = results[0].EmailId;
      next();
    });
  });
};

exports.verifyConfirmOtpToken = (req, res, next) => {
  const reqAuthHeader = req.headers.authorization;
  if (!reqAuthHeader)
    return res.status(401).send({
      success: false,
      errors: {
        message: "The user must have a valid token",
      },
    });
  const token = reqAuthHeader.split(" ")[1];

  verify(token, process.env.JWT_OTP_TOKEN_SECRET, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: error });
    }
    req.userData = results;
    next();
  });
};

exports.signRefreshToken = (data) => {
  return sign(
    {
      UserID: data.UserID,
      EmailId: data.EmailId,
      RefreshTokenID: data.RefreshTokenID,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "5d" }
  );
};

//TODO: chnage 3m to 15m
exports.signAccessToken = (data) => {
  return sign({ UserID: data.UserID, EmailId: data.EmailId, Type: "WEB" }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "3m",
  });
};

exports.signConfirmOtpToken = (data) => {
  return sign({ UserID: data.UserID, EmailId: data.EmailId }, process.env.JWT_OTP_TOKEN_SECRET, { expiresIn: "5m" });
};

exports.signUserAccessToken = (data, expiresIn = "365d") => {
  return sign(
    {
      UserID: data.UserID,
      EmailId: data.EmailId,
      RefreshTokenID: data.RefreshTokenID,
      Type: "APP",
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn }
  );
};
