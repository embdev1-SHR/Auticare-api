const db = require("../config/db.config");
const dbAwait = require("../config/dbAwait.config");
const { arrayToNumberPair } = require("../helpers/arrayFunctions");
const promiseDB = db.promise();

exports.patientList = (callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT( therapists.Salutation, " ", therapists.Name ) AS TherapistName FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID WHERE patients.IsAppCreated = 0 AND login_users.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND clients.UserID = ? AND login_users.Status = 1;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientCountByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT COUNT(*) AS PatientCount FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND clients.UserID = ? AND login_users.Status = 1;`,
    [UserID]
  );
  return rows;
};

exports.patientListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND centers.UserID = ? AND login_users.Status = 1;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientCountByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT COUNT(*) AS PatientCount FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND centers.UserID = ? AND login_users.Status = 1; `,
    [UserID]
  );
  return rows;
};

exports.patientListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID WHERE patients.IsAppCreated = 0 AND therapists.UserID = ? AND login_users.Status = 1;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientCountByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT COUNT(*) AS PatientCount FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID WHERE patients.IsAppCreated = 0 AND therapists.UserID = ? AND login_users.Status = 1; `,
    [UserID]
  );
  return rows;
};

exports.patientListDescByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT patients.*, CONCAT( therapists.Salutation, " ", therapists.Name ) AS therapistName FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE clients.UserID = ? AND login_users.Status = 1 ORDER BY patients.Create_TS DESC LIMIT 5 `,
    [UserID]
  );
  return rows;
};

exports.patientListDescByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT patients.* , concat(therapists.Salutation, " ", therapists.Name) AS therapistName FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN login_users ON therapists.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE login_users.Status = 1 AND centers.UserID = ? ORDER BY patients.Create_TS DESC LIMIT 5`,
    [UserID]
  );
  return rows;
};

exports.patientListDescByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT patients.*, CONCAT( therapists.Salutation, " ", therapists.Name ) AS therapistName FROM therapists INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE therapists.UserID = ? AND login_users.Status = 1 ORDER BY patients.Create_TS DESC LIMIT 5 `,
    [UserID]
  );
  return rows;
};

exports.patientIssueList = (PatientID, callBack) => {
  db.query(`SELECT * FROM patient_issues WHERE PatientID = ?`, [PatientID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

// exports.patientIssueListByClientUserID = (data, callBack) => {
//   db.query(
//     `SELECT patient_issues.* FROM patient_issues INNER JOIN clients ON clients.UserID = patient_issues.Create_By WHERE clients.UserID = ? AND patient_issues.PatientID = ? UNION SELECT patient_issues.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN patient_issues ON centers.UserID = patient_issues.Create_By WHERE clients.UserID = ? AND patient_issues.PatientID = ? UNION SELECT patient_issues.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_issues ON therapists.UserID = patient_issues.Create_By WHERE clients.UserID = ? AND patient_issues.PatientID = ?`,
//     [data.UserID, data.PatientID, data.UserID, data.PatientID, data.UserID, data.PatientID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.patientIssueListByCenterUserID = (data, callBack) => {
//   db.query(
//     `SELECT patient_issues.* FROM centers INNER JOIN patient_issues ON centers.UserID = patient_issues.Create_By WHERE centers.UserID = ? AND patient_issues.PatientID = ? UNION SELECT patient_issues.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_issues ON therapists.UserID = patient_issues.Create_By WHERE centers.UserID = ? AND patient_issues.PatientID = ?`,
//     [data.UserID, data.PatientID, data.UserID, data.PatientID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.patientIssueListByTherapistUserID = (data, callBack) => {
//   db.query(
//     `SELECT patient_issues.* FROM patient_issues INNER JOIN patients ON patients.PatientID = patient_issues.PatientID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID WHERE therapists.UserID = ? AND patient_issues.PatientID = ?`,
//     [data.UserID, data.PatientID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

exports.patientMetricListByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT patient_assessment_screening_metrics.*, scales.ScaleName, scales.ScaleMetric, scales.ScaleMetricType FROM therapists INNER JOIN patient_assessment_screening_metrics ON therapists.TherapistID = patient_assessment_screening_metrics.TherapistID INNER JOIN scales ON patient_assessment_screening_metrics.ScaleID = scales.ScaleID WHERE therapists.UserID = ? AND patient_assessment_screening_metrics.PatientID = ? AND patient_assessment_screening_metrics.Status = 1`,
    [data.UserID, data.PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientMetricListByPatientID = (PatientID, callBack) => {
  db.query(
    `SELECT patient_assessment_screening_metrics.*, scales.ScaleName, scales.ScaleMetric, scales.ScaleMetricType FROM patient_assessment_screening_metrics INNER JOIN scales ON patient_assessment_screening_metrics.ScaleID = scales.ScaleID WHERE patient_assessment_screening_metrics.PatientID = ? AND patient_assessment_screening_metrics.Status = 1 `,
    [PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientScreeningMetricResponseList = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT * FROM patient_screening_responses WHERE PatientID = ? AND PatientMetricID = ? AND Create_By = ?`,
    [data.PatientID, data.PatientMetricID, data.UserID]
  );
  return rows;
};

exports.patientScreeningMetricResponseListByPatientID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT * FROM patient_screening_responses WHERE PatientID = ? AND PatientMetricID = ?`,
    [data.PatientID, data.PatientMetricID]
  );
  return rows;
};

exports.patientAssessmentMetricResponseList = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT patient_assessment_responses.*, assessment_metrics.CategoryID, assessment_metrics.ScaleID, assessment_metrics.Question, assessment_metrics.TaskObjective, assessment_metrics.TaskName, assessment_metrics.Example, assessment_metrics.Criteria FROM patient_assessment_responses INNER JOIN assessment_metrics ON assessment_metrics.MetricID = patient_assessment_responses.MetricID WHERE patient_assessment_responses.PatientID = ? AND patient_assessment_responses.PatientMetricID = ? AND patient_assessment_responses.Create_By = ?`,
    [data.PatientID, data.PatientMetricID, data.UserID]
  );
  return rows;
};

exports.patientAssessmentMetricResponseListByPatientID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT patient_assessment_responses.*, assessment_metrics.CategoryID, assessment_metrics.ScaleID, assessment_metrics.Question, assessment_metrics.TaskObjective, assessment_metrics.TaskName, assessment_metrics.Example, assessment_metrics.Criteria FROM patient_assessment_responses INNER JOIN assessment_metrics ON assessment_metrics.MetricID = patient_assessment_responses.MetricID WHERE patient_assessment_responses.PatientID = ? AND patient_assessment_responses.PatientMetricID = ?`,
    [data.PatientID, data.PatientMetricID]
  );
  return rows;
};

exports.patientCommentList = (PatientID, callBack) => {
  db.query(
    `SELECT therapist_comments.*,therapists.Salutation, therapists.Name FROM therapist_comments INNER JOIN therapists on therapists.UserID = therapist_comments.Create_By WHERE PatientID = ?`,
    PatientID,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientPlanList = (data, callBack) => {
  db.query(
    `SELECT * FROM plans WHERE PatientID = ? AND Create_By = ?`,
    [data.PatientID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientPlanGoalList = (data, callBack) => {
  db.query(
    `SELECT plan_goals.*, therapy_goals.GoalName, therapy_methods.TherapyName FROM plan_goals INNER JOIN therapy_goals ON therapy_goals.GoalID = plan_goals.GoalID INNER JOIN therapy_methods ON therapy_methods.TherapyID = therapy_goals.TherapyID WHERE plan_goals.PatientID = ? AND plan_goals.PlanID = ? AND plan_goals.Create_By = ?`,
    [data.PatientID, data.PlanID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSessionListByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT sessions.*, contents.ContentActivityName, contents.ContentActivityDescription, contents.ContentCategory, contents.FileUploadURL, contents.ActivityInstructionTitle, contents.ActivityInstructionDescription, contents.ContentDescription FROM sessions INNER JOIN contents ON contents.ContentID = sessions.ContentID WHERE sessions.Create_By = ? AND sessions.PatientID = ? `,
    [data.UserID, data.PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSessionListByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT sessions.*, contents.ContentActivityName, contents.ContentActivityDescription, contents.ContentCategory, contents.FileUploadURL, contents.ActivityInstructionTitle, contents.ActivityInstructionDescription, contents.ContentDescription FROM sessions INNER JOIN contents ON contents.ContentID = sessions.ContentID INNER JOIN patients ON patients.PatientID = sessions.PatientID WHERE patients.UserID = ? `,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSessionTrialListByTherapistUserID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT * FROM session_trials WHERE Create_By = ? AND PatientID = ? AND SessionID = ? `,
    [data.UserID, data.PatientID, data.SessionID]
  );
  return rows;
};

exports.patientSessionTrialUnfinishedByTherapistUserID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT * FROM session_trials WHERE Create_By = ? AND PatientID = ? AND SessionID = ? AND IsFinished = 0 AND Status = 1 LIMIT 1 `,
    [data.UserID, data.PatientID, data.SessionID]
  );
  return rows;
};

exports.patientSessionTrialListByPatientID = async (data) => {
  const [rows] = await promiseDB.query(`SELECT * FROM session_trials WHERE PatientID = ? AND SessionID = ? `, [
    data.PatientID,
    data.SessionID,
  ]);
  return rows;
};

exports.patientSessionTrialBehaviourListByTherapistUserID = (data, callBack) => {
  db.query(`SELECT * FROM session_behaviours WHERE SessionTrialID = ? `, [data.SessionTrialID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.patientSessionBehaviourListByTherapistUserID = (data, callBack) => {
  db.query(`SELECT * FROM session_behaviours WHERE SessionID = ? `, [data.SessionID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.patientSessionTrialMandListByTherapistUserID = (data, callBack) => {
  db.query(`SELECT * FROM session_mands WHERE SessionTrialID = ? `, [data.SessionTrialID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.patientSessionMandListByTherapistUserID = (data, callBack) => {
  db.query(`SELECT * FROM session_mands WHERE SessionID = ? `, [data.SessionID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.patientDetails = (PatientID, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ?`,
    [PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientDetailsAsync = async (PatientID) => {
  const [rows] = await promiseDB.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ?`,
    [PatientID]
  );
  return rows;
};

exports.patientDetailsByUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientDetailsByUserIDAsync = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.UserID = ?`,
    [UserID]
  );
  return rows;
};

exports.patientDetailsByPatientIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM login_users INNER JOIN clients ON clients.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ? AND clients.UserID = ? UNION SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN login_users ON centers.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ? AND clients.UserID = ? UNION SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN login_users ON therapists.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ? AND clients.UserID = ?`,
    [data.PatientID, data.UserID, data.PatientID, data.UserID, data.PatientID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientDetailsByPatientIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM centers INNER JOIN login_users ON centers.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ? AND centers.UserID = ? UNION SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN login_users ON therapists.UserID = login_users.Create_By INNER JOIN patients ON login_users.UserID = patients.UserID WHERE patients.PatientID = ? AND centers.UserID = ?`,
    [data.PatientID, data.UserID, data.PatientID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientDetailsByPatientIDNTherapistUserID = (data, callBack) => {
  const datas = db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.* FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID WHERE patients.IsAppCreated = 0 AND therapists.UserID = ? AND patients.PatientID = ?`,
    [data.UserID, data.PatientID],
    (error, results) => {
      console.warn(datas.sql);
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientMetricDetailsByTherapistUserID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT patient_assessment_screening_metrics.*, scales.ScaleName, scales.ScaleMetric, scales.ScaleMetricType FROM therapists INNER JOIN patient_assessment_screening_metrics ON therapists.TherapistID = patient_assessment_screening_metrics.TherapistID INNER JOIN scales ON patient_assessment_screening_metrics.ScaleID = scales.ScaleID WHERE therapists.UserID = ? AND patient_assessment_screening_metrics.PatientID = ? AND patient_assessment_screening_metrics.PatientMetricID = ?`,
    [data.UserID, data.PatientID, data.PatientMetricID]
  );
  return rows;
};

exports.patientMetricDetailsByPatientID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT patient_assessment_screening_metrics.*, scales.ScaleName, scales.ScaleMetric, scales.ScaleMetricType FROM therapists INNER JOIN patient_assessment_screening_metrics ON therapists.TherapistID = patient_assessment_screening_metrics.TherapistID INNER JOIN scales ON patient_assessment_screening_metrics.ScaleID = scales.ScaleID WHERE patient_assessment_screening_metrics.PatientID = ? AND patient_assessment_screening_metrics.PatientMetricID = ?`,
    [data.PatientID, data.PatientMetricID]
  );
  return rows;
};

exports.patientSessionDetailsByTherapistUserID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT sessions.*, contents.ContentActivityName, contents.ContentActivityDescription, contents.ContentCategory, contents.FileUploadURL, contents.ActivityInstructionTitle, contents.ActivityInstructionDescription, contents.ContentDescription FROM sessions INNER JOIN contents ON contents.ContentID = sessions.ContentID WHERE sessions.Create_By = ? AND sessions.PatientID = ? AND sessions.SessionID = ?`,
    [data.UserID, data.PatientID, data.SessionID]
  );
  return rows;
};

exports.patientSessionDetailsByPatientID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT sessions.*, contents.ContentActivityName, contents.ContentActivityDescription, contents.ContentCategory, contents.FileUploadURL, contents.ActivityInstructionTitle, contents.ActivityInstructionDescription, contents.ContentDescription FROM sessions INNER JOIN contents ON contents.ContentID = sessions.ContentID WHERE sessions.PatientID = ? AND sessions.SessionID = ?`,
    [data.PatientID, data.SessionID]
  );
  return rows;
};

exports.patientVRSessionDetails = (data, callBack) => {
  db.query(
    `SELECT sessions.PatientID, patients.PatientName, patients.DOB, therapists.UserID, sessions.TherapistID, therapists.Name, sessions.SessionID, sessions.ScenarioName FROM sessions INNER JOIN therapists ON therapists.TherapistID = sessions.TherapistID INNER JOIN patients ON patients.PatientID = sessions.PatientID WHERE sessions.SessionID = ?;`,
    [data.SessionID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientVRSessionDetailsUpdate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else {
          const Trials = data.Trials;
          const TrialsArr = [];
          for (let index = 0; index < Trials.length; index++) {
            const element = Trials[index];
            TrialsArr.push([
              data.SessionID,
              data.PatientID,
              element.StartingTime,
              element.CompletionTime,
              element.ReactionTime,
              element.PromptInitiationTime,
              element.PromptReactionTime,
              element.PromptFinishingTime,
              element.Score,
              element.SetOfPrompts,
              element.TypeOfPrompts,
              element.NoOfPrompts,
              element.NoOfTrials,
              element.NoOfSuccess,
              element.NoOfFail,
              element.TTFF,
              element.FFD,
              element.AFD,
              element.SFC,
              element.AttentionSpan,
              data.UserID,
            ]);
          }
          connection.query(
            `INSERT INTO session_trials (SessionID, PatientID, StartingTime, CompletionTime, ReactionTime, PromptInitiationTime, PromptReactionTime, PromptFinishingTime, Score, SetOfPrompts, TypeOfPrompts, NoOfPrompts, NoOfTrials, NoOfSuccess, NoOfFail, TTFF, FFD, AFD, SFC, AttentionSpan, Create_By) VALUES ?`,
            [TrialsArr],
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
                    return callBack(null, "Patient VR session result updated successfully");
                  } else {
                    return callBack("Failed to update session result", null, 500);
                  }
                });
            }
          );
        }
      });
    /* End transaction */
  });
};

exports.patientSessionTrialDetailsByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT * FROM session_trials WHERE Create_By = ? AND SessionTrialID = ? `,
    [data.UserID, data.SessionTrialID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSearch = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT( therapists.Salutation, " ", therapists.Name ) AS TherapistName FROM login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID WHERE patients.PatientName LIKE '%${data.PatientName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSearchByPatientNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND clients.UserID = ? AND login_users.Status = 1 AND patients.PatientName LIKE '%${data.PatientName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%'`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSearchByPatientNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 0 AND centers.UserID = ? AND login_users.Status = 1 AND patients.PatientName LIKE '%${data.PatientName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientSearchByPatientNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.EmailId AS ParentEmailID, login_users.Phone AS ParentPhone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, patients.*, departments.DepartmentName, CONCAT(therapists.Salutation, " ", therapists.Name) AS TherapistName FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID INNER JOIN departments ON departments.DepartmentID = patients.DepartmentID WHERE patients.IsAppCreated = 0 AND therapists.UserID = ? AND login_users.Status = 1 AND patients.PatientName LIKE '%${data.PatientName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%'`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.patientCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Create_By ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
            [
              data.ParentEmailID,
              data.ParentEmailID,
              data.ParentPhone,
              data.AddressLine1,
              data.AddressLine2,
              data.City,
              data.District,
              data.Pincode,
              data.State,
              data.Country,
              5,
              data.UserID,
            ],
            (error, login_usersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const UserID = login_usersResult?.insertId;
                const IssuesArray = data.IssueList;
                connection.query(
                  `INSERT INTO patients ( UserID, DepartmentID, TherapistID, PatientName, DOB, Gender, ParentName, Relationship, PreviousTreatmentHistoryDescription, PreviousTreatmentHistoryURL, DocumentsURL, ReportsURL, Remarks, Difficulty ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
                  [
                    UserID,
                    data.DepartmentID,
                    data.TherapistID,
                    data.PatientName,
                    new Date(data.DOB),
                    data.Gender,
                    data.ParentName,
                    data.Relationship,
                    data.PreviousTreatmentHistoryDescription,
                    data.PreviousTreatmentHistoryURL,
                    data.DocumentsURL,
                    data.ReportsURL,
                    data.Remarks,
                    data.Difficulty,
                  ],
                  (error, patientResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    }
                    if (IssuesArray?.length) {
                      const PatientID = patientResult?.insertId;
                      const Issues = [];
                      for (let index = 0; index < IssuesArray.length; index++) {
                        const element = IssuesArray[index];
                        Issues.push([element, PatientID, data.UserID]);
                      }
                      connection.query(
                        `INSERT INTO patient_issues (IssueName, PatientID, Create_By) VALUES ?`,
                        [Issues],
                        (error) => {
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
                              if (login_usersResult.affectedRows >= 1 && patientResult.affectedRows >= 1) {
                                return callBack(null, "Patient created successfully");
                              } else {
                                return callBack("Failed to create patient", null, 500);
                              }
                            });
                        }
                      );
                    } else {
                      connection.commit((error) => {
                        if (error) {
                          connection.rollback(() => {
                            connection.release();
                            return callBack(error.message);
                          });
                        } else {
                          connection.release();
                          if (login_usersResult.affectedRows >= 1 && patientResult.affectedRows >= 1) {
                            return callBack(null, "Patient created successfully");
                          } else {
                            return callBack("Failed to create patient", null, 500);
                          }
                        }
                      });
                    }
                  }
                );
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.patientMetricsCreate = (data, callBack) => {
  db.query(
    `INSERT INTO patient_assessment_screening_metrics ( PatientID, TherapistID, ScaleID, Score, Result, ScheduleStartDate, ScheduleEndDate, ActualStartDate, ActualEndDate, CompletionStatus, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.PatientID,
      data.TherapistID,
      data.ScaleID,
      data.Score,
      data.Result,
      new Date(data.ScheduleStartDate),
      new Date(data.ScheduleEndDate),
      new Date(data.ActualStartDate),
      new Date(data.ActualEndDate),
      data.CompletionStatus,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient metrics created successfully", results?.insertId);
      } else {
        return callBack("Failed to create patient metrics", null, 500);
      }
    }
  );
};

exports.patientScreeningMetricResponseCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE patient_assessment_screening_metrics SET Score = ?, Result = ?, CompletionStatus = ?, Update_By = ? WHERE PatientID = ? AND PatientMetricID = ? AND CompletionStatus IS ?`,
            [data.Score, data.Result, data.CompletionStatus, data.UserID, data.PatientID, data.PatientMetricID, null],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const Responses = data.Responses;
                if (Responses.length) {
                  const metricsResponses = [];
                  for (let index = 0; index < Responses.length; index++) {
                    const element = Responses[index];
                    metricsResponses.push([
                      data.PatientID,
                      data.PatientMetricID,
                      element.MetricID,
                      element.QuestionNumber,
                      element.ResponseSelected,
                      element.ResponseScore,
                      data.UserID,
                    ]);
                  }
                  connection.query(
                    `INSERT INTO patient_screening_responses (PatientID, PatientMetricID, MetricID, QuestionNumber, ResponseSelected, ResponseScore, Create_By) VALUES ?`,
                    [metricsResponses],
                    (error) => {
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
                            return callBack(null, "Patient metrics updated successfully");
                          } else {
                            return callBack("Patient metrics not found", null, 404);
                          }
                        });
                    }
                  );
                } else {
                  connection.commit((error) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else connection.release();
                    if (results.affectedRows >= 1) {
                      return callBack(null, "Patient metrics updated successfully");
                    } else {
                      return callBack("Patient metrics not found", null, 404);
                    }
                  });
                }
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.patientAssessmentMetricResponseCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE patient_assessment_screening_metrics SET CompletionStatus = ?, Update_By = ? WHERE PatientID = ? AND PatientMetricID = ? `,
            [data.CompletionStatus, data.UserID, data.PatientID, data.PatientMetricID],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const Responses = data.Responses;
                if (Responses.length) {
                  const metricsResponses = [];
                  for (let index = 0; index < Responses.length; index++) {
                    const element = Responses[index];
                    metricsResponses.push([
                      data.PatientID,
                      data.PatientMetricID,
                      element.MetricID,
                      element.QuestionNumber,
                      element.ScoreNumber,
                      element.NumberOfScore,
                      element.Colour,
                      new Date(element.Date),
                      data.UserID,
                    ]);
                  }
                  connection.query(
                    `INSERT INTO patient_assessment_responses (PatientID, PatientMetricID, MetricID, QuestionNumber, ScoreNumber, NumberOfScore, Colour, Date, Create_By) VALUES ?`,
                    [metricsResponses],
                    (error) => {
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
                            return callBack(null, "Patient metrics updated successfully");
                          } else {
                            return callBack("Patient metrics not found", null, 404);
                          }
                        });
                    }
                  );
                } else {
                  connection.commit((error) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else connection.release();
                    if (results.affectedRows >= 1) {
                      return callBack(null, "Patient metrics updated successfully");
                    } else {
                      return callBack("Patient metrics not found", null, 404);
                    }
                  });
                }
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.patientCommentCreate = (data, callBack) => {
  db.query(
    `INSERT INTO therapist_comments ( Comment, PatientID, Create_By ) 
       VALUES ( ?, ?, ? )`,
    [data.Comment, data.PatientID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient comment created successfully");
      } else {
        return callBack("Failed to create patient comment", null, 500);
      }
    }
  );
};

exports.patientPlanCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `INSERT INTO plans (PatientID, PlanName, StartDate, EndDate, Create_By) VALUES ( ?, ?, ?, ?, ? )`,
            [data.PatientID, data.PlanName, new Date(data.StartDate), new Date(data.EndDate), data.UserID],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const PlanID = results?.insertId;
                const PlanGoals = data.PlanGoals;
                if (PlanGoals.length) {
                  const planGoalsResponses = [];
                  for (let index = 0; index < PlanGoals.length; index++) {
                    const element = PlanGoals[index];
                    planGoalsResponses.push([PlanID, data.PatientID, element, new Date(), data.UserID]);
                  }
                  connection.query(
                    `INSERT INTO plan_goals (PlanID, PatientID, GoalID, StartDate, Create_By) VALUES ?`,
                    [planGoalsResponses],
                    (error) => {
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
                            return callBack(null, "Patient plan created successfully");
                          } else {
                            return callBack("Failed to create patient plan", null, 500);
                          }
                        });
                    }
                  );
                } else {
                  connection.commit((error) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else connection.release();
                    if (results.affectedRows >= 1) {
                      return callBack(null, "Patient plan created successfully");
                    } else {
                      return callBack("Failed to create patient plan", null, 500);
                    }
                  });
                }
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.patientPlanGoalCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `INSERT INTO plan_goals (PlanID, PatientID, GoalID, StartDate, Progress, Create_By) VALUES ( ?, ?, ?, ?, ?, ? )`,
            [data.PlanID, data.PatientID, data.GoalID, new Date(data.StartDate), data.Progress, data.UserID],
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
                    return callBack(null, "Patient plan goal created successfully");
                  } else {
                    return callBack("Failed to create patient plan goal", null, 500);
                  }
                });
            }
          );
      });
    /* End transaction */
  });
};

exports.patientSessionCreate = (data, callBack) => {
  db.query(
    `INSERT INTO sessions ( PatientID, TherapistID, ContentID, SessionName, ScenarioName, SessionDate, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.PatientID,
      data.TherapistID,
      data.ContentID,
      data.SessionName,
      data.ScenarioName,
      new Date(data.SessionDate),
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient session created successfully", results?.insertId);
      } else {
        return callBack("Failed to create patient session", null, 500);
      }
    }
  );
};

exports.patientSessionTrialCreate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const session_trialsResults = await connection.awaitQuery(
      `INSERT INTO session_trials ( SessionID, PatientID, NoOfPrompts, Create_By ) VALUES ( ?, ?, ?, ? )`,
      [data.SessionID, data.PatientID, 1, data.UserID]
    );
    await connection.awaitCommit();
    await connection.release();
    if (session_trialsResults.affectedRows >= 1) {
      return callBack(null, "Patient session trial created successfully", session_trialsResults?.insertId);
    } else {
      return callBack("Failed to create patient session trial", null, 500);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.patientSessionTrialFinish = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const session_trialsResults = await connection.awaitQuery(
      `UPDATE session_trials SET IsFinished = 1, NoOfSuccess = NoOfSuccess + 1, Update_By = ? WHERE SessionTrialID  = ?`,
      [data.UserID, data.SessionTrialID]
    );
    const behaviourData = [];
    const arrayBehaviourData = data?.BehaviourData;
    if (arrayBehaviourData?.length) {
      for (let index = 0; index < arrayBehaviourData.length; index++) {
        const element = arrayBehaviourData[index];
        behaviourData.push([data.SessionTrialID, data.SessionID, element, data.UserID]);
      }
      await connection.awaitQuery(
        `INSERT INTO session_behaviours ( SessionTrialID, SessionID, Behaviour, Create_By ) VALUES ?`,
        [behaviourData]
      );
    }
    const mandData = [];
    const arrayMandData = data?.MandData;
    if (arrayMandData?.length) {
      for (let index = 0; index < arrayMandData.length; index++) {
        const element = arrayMandData[index];
        mandData.push([data.SessionTrialID, data.SessionID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO session_mands ( SessionTrialID, SessionID, Mand, Create_By ) VALUES ?`, [
        mandData,
      ]);
    }
    await connection.awaitCommit();
    await connection.release();
    if (session_trialsResults.affectedRows >= 1) {
      return callBack(null, "Patient session trial finished successfully");
    } else {
      return callBack("Failed to finish patient session trial", null, 500);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.patientUpdate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const patientResult = await connection.awaitQuery(`SELECT UserID FROM patients WHERE PatientID = ?`, [
      data.PatientID,
    ]);
    if (!patientResult.length) {
      connection.rollback(() => {
        return callBack("Patient with provided PatientID not found", null, 404);
      });
    } else {
      await connection.awaitQuery(
        `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, District = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
        [
          data.ParentPhone,
          data.AddressLine1,
          data.AddressLine2,
          data.City,
          data.District,
          data.Pincode,
          data.State,
          data.Country,
          data.Status,
          data.UserID,
          patientResult[0].UserID,
        ]
      );
      await connection.awaitQuery(
        `UPDATE patients SET PatientName = ?, DOB = ?, Gender = ?, ParentName = ?, Relationship = ?, PreviousTreatmentHistoryDescription = ?, PreviousTreatmentHistoryURL = ?, DocumentsURL = ?, ReportsURL = ?, Remarks = ?, Difficulty = ? WHERE PatientID = ? `,
        [
          data.PatientName,
          new Date(data.DOB),
          data.Gender,
          data.ParentName,
          data.Relationship,
          data.PreviousTreatmentHistoryDescription,
          data.PreviousTreatmentHistoryURL,
          data.DocumentsURL,
          data.ReportsURL,
          data.Remarks,
          data.Difficulty,
          data.PatientID,
        ]
      );
      const PatientID = data.PatientID;
      await issueListUpdate(data, PatientID, connection);
      await connection.awaitCommit();
      await connection.release();
      return callBack(null, "Content updated successfully");
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.patientMetricsUpdate = (data, callBack) => {
  db.query(
    `UPDATE patient_assessment_screening_metrics SET ScheduleStartDate = ?, ScheduleEndDate = ?, ActualStartDate = ?, ActualEndDate = ?, CompletionStatus = ?, Status = ?, Update_By = ? WHERE PatientID = ? AND PatientMetricID = ? `,
    [
      new Date(data.ScheduleStartDate),
      new Date(data.ScheduleEndDate),
      new Date(data.ActualStartDate),
      new Date(data.ActualEndDate),
      data.CompletionStatus,
      data.Status,
      data.UserID,
      data.PatientID,
      data.PatientMetricID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient metrics updated successfully");
      } else {
        return callBack("Patient metrics not found", null, 404);
      }
    }
  );
};

exports.patientCommentUpdate = (data, callBack) => {
  db.query(
    `UPDATE therapist_comments SET Comment = ?, Status = ?, Update_By = ? WHERE CommentID = ? AND Create_By = ? `,
    [data.Comment, data.Status, data.UserID, data.CommentID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient comment updated successfully");
      } else {
        return callBack("Patient comment not found", null, 404);
      }
    }
  );
};

exports.patientPlanUpdate = (data, callBack) => {
  db.query(
    `UPDATE plans SET StartDate = ?, EndDate = ?, CompletionStatus = ?, Status = ?, Update_By = ? WHERE PatientID = ? AND PlanID = ? AND Create_By = ? `,
    [
      new Date(data.StartDate),
      new Date(data.EndDate),
      data.CompletionStatus,
      data.Status,
      data.UserID,
      data.PatientID,
      data.PlanID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Plan updated successfully");
      } else {
        return callBack("Plan not found", null, 404);
      }
    }
  );
};

exports.patientPlanGoalUpdate = (data, callBack) => {
  db.query(
    `UPDATE plan_goals SET StartDate = ?, Progress = ?, Status = ?, Update_By = ? WHERE PlanGoalID = ? AND Create_By = ? `,
    [new Date(data.StartDate), data.Progress, data.Status, data.UserID, data.PlanGoalID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Plan goal updated successfully");
      } else {
        return callBack("Plan goal not found", null, 404);
      }
    }
  );
};

exports.patientSessionUpdate = (data, callBack) => {
  db.query(
    `UPDATE sessions SET SessionName = ?, SessionDate = ?, Feedback = ?, Rating = ?, Status = ?, Update_By = ? WHERE SessionID = ? AND Create_By = ? `,
    [
      data.SessionName,
      new Date(data.SessionDate),
      data.Feedback,
      data.Rating,
      data.Status,
      data.UserID,
      data.SessionID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient session updated successfully");
      } else {
        return callBack("Patient session not found", null, 404);
      }
    }
  );
};

exports.patientDelete = (PatientID, callBack) => {
  db.query(
    `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID SET login_users.Status = 0 WHERE patients.PatientID = ?`,
    [PatientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient deleted successfully");
      } else {
        return callBack("Patient not found", null, 404);
      }
    }
  );
};

exports.patientDeleteByPatientIDNClientUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN clients ON login_users.Create_By = clients.UserID SET login_users.Status = 0 WHERE clients.UserID = ? AND patients.PatientID = ?`,
            [data.UserID, data.PatientID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN centers ON login_users.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.Status = 0 WHERE clients.UserID = ? AND patients.PatientID = ?`,
                  [data.UserID, data.PatientID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN therapists ON login_users.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.Status = 0 WHERE clients.UserID = ? AND patients.PatientID = ? `,
                        [data.UserID, data.PatientID],
                        (error, patientResult) => {
                          if (error) {
                            connection.rollback(() => {
                              connection.release();
                              return callBack(error.message);
                            });
                          } else
                            connection.commit((error, results) => {
                              if (error) {
                                connection.rollback(() => {
                                  connection.release();
                                  return callBack(error.message);
                                });
                              } else connection.release();
                              if (
                                clientsResult.affectedRows >= 1 ||
                                centersResult.affectedRows >= 1 ||
                                patientResult.affectedRows >= 1
                              ) {
                                return callBack(null, "Patient deleted successfully");
                              } else {
                                return callBack("Patient not found", null, 404);
                              }
                            });
                        }
                      );
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.patientDeleteByPatientIDNCenterUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN centers ON login_users.Create_By = centers.UserID SET login_users.Status = 0 WHERE centers.UserID = ? AND patients.PatientID = ? `,
            [data.UserID, data.PatientID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN therapists ON login_users.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET login_users.Status = 0 WHERE centers.UserID = ? AND patients.PatientID = ? `,
                  [data.UserID, data.PatientID],
                  (error, patientResult) => {
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
                        if (centersResult.affectedRows >= 1 || patientResult.affectedRows >= 1) {
                          return callBack(null, "Patient deleted successfully");
                        } else {
                          return callBack("Patient not found", null, 404);
                        }
                      });
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.patientDeleteByPatientIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE login_users INNER JOIN patients ON login_users.UserID = patients.UserID INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID SET login_users.Status = 0 WHERE patients.PatientID = ? AND therapists.UserID = ?;`,
    [data.PatientID, data.UserID],
    (error, patientResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (patientResult.affectedRows >= 1) {
          return callBack(null, "Patient deleted successfully");
        } else {
          return callBack("Patient not found", null, 404);
        }
      }
    }
  );
};

exports.patientCommentDelete = (data, callBack) => {
  db.query(
    `UPDATE therapist_comments SET Status = 0 WHERE CommentID = ? AND Create_By = ? `,
    [data.CommentID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Patient comment deleted successfully");
      } else {
        return callBack("Patient comment not found", null, 404);
      }
    }
  );
};

exports.patientPlanGoalDelete = (data, callBack) => {
  db.query(
    `UPDATE plan_goals SET Status = 0 WHERE PlanGoalID = ? AND Create_By = ? `,
    [data.PlanGoalID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Plan goal deleted successfully");
      } else {
        return callBack("Plan goal not found", null, 404);
      }
    }
  );
};

exports.patientRegister = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `INSERT INTO login_users ( EmailId, UserName, Phone, RoleId, Password, Create_By ) VALUES ( ?, ?, ?, ?, ?, ? )`,
            [data.ParentEmailID, data.ParentEmailID, data.ParentPhone, 5, data.Password, 0],
            (error, login_usersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const UserID = login_usersResult?.insertId;
                connection.query(
                  `INSERT INTO patients ( UserID, PatientName, ParentName, IsAppCreated ) VALUES ( ?, ?, ?, ? )`,
                  [UserID, data.PatientName, data.ParentName, 1],
                  (error, patientResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else {
                      connection.commit((error) => {
                        if (error) {
                          connection.rollback(() => {
                            connection.release();
                            return callBack(error.message);
                          });
                        } else {
                          connection.release();
                          if (login_usersResult.affectedRows >= 1 && patientResult.affectedRows >= 1) {
                            return callBack(null, "User registered successfully", patientResult?.insertId, UserID);
                          } else {
                            return callBack("Failed to register user", null, 500);
                          }
                        }
                      });
                    }
                  }
                );
              }
            }
          );
      });
    /* End transaction */
  });
};

async function issueListUpdate(data, PatientID, connection) {
  const issueList = [];
  const arrayIssueList = data?.AddIssueList;
  if (arrayIssueList?.length) {
    for (let index = 0; index < arrayIssueList.length; index++) {
      const element = arrayIssueList[index];
      issueList.push([PatientID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO patient_issues ( PatientID, IssueName, Create_By ) VALUES ?`, [issueList]);
  }
  if (data?.RemoveIssueListID?.length) {
    await connection.awaitQuery(
      `DELETE FROM patient_issues WHERE (IssueID, PatientID) IN (${arrayToNumberPair(
        data?.RemoveIssueListID,
        PatientID
      )})`
    );
  }
  return connection;
}
