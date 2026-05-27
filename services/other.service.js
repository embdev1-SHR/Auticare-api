const db = require("../config/db.config");
const promiseDB = db.promise();

exports.CountryList = (callBack) => {
  db.query(`SELECT * FROM countries`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.StateList = (CountryID, callBack) => {
  db.query(`SELECT * FROM states WHERE CountryID = ?`, [CountryID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.facilitatorByFacilitatorType = (FacilitatorType, callBack) => {
  db.query(`SELECT * FROM facilitators WHERE FacilitatorType LIKE ?`, [FacilitatorType], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.counts = async () => {
  const [rows] = await promiseDB.query(
    `SELECT ( SELECT COUNT(*) FROM clients INNER JOIN login_users ON login_users.UserID = clients.UserID WHERE login_users.Status = 1 ) AS clients, ( SELECT COUNT(*) FROM centers INNER JOIN login_users ON login_users.UserID = centers.UserID WHERE login_users.Status = 1 ) AS centers, ( SELECT COUNT(*) FROM therapists INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE login_users.Status = 1 ) AS therapists, ( SELECT COUNT(*) FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE login_users.Status = 1 ) AS patients, ( SELECT COUNT(*) FROM patients INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE patients.IsAppCreated = 1 AND login_users.Status = 1 ) AS patientAppUsers, ( SELECT COUNT(*) FROM patient_appointments WHERE AppointmentStatus = "Scheduled" ) AS patientAppointments;`
  );
  return rows;
};

exports.countsByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT ( SELECT COUNT(*) FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN login_users ON login_users.UserID = centers.UserID WHERE clients.UserID = ? AND login_users.Status = 1 ) AS centers, ( SELECT COUNT(*) FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE clients.UserID = ? AND login_users.Status = 1 ) AS therapists, ( SELECT COUNT(*) FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE clients.UserID = ? AND login_users.Status = 1 ) AS patients, ( SELECT COUNT(*) FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_appointments ON patient_appointments.TherapistID = therapists.TherapistID WHERE clients.UserID = ? AND patient_appointments.AppointmentStatus = "Scheduled" ) AS patientAppointments;`,
    [UserID, UserID, UserID, UserID]
  );
  return rows;
};

exports.countsByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT ( SELECT COUNT(*) FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE centers.UserID = ? AND login_users.Status = 1 ) AS therapists, ( SELECT COUNT(*) FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE centers.UserID = ? AND login_users.Status = 1 ) AS patients, ( SELECT COUNT(*) FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_appointments ON patient_appointments.TherapistID = therapists.TherapistID WHERE centers.UserID = ? AND patient_appointments.AppointmentStatus = "Scheduled" ) AS patientAppointments;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.countsByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT ( SELECT COUNT(*) FROM therapists INNER JOIN patients ON patients.TherapistID = therapists.TherapistID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE therapists.UserID = ? AND login_users.Status = 1 ) AS patients, ( SELECT COUNT(*) FROM therapists INNER JOIN patient_appointments ON patient_appointments.TherapistID = therapists.TherapistID WHERE therapists.UserID = ? AND patient_appointments.AppointmentStatus = "Scheduled" ) AS patientAppointments; `,
    [UserID, UserID]
  );
  return rows;
};
