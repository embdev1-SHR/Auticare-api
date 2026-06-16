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

exports.getUserByEmailIdForPasswordReset = (EmailId, callBack) => {
  db.query(
    `SELECT lu.* FROM login_users lu
     INNER JOIN roles ON lu.RoleId = roles.RoleID
     WHERE lu.EmailId = ? AND lu.Status = 1
     AND roles.RoleName NOT IN ('SuperAdmin', 'Admin')`,
    [EmailId],
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results);
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
    `SELECT UserID FROM login_users
     WHERE EmailId = ?
     AND (
       Status = 1
       OR (Status = 0 AND RoleId = 3 AND UserID NOT IN (SELECT UserID FROM centers))
       OR (Status = 0 AND RoleId = 2)
     )`,
    [EmailId],
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results.length > 0);
    }
  );
};

exports.getPendingCenters = (callBack) => {
  db.query(
    `SELECT lu.UserID, lu.EmailId, COALESCE(c.CenterName, lu.UserName) AS CenterName, lu.Phone, lu.AddressLine1, lu.City, lu.State, lu.Country, lu.Create_TS
     FROM login_users lu
     LEFT JOIN centers c ON lu.UserID = c.UserID
     WHERE lu.Status = 0 AND lu.RoleId = 3
     ORDER BY lu.Create_TS DESC`,
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results);
    }
  );
};

exports.getPendingClients = (callBack) => {
  db.query(
    `SELECT UserID, EmailId, UserName AS OrgName, Phone, AddressLine1, City, State, Country, Create_TS
     FROM login_users
     WHERE Status = 0 AND RoleId = 2
     ORDER BY Create_TS DESC`,
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results);
    }
  );
};

exports.createPendingClient = (data, callBack) => {
  const orgName = data.OrgName || data.EmailId;
  db.query(
    `INSERT INTO login_users (EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Password, Status, Create_By)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 2, ?, 0, 0)
     ON DUPLICATE KEY UPDATE
       UserName = VALUES(UserName),
       Phone = VALUES(Phone),
       AddressLine1 = VALUES(AddressLine1),
       AddressLine2 = VALUES(AddressLine2),
       City = VALUES(City),
       District = VALUES(District),
       Pincode = VALUES(Pincode),
       State = VALUES(State),
       Country = VALUES(Country),
       RoleId = 2,
       Password = VALUES(Password),
       Status = 0,
       Update_By = 0`,
    [
      data.EmailId,
      orgName,
      data.Phone || "",
      data.AddressLine1 || "",
      data.AddressLine2 || "",
      data.City || "",
      data.District || "",
      data.Pincode || "",
      data.State || "",
      data.Country || "",
      data.Password,
    ],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows >= 1) return callBack(null, "Registration submitted");
      return callBack("Failed to create registration");
    }
  );
};

exports.createPendingCenter = (data, callBack) => {
  const centerName = data.CenterName || data.EmailId;
  db.query(
    `INSERT INTO login_users (EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Password, Status, Create_By)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 3, ?, 0, 0)
     ON DUPLICATE KEY UPDATE
       UserName = VALUES(UserName),
       Phone = VALUES(Phone),
       AddressLine1 = VALUES(AddressLine1),
       AddressLine2 = VALUES(AddressLine2),
       City = VALUES(City),
       District = VALUES(District),
       Pincode = VALUES(Pincode),
       State = VALUES(State),
       Country = VALUES(Country),
       RoleId = 3,
       Password = VALUES(Password),
       Status = 0,
       Update_By = 0`,
    [
      data.EmailId,
      centerName,
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

exports.superAdminExists = (callBack) => {
  db.query(
    `SELECT UserID FROM login_users
     INNER JOIN roles ON login_users.RoleId = roles.RoleID
     WHERE roles.RoleName = 'SuperAdmin' AND login_users.Status = 1
     LIMIT 1`,
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results.length > 0);
    }
  );
};

exports.createSuperAdmin = (data, callBack) => {
  db.query(
    `INSERT INTO login_users (EmailId, UserName, Password, RoleId, Status, Create_By)
     VALUES (?, ?, ?, (SELECT RoleID FROM roles WHERE RoleName = 'SuperAdmin' LIMIT 1), 1, 0)`,
    [data.EmailId, data.UserName, data.Password],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows === 1) return callBack(null, "Super admin created successfully");
      return callBack("Failed to create super admin");
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
