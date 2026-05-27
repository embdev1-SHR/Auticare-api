const db = require("../config/db.config");

exports.appointmentSlotListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT appointment_slots.*, login_users.Token FROM therapists INNER JOIN appointment_slots ON therapists.TherapistID = appointment_slots.TherapistID INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE therapists.UserID = ?;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentSlotList = (callBack) => {
  db.query(
    `SELECT appointment_slots.*, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, centers.CenterName, login_users.Token FROM therapists INNER JOIN appointment_slots ON therapists.TherapistID = appointment_slots.TherapistID INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN login_users ON login_users.UserID = therapists.UserID; `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentSlotListByTherapistID = (TherapistID, callBack) => {
  db.query(
    `SELECT appointment_slots.*, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, centers.CenterName, login_users.Token FROM therapists INNER JOIN appointment_slots ON therapists.TherapistID = appointment_slots.TherapistID INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN login_users ON login_users.UserID = therapists.UserID WHERE appointment_slots.TherapistID = ?`,
    TherapistID,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.appointmentSlotCreate = (data, callBack) => {
  const appointmentSlots = data.AppointmentSlots;
  const appointmentSlotsArr = [];
  for (let index = 0; index < appointmentSlots.length; index++) {
    const element = appointmentSlots[index];
    appointmentSlotsArr.push([
      data.TherapistID,
      element.StartTime,
      element.EndTime,
      data.UserID,
    ]);
  }
  db.query(
    `INSERT INTO appointment_slots ( TherapistID, StartTime, EndTime, Create_By ) VALUES ?`,
    [appointmentSlotsArr],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Appointment slots created successfully");
      } else {
        return callBack("Failed to create appointment slots", null, 500);
      }
    }
  );
};

exports.appointmentSlotUpdateByTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE appointment_slots SET StartTime = ?, EndTime = ?, Status = ?, Update_By = ? WHERE AppointmentSlotID = ? AND Create_By = ? `,
    [
      data.StartTime,
      data.EndTime,
      data.Status,
      data.UserID,
      data.AppointmentSlotID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Appointment slot updated successfully");
      } else {
        return callBack("Appointment slot not found", null, 404);
      }
    }
  );
};
