const db = require("../config/db.config");
const promiseDB = db.promise();

exports.subscriptionPlanList = (callBack) => {
  db.query(`SELECT * FROM subscription_plans`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.subscriptionPlanDetails = (SubscriptionPlanID, callBack) => {
  db.query(`SELECT * FROM subscription_plans WHERE SubscriptionPlanID = ?`, [SubscriptionPlanID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.subscriptionPlanDetailsByUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT subscription_plans.*, clients.SubscriptionPlanActivatedDate, clients.SubcriptionPlanEndDate FROM clients LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID LEFT JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId WHERE clients.UserID = ? OR centers.UserID = ? OR therapists.UserID = ? limit 1 `,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.subscriptionPlanCreate = (data, callBack) => {
  db.query(
    `INSERT INTO subscription_plans ( PlanName, Contents, Frequency, NumberOfPlanActiveDays, NumberofTherapists, NumberofPatients, NumberofCustomScales, NumberofCustomSkills, NumberofCustomAssessment, NumberofCustomContents, Price, OnetimeFee, PlanType, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.PlanName,
      data.Contents,
      data.Frequency,
      data.NumberOfPlanActiveDays,
      data.NumberofTherapists,
      data.NumberofPatients,
      data.NumberofCustomScales,
      data.NumberofCustomSkills,
      data.NumberofCustomAssessment,
      data.NumberofCustomContents,
      data.Price,
      data.OnetimeFee,
      data.PlanType,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Subscription plan created successfully");
      } else {
        return callBack("Failed to create subscription plan", null, 500);
      }
    }
  );
};

exports.subscriptionPlanDelete = (SubscriptionPlanID, callBack) => {
  db.query(
    `DELETE FROM subscription_plans WHERE SubscriptionPlanID = ?`,
    [SubscriptionPlanID],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows === 1) return callBack(null, "Subscription plan deleted successfully");
      return callBack("Subscription plan not found", null, 404);
    }
  );
};

exports.subscriptionPlanUpdate = (data, callBack) => {
  db.query(
    `UPDATE subscription_plans SET PlanName = ?, Contents = ?, Frequency = ?, NumberOfPlanActiveDays = ?, NumberofTherapists = ?, NumberofPatients = ?, NumberofCustomScales = ?, NumberofCustomSkills = ?, NumberofCustomAssessment = ?, NumberofCustomContents = ?, Price = ?, OnetimeFee = ?, PlanType = ?, Status = ?, Update_By = ? WHERE SubscriptionPlanID = ? `,
    [
      data.PlanName,
      data.Contents,
      data.Frequency,
      data.NumberOfPlanActiveDays,
      data.NumberofTherapists,
      data.NumberofPatients,
      data.NumberofCustomScales,
      data.NumberofCustomSkills,
      data.NumberofCustomAssessment,
      data.NumberofCustomContents,
      data.Price,
      data.OnetimeFee,
      data.PlanType,
      data.Status,
      data.UserID,
      data.SubscriptionPlanId,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Subscription plan updated successfully");
      } else {
        return callBack("Subscription plan not found", null, 404);
      }
    }
  );
};
