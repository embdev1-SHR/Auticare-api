const db = require("../config/db.config");
const promiseDB = db.promise();

exports.paymentList = (callBack) => {
  db.query(
    `SELECT payments.*, clients.ClientName FROM payments INNER JOIN clients ON clients.ClientID = payments.ClientID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.paymentDetails = (PaymentID, callBack) => {
  db.query(
    `SELECT payments.*, clients.ClientName FROM payments INNER JOIN clients ON clients.ClientID = payments.ClientID WHERE payments.PaymentID = ?`,
    [PaymentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.paymentCreate = (data, callBack) => {
  db.query(
    `INSERT INTO payments ( ClientID, Amount, Description, PaymentType, Create_By ) VALUES ( ?, ?, ?, ?, ? )`,
    [data.ClientID, data.Amount, data.Description, data.PaymentType, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Payment created successfully");
      } else {
        return callBack("Failed to create payment", null, 500);
      }
    }
  );
};

exports.paymentUpdate = (data, callBack) => {
  db.query(
    `UPDATE payments SET ClientID = ?, Amount = ?, Description = ?, PaymentType = ?, Status = ?, Update_By = ? WHERE PaymentID = ? `,
    [data.ClientID, data.Amount, data.Description, data.PaymentType, data.Status, data.UserID, data.PaymentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Payment updated successfully");
      } else {
        return callBack("Payment not found", null, 404);
      }
    }
  );
};

exports.paymentByMonth = async () => {
  const [rows] = await promiseDB.query(
    `SELECT DATE_FORMAT(Create_TS,'%d/%m/%Y') AS Date, SUM(Amount) AS Amount FROM payments WHERE Status = 1 GROUP BY YEAR(Create_TS), MONTH(Create_TS); `
  );
  return rows;
};
