const db = require("../config/db.config");

exports.freeResourceList = (callBack) => {
  db.query(`SELECT * FROM free_resources`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.freeResourceDetails = (FreeResourceID, callBack) => {
  db.query(
    `SELECT * FROM free_resources WHERE FreeResourceID = ?`,
    [FreeResourceID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.freeResourceCreate = (data, callBack) => {
  db.query(
    `INSERT INTO free_resources ( ResourceTitle, ResourceDescription, ResourceType, ResourceURL, Create_By ) VALUES ( ?, ?, ?, ?, ? )`,
    [
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
        return callBack(null, "Free resource created successfully");
      } else {
        return callBack("Failed to create free resource", null, 500);
      }
    }
  );
};

exports.freeResourceUpdate = (data, callBack) => {
  db.query(
    `UPDATE free_resources SET ResourceTitle = ?, ResourceDescription = ?, ResourceType = ?, ResourceURL = ?, Status = ?, Update_By = ? WHERE FreeResourceID = ? `,
    [
      data.ResourceTitle,
      data.ResourceDescription,
      data.ResourceType,
      data.ResourceURL,
      data.Status,
      data.UserID,
      data.FreeResourceID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Free resource updated successfully");
      } else {
        return callBack("Free resource not found", null, 404);
      }
    }
  );
};

exports.freeResourceClickUpdate = (data, callBack) => {
  db.query(
    `UPDATE free_resources SET Clicks = Clicks + ?, Update_By = ? WHERE FreeResourceID = ? `,
    [1, data.UserID, data.FreeResourceID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Free resource updated successfully");
      } else {
        return callBack("Free resource not found", null, 404);
      }
    }
  );
};
