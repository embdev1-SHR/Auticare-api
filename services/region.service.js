const db = require("../config/db.config");

exports.regionList = (callBack) => {
  db.query(`SELECT * FROM regions`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.regionDetails = (RegionID, callBack) => {
  db.query(
    `SELECT * FROM regions WHERE RegionID = ?`,
    [RegionID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
