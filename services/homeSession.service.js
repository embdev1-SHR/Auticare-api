const db = require("../config/db.config");

exports.homeSessionListByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT home_sessions.* FROM home_sessions INNER JOIN patients ON patients.PatientID = home_sessions.PatientID WHERE patients.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.homeSessionListByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT * FROM home_sessions WHERE Create_By = ? AND PatientID = ? `,
    [data.UserID, data.PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.homeSessionCreate = (data, callBack) => {
  db.query(
    `INSERT INTO home_sessions ( PatientID, ResourceTitle, ResourceDescription, ResourceType, ResourceURL, Create_By ) VALUES ( ?, ?, ?, ?, ?, ? )`,
    [
      data.PatientID,
      data.ResourceTitle,
      data.ResourceDescription,
      data.ResourceType,
      data.ResourceURL,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Home session created successfully");
      } else {
        return callBack("Failed to create home session", null, 500);
      }
    }
  );
};

exports.homeSessionUpdate = (data, callBack) => {
  db.query(
    `UPDATE home_sessions SET ResourceTitle = ?, ResourceDescription = ?, ResourceType = ?, ResourceURL = ?, Status = ?, Update_By = ? WHERE HomeSessionID = ? AND Create_By = ?`,
    [
      data.ResourceTitle,
      data.ResourceDescription,
      data.ResourceType,
      data.ResourceURL,
      data.Status,
      data.UserID,
      data.HomeSessionID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Home session updated successfully");
      } else {
        return callBack("Home session not found", null, 404);
      }
    }
  );
};

exports.homeSessionGetByID = (HomeSessionID, callBack) => {
  db.query(
    `SELECT HomeSessionID, ResourceTitle, ResourceDescription, ResourceType, ResourceURL FROM home_sessions WHERE HomeSessionID = ? AND Status = 1`,
    [HomeSessionID],
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, results);
    }
  );
};

exports.homeSessionReadUpdate = (data, callBack) => {
  db.query(
    `UPDATE home_sessions INNER JOIN patients ON home_sessions.PatientID = patients.PatientID SET home_sessions.IsRead = ?, home_sessions.Rating = ?, home_sessions.Update_By = ? WHERE home_sessions.HomeSessionID = ? AND patients.UserID = ? `,
    [data.Read, data.Rating, data.UserID, data.HomeSessionID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Home session updated successfully");
      } else {
        return callBack("Home session not found", null, 404);
      }
    }
  );
};
