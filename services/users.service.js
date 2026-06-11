const db = require("../config/db.config");

exports.getUserByUserId = (UserID, callBack) => {
  db.query(
    `SELECT * FROM login_users where UserID = ? AND Status = 1`,
    [UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getUserByEmailId = (EmailId, callBack) => {
  db.query(
    `SELECT * FROM login_users WHERE EmailId = ? AND Status = 1`,
    [EmailId],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getUserByEmailIdNRoles = (EmailId, callBack) => {
  db.query(
    `SELECT * FROM login_users WHERE EmailId = ? AND Status = 1 AND RoleId IN ( 1, 2, 3, 4 )`,
    [EmailId],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getAppUserByEmailId = (EmailId, callBack) => {
  db.query(
    ` SELECT login_users.*, patients.PatientID, patients.PatientName, patients.DOB, patients.Gender, patients.ParentName, patients.Relationship, patients.PreviousTreatmentHistoryDescription, patients.PreviousTreatmentHistoryURL, patients.Difficulty, patients.ReportsURL, patients.Remarks, patients.IsAppCreated FROM login_users INNER JOIN patients ON patients.UserID = login_users.UserID WHERE login_users.EmailId = ? AND login_users.Status = 1 UNION SELECT login_users.*, therapists.TherapistID, centers.CenterName, therapists.FacilitatorType, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Photo, therapists.Profile, therapists.Qualification, therapists.DocumentsURL, therapists.TherapistType, therapists.Experience FROM login_users INNER JOIN therapists ON therapists.UserID = login_users.UserID INNER JOIN centers ON centers.CenterID = therapists.CenterID WHERE login_users.EmailId = ? AND login_users.Status = 1`,
    [EmailId, EmailId],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else {
        return callBack(null, results);
      }
    }
  );
};

exports.getAppUserByUserID = (UserID, callBack) => {
  db.query(
    ` SELECT login_users.*, patients.PatientID, patients.PatientName, patients.DOB, patients.Gender, patients.ParentName, patients.Relationship, patients.PreviousTreatmentHistoryDescription, patients.PreviousTreatmentHistoryURL, patients.Difficulty, patients.ReportsURL, patients.Remarks, patients.IsAppCreated FROM login_users INNER JOIN patients ON patients.UserID = login_users.UserID WHERE login_users.UserID = ? AND login_users.Status = 1 UNION SELECT login_users.*, therapists.TherapistID, centers.CenterName, therapists.FacilitatorType, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Photo, therapists.Profile, therapists.Qualification, therapists.DocumentsURL, therapists.TherapistType, therapists.Experience FROM login_users INNER JOIN therapists ON therapists.UserID = login_users.UserID INNER JOIN centers ON centers.CenterID = therapists.CenterID WHERE login_users.UserID = ? AND login_users.Status = 1`,
    [UserID, UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else {
        return callBack(null, results);
      }
    }
  );
};

exports.getUserNRoleByUserId = (UserID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, roles.RoleID, roles.RoleName FROM login_users INNER JOIN roles ON login_users.RoleId = roles.RoleID AND login_users.UserID = ? AND login_users.Status = 1`,
    [UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.updateUserOtp = (data, callBack) => {
  db.query(
    `UPDATE login_users SET PasswordResetOtp = ?, OtpCreate_TS = ? WHERE EmailId = ?`,
    [data.otp, new Date(), data.EmailId],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, results);
      } else {
        return callBack("Failed to send OTP", null, 500);
      }
    }
  );
};

exports.updateUserPasswordByUserID = (data, callBack) => {
  db.query(
    `UPDATE login_users SET PasswordResetOtp = ?, OtpCreate_TS = ?, Password = ? WHERE UserID = ?`,
    [null, null, data.Password, data.UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Password updated successfully");
      } else {
        return callBack("Failed to update password", null, 500);
      }
    }
  );
};

exports.tokenUpdate = (data, callBack) => {
  db.query(
    `UPDATE login_users SET Token = ? WHERE UserID = ?`,
    [data.Token, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Token updated successfully");
      } else {
        return callBack("User not found", null, 404);
      }
    }
  );
};

exports.createRefreshToken = (UserID, callBack) => {
  db.query(
    `INSERT INTO refresh_tokens ( UserID ) VALUES ( ? )`,
    [UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, results);
      } else {
        return callBack("Failed to create refresh token", null, 500);
      }
    }
  );
};

exports.getRefreshToken = (data, callBack) => {
  db.query(
    `SELECT * FROM refresh_tokens WHERE RefreshTokenID = ? AND UserID = ?`,
    [data.RefreshTokenID, data.UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.deleteRefreshToken = (data, callBack) => {
  db.query(
    `DELETE FROM refresh_tokens WHERE RefreshTokenID = ? AND UserID = ?`,
    [data.RefreshTokenID, data.UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, results);
      } else {
        return callBack("Refresh token expired", null, 401);
      }
    }
  );
};

exports.checkEmailExists = (EmailId, callBack) => {
  db.query(
    `SELECT UserID FROM login_users WHERE EmailId = ?`,
    [EmailId],
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results.length > 0);
    }
  );
};

exports.getPendingCenters = (callBack) => {
  db.query(
    `SELECT UserID, EmailId, UserName AS CenterName, Phone, AddressLine1, City, State, Country, Create_TS FROM login_users WHERE Status = 0 AND RoleId = 3 ORDER BY Create_TS DESC`,
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results);
    }
  );
};

exports.createPendingCenter = (data, callBack) => {
  db.query(
    `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Password, Status ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 3, ?, 0 )`,
    [
      data.EmailId,
      data.CenterName || data.EmailId,
      data.Phone,
      data.AddressLine1,
      data.AddressLine2,
      data.City,
      data.District,
      data.Pincode,
      data.State,
      data.Country,
      data.Password,
    ],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows >= 1) return callBack(null, "Pending center created");
      return callBack("Failed to create registration");
    }
  );
};

exports.deleteAllRefreshToken = (UserID, callBack) => {
  db.query(
    `DELETE FROM refresh_tokens WHERE UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, results);
      } else {
        return callBack("Refresh token expired", null, 401);
      }
    }
  );
};
