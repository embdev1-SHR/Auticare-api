const db = require("../config/db.config");
const dbAwait = require("../config/dbAwait.config");

exports.appointmentListByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_appointments.AppointmentID, patient_appointments.PatientID, patient_appointments.ScheduledDate, patient_appointments.PaymentID, patient_appointments.PaymentStatus, patient_appointments.AppointmentStatus, appointment_slots.*, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM patients INNER JOIN patient_appointments ON patients.PatientID = patient_appointments.PatientID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN therapists ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE patients.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentUploadsListByPatientUserIDNAppointmentID = (data, callBack) => {
  db.query(
    `SELECT appointment_uploads.* FROM appointment_uploads INNER JOIN patient_appointments ON appointment_uploads.AppointmentID = patient_appointments.AppointmentID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID WHERE patients.UserID = ? AND appointment_uploads.AppointmentID = ?`,
    [data.UserID, data.AppointmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentUpcomingByPatientUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_appointments.AppointmentID, patient_appointments.PatientID, patient_appointments.ScheduledDate, patient_appointments.PaymentID, patient_appointments.PaymentStatus, patient_appointments.AppointmentStatus, appointment_slots.*, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM patients INNER JOIN patient_appointments ON patients.PatientID = patient_appointments.PatientID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN therapists ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN centers ON centers.CenterID = therapists.CenterID WHERE patients.UserID = ? AND patient_appointments.AppointmentStatus = "Scheduled" ORDER BY patient_appointments.ScheduledDate DESC LIMIT 1`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentList = (callBack) => {
  db.query(
    `SELECT patient_appointments.*, appointment_slots.StartTime, appointment_slots.EndTime, patients.PatientName, patients.ParentName, login_users.Token, concat(therapists.Salutation, " ", therapists.Name) AS therapistName, centers.CenterName, clients.ClientName FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_appointments ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID INNER JOIN login_users ON login_users.UserID = patients.UserID;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_appointments.*, appointment_slots.StartTime, appointment_slots.EndTime, patients.PatientName, patients.ParentName, login_users.Token FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN patient_appointments ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE centers.UserID = ?;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_appointments.*, appointment_slots.StartTime, appointment_slots.EndTime, patients.PatientName, patients.ParentName, login_users.Token FROM therapists INNER JOIN patient_appointments ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID INNER JOIN login_users ON login_users.UserID = patients.UserID WHERE therapists.UserID = ?`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentUploadsListByTherapistUserIDNAppointmentID = (data, callBack) => {
  db.query(
    `SELECT appointment_uploads.* FROM appointment_uploads INNER JOIN patient_appointments ON appointment_uploads.AppointmentID = patient_appointments.AppointmentID INNER JOIN therapists ON therapists.TherapistID = patient_appointments.TherapistID WHERE therapists.UserID = ? AND appointment_uploads.AppointmentID = ?`,
    [data.UserID, data.AppointmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentUpcomingByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT patient_appointments.*, appointment_slots.StartTime, appointment_slots.EndTime, patients.PatientName, patients.ParentName FROM therapists INNER JOIN patient_appointments ON therapists.TherapistID = patient_appointments.TherapistID INNER JOIN appointment_slots ON appointment_slots.AppointmentSlotID = patient_appointments.AppointmentSlotID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID WHERE therapists.UserID = ? AND patient_appointments.AppointmentStatus = "Scheduled" ORDER BY patient_appointments.ScheduledDate DESC LIMIT 1`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentDetailsByAppointmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT patient_appointments.* FROM therapists INNER JOIN patient_appointments ON therapists.TherapistID = patient_appointments.TherapistID WHERE therapists.UserID = ? AND patient_appointments.AppointmentID = ?`,
    [data.UserID, data.AppointmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentSearchByAppointmentNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT patient_appointments.* FROM therapists INNER JOIN patient_appointments ON therapists.UserID = patient_appointments.Create_By WHERE therapists.UserID = ${data.UserID} AND AppointmentName LIKE '%${data.AppointmentName}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentCreate = (data, callBack) => {
  const dateSplit = data.ScheduledDate.split("/");
  const scheduledDate = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
  db.query(
    `SELECT * FROM patient_appointments WHERE AppointmentSlotID = ? AND ScheduledDate = ? AND AppointmentStatus = ? LIMIT 1`,
    [data.AppointmentSlotID, scheduledDate, "Scheduled"],
    (error, existingResults) => {
      if (error) {
        return callBack(error.message);
      } else if (existingResults.length) {
        return callBack("Appoinment already exists");
      }
      db.query(
        `INSERT INTO patient_appointments ( PatientID, TherapistID, AppointmentSlotID, ScheduledDate, PaymentID, PaymentStatus, AppointmentStatus, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )`,
        [
          data.PatientID,
          data.TherapistID,
          data.AppointmentSlotID,
          new Date(data.ScheduledDate),
          data.PaymentID,
          data.PaymentStatus,
          data.AppointmentStatus ? data.AppointmentStatus : "Requested",
          data.UserID,
        ],
        (error, results) => {
          if (error) {
            return callBack(error.message);
          } else if (results.affectedRows === 1) {
            return callBack(null, "Appointment created successfully");
          } else {
            return callBack("Failed to create appointment", null, 500);
          }
        }
      );
    }
  );
};

exports.appointmentUploadsCreate = (data, callBack) => {
  db.query(
    `INSERT INTO appointment_uploads ( AppointmentID, UploadURL, UserType, Create_By ) VALUES ( ?, ?, ?, ? )`,
    [data.AppointmentID, data.UploadURL, data.UserType, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Appointment upload created successfully");
      } else {
        return callBack("Failed to create appointment upload", null, 500);
      }
    }
  );
};

exports.appointmentUpdateByPatientUserID = (data, callBack) => {
  db.query(
    `UPDATE patient_appointments INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID SET patient_appointments.AppointmentStatus = ?, patient_appointments.Update_By = ? WHERE patient_appointments.AppointmentID = ? AND patients.UserID = ? AND patient_appointments.AppointmentStatus != "Scheduled"`,
    [data.AppointmentStatus, data.UserID, data.AppointmentID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Appointment updated successfully");
      } else {
        return callBack("Appointment not found", null, 404);
      }
    }
  );
};

exports.appointmentUpdateByTherapistID = (data, callBack) => {
  db.query(
    `UPDATE patient_appointments SET AppointmentStatus = ?, Update_By = ? WHERE AppointmentID = ? AND TherapistID = ? `,
    [data.AppointmentStatus, data.UserID, data.AppointmentID, data.TherapistID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Appointment updated successfully");
      } else {
        return callBack("Appointment not found", null, 404);
      }
    }
  );
};

exports.appointmentApproveByTherapistID = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const dateSplit = data.ScheduledDate.split("/");
    const scheduledDate = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
    await connection.awaitQuery(
      `SET @x := NOT EXISTS (SELECT * FROM patient_appointments WHERE AppointmentSlotID = ? AND ScheduledDate = ? AND AppointmentStatus = ?)`,
      [data.AppointmentSlotID, scheduledDate, "Scheduled"]
    );
    const patient_appointmentsResult = await connection.awaitQuery(
      `UPDATE patient_appointments SET AppointmentStatus = ?, Update_By = ? WHERE AppointmentID = ? AND @x`,
      ["Scheduled", data.UserID, data.AppointmentID]
    );
    await connection.awaitQuery(
      `UPDATE patient_appointments SET AppointmentStatus = ?, Update_By = ? WHERE TherapistID = ? AND AppointmentSlotID = ? AND ScheduledDate = ? AND AppointmentStatus = ?`,
      ["Cancelled", data.UserID, data.TherapistID, data.AppointmentSlotID, scheduledDate, "Requested"]
    );
    await connection.awaitCommit();
    await connection.release();
    if (patient_appointmentsResult.affectedRows >= 1) {
      return callBack(null, "Appointment approved successfully");
    } else {
      return callBack("Appointment not found or already approved", null, 404);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.appointmentUploadDeleteByAppointmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `DELETE appointment_uploads FROM appointment_uploads INNER JOIN patient_appointments ON appointment_uploads.AppointmentID = patient_appointments.AppointmentID INNER JOIN patients ON patients.PatientID = patient_appointments.PatientID WHERE patients.UserID = ? AND patient_appointments.AppointmentID`,
    [data.UserID, data.AppointmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentUploadDeleteByAppointmentIDNPatientUserID = (data, callBack) => {
  db.query(
    `DELETE appointment_uploads FROM appointment_uploads INNER JOIN patient_appointments ON appointment_uploads.AppointmentID = patient_appointments.AppointmentID INNER JOIN therapists ON therapists.TherapistID = patient_appointments.TherapistID WHERE therapists.UserID = ? AND patient_appointments.AppointmentID`,
    [data.UserID, data.AppointmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
