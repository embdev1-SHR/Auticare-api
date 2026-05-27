const db = require("../config/db.config");

exports.exceptionSlotListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT slot_exceptions.* FROM therapists INNER JOIN slot_exceptions ON therapists.TherapistID = slot_exceptions.TherapistID WHERE therapists.UserID = ? `,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.exceptionSlotCreate = (data, callBack) => {
  const exceptionSlots = data.ExceptionSlots;
  const exceptionSlotsArr = [];
  for (let index = 0; index < exceptionSlots.length; index++) {
    const element = exceptionSlots[index];
    exceptionSlotsArr.push([
      data.TherapistID,
      element.AppointmentSlotID,
      new Date(element.Date),
      [true, "true", "TRUE", 1, "1"].includes(element.IsLeaveFullDay) ? 1 : 0,
      data.UserID,
    ]);
  }
  db.query(
    `INSERT INTO slot_exceptions ( TherapistID, AppointmentSlotID, Date, IsLeaveFullDay, Create_By ) VALUES ?`,
    [exceptionSlotsArr],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows >= 1) {
        return callBack(null, "Exception slots created successfully");
      } else {
        return callBack("Failed to create exception slots", null, 500);
      }
    }
  );
};

exports.exceptionSlotUpdateByTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE slot_exceptions SET Date = ?, Status = ?, Update_By = ? WHERE ExceptionSlotID = ? AND Create_By = ? `,
    [
      new Date(data.Date),
      data.Status,
      data.UserID,
      data.ExceptionSlotID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Exception slot updated successfully");
      } else {
        return callBack("Exception slot not found", null, 404);
      }
    }
  );
};
