const { hash, compare } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const { signUserAccessToken } = require("../../middleware/authentication");
const { patientRegister } = require("../../services/patient.service");
const {
  getAppUserByEmailId,
  createRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshToken,
  getAppUserByUserID,
  tokenUpdate,
} = require("../../services/users.service");

exports.registerUser = (req, res) => {
  let data = {
    ...req.body,
  };
  hash(data.Password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    data.Password = hash;
    patientRegister(
      data,
      (error, patientRegisterResults, PatientID, UserID) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        getAppUserByEmailId(
          data.ParentEmailID,
          (error, patientDetailsResults) => {
            if (error) {
              console.log(error);
              return res.status(201).send({
                success: true,
                results: { message: results },
              });
            }
            createRefreshToken(UserID, (error, results) => {
              if (error) {
                console.log(error);
                return res.status(201).send({
                  success: true,
                  results: { message: results },
                });
              }
              // Generating tokens
              const accessToken = signUserAccessToken({
                UserID: patientDetailsResults[0].UserID,
                EmailId: patientDetailsResults[0].EmailId,
                RefreshTokenID: results.insertId,
              });
              patientDetailsResults[0].Password = undefined;
              return res.status(201).send({
                success: true,
                results: {
                  message: patientRegisterResults,
                  data: patientDetailsResults,
                  accessToken,
                },
              });
            });
          }
        );
      }
    );
  });
};

exports.tokenUpdate = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    ...req.body,
  };
  tokenUpdate(data, (error, results, status) => {
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
};

exports.login = (req, res) => {
  const data = {
    EmailId: req.body.EmailId,
    Password: req.body.Password,
  };

  getAppUserByEmailId(data.EmailId, (error, results) => {
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
    if (results[0]?.RoleId == 4) {
      formatTherapistData(results);
    }
    compare(data.Password, results[0].Password, (error, compareResult) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (compareResult) {
        createRefreshToken(
          results[0].UserID,
          (error, createRefreshTokenResults) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .send({ success: false, errors: { message: error } });
            }
            // Generating tokens
            const accessToken = signUserAccessToken({
              UserID: results[0].UserID,
              EmailId: results[0].EmailId,
              RefreshTokenID: createRefreshTokenResults.insertId,
            });
            results[0].Password = undefined;
            return res.status(200).send({
              success: true,
              results: { accessToken, data: results },
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

exports.userDetails = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
  };

  getAppUserByUserID(data.UserID, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(400).send({
        success: false,
        errors: { message: "User not found" },
      });
    }
    if (results[0]?.RoleId == 4) {
      formatTherapistData(results);
    }
    results[0].Password = undefined;
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.logout = (req, res) => {
  const reqAuthHeader = req.headers.authorization;
  const accessToken = reqAuthHeader.split(" ")[1];
  verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
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
};

exports.logoutAll = (req, res) => {
  const reqAuthHeader = req.headers.authorization;
  const accessToken = reqAuthHeader.split(" ")[1];
  verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
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
};

function formatTherapistData(results) {
  results[0] = {
    UserID: results[0].UserID,
    EmailId: results[0].EmailId,
    UserName: results[0].UserName,
    Phone: results[0].Phone,
    AddressLine1: results[0].AddressLine1,
    AddressLine2: results[0].AddressLine2,
    City: results[0].City,
    District: results[0].District,
    Pincode: results[0].Pincode,
    State: results[0].State,
    Country: results[0].Country,
    RoleId: results[0].RoleId,
    Status: results[0].Status,
    PasswordResetOtpOtpCreate_TS: results[0].PasswordResetOtpOtpCreate_TS,
    Password: results[0].Password,
    OtpCreate_TS: results[0].OtpCreate_TS,
    Create_TS: results[0].Create_TS,
    Update_TS: results[0].Update_TS,
    Create_By: results[0].Create_By,
    Update_By: results[0].Update_By,
    TherapistID: results[0].PatientID,
    CenterName: results[0].PatientName,
    FacilitatorType: results[0].DOB,
    Salutation: results[0].Gender,
    Name: results[0].ParentName,
    Designation: results[0].Relationship,
    Photo: results[0].PreviousTreatmentHistoryDescription,
    Profile: results[0].PreviousTreatmentHistoryURL,
    Qualification: results[0].Difficulty,
    DocumentsURL: results[0].ReportsURL,
    TherapistType: results[0].Remarks,
    Experience: results[0].IsAppCreated,
  };
}
