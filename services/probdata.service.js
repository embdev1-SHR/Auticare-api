const db = require("../config/db.config");

exports.probdataListByPatientIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT probdatas.* FROM therapists INNER JOIN probdatas ON therapists.UserID = probdatas.Create_By WHERE therapists.UserID = ? AND probdatas.PatientID = ?`,
    [data.UserID, data.PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.probdataListByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT probdatas.* FROM probdatas INNER JOIN patients ON patients.PatientID = probdatas.PatientID WHERE patients.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.probdataResponseListByPatientIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT patient_probdata_responses.* FROM therapists INNER JOIN patient_probdata_responses ON therapists.UserID = patient_probdata_responses.Create_By WHERE therapists.UserID = ? AND patient_probdata_responses.PatientID = ?; `,
    [data.UserID, data.PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.probdataResponseListByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_probdata_responses.* FROM patient_probdata_responses INNER JOIN patients ON patients.PatientID = patient_probdata_responses.PatientID WHERE patients.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.probdataCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else {
          const Probdatas = data.Probdatas;
          const ProbdatasArr = [];
          for (let index = 0; index < Probdatas.length; index++) {
            const element = Probdatas[index];
            ProbdatasArr.push([data.PatientID, element.TargetQuestion, data.UserID]);
          }
          connection.query(
            `INSERT INTO probdatas (PatientID, TargetQuestion, Create_By) VALUES ?`,
            [ProbdatasArr],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.commit((error) => {
                  if (error) {
                    connection.rollback(() => {
                      connection.release();
                      return callBack(error.message);
                    });
                  } else connection.release();
                  if (results.affectedRows >= 1) {
                    return callBack(null, "Probdatas added successfully");
                  } else {
                    return callBack("Adding probdatas failed", null, 500);
                  }
                });
            }
          );
        }
      });
    /* End transaction */
  });
};

exports.probdataResponseCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else {
          const ProbdataResponses = data.Responses;
          const ProbdataResponsesArr = [];
          for (let index = 0; index < ProbdataResponses.length; index++) {
            const element = ProbdataResponses[index];
            ProbdataResponsesArr.push([
              element.ProbdataID,
              data.PatientID,
              element.TargetResponse,
              new Date(element.Date),
              data.UserID,
            ]);
          }
          connection.query(
            `INSERT INTO patient_probdata_responses ( ProbdataID, PatientID, TargetResponse, Date, Create_By ) VALUES ?`,
            [ProbdataResponsesArr],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.commit((error) => {
                  if (error) {
                    connection.rollback(() => {
                      connection.release();
                      return callBack(error.message);
                    });
                  } else connection.release();
                  if (results.affectedRows >= 1) {
                    return callBack(null, "Probdata response submited successfully");
                  } else {
                    return callBack("Adding probdata response failed", null, 500);
                  }
                });
            }
          );
        }
      });
    /* End transaction */
  });
};

exports.probdataUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE probdatas SET TargetQuestion = ?, AchieveDate = ?, IsAchieved = ?, Status = ?, Update_By = ? WHERE ProbdataID = ? AND Create_By = ? `,
    [
      data.TargetQuestion,
      data.IsAchieved ? new Date() : null,
      data.IsAchieved,
      data.Status,
      data.UserID,
      data.ProbdataID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Probdata updated successfully");
      } else {
        return callBack("Probdata not found", null, 404);
      }
    }
  );
};
