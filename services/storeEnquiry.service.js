const db = require("../config/db.config");

exports.storeEnquiryList = (callBack) => {
  db.query(
    `SELECT store_enquiries.*, therapists.Name, login_users.EmailId, login_users.Phone, products.ProductName FROM store_enquiries INNER JOIN therapists ON therapists.UserID = store_enquiries.Create_By INNER JOIN login_users on login_users.UserID = therapists.UserID INNER JOIN products ON products.ProductID = store_enquiries.ProductID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.storeEnquiryDetails = (StoreEnquiryID, callBack) => {
  db.query(
    `SELECT store_enquiries.*, therapists.Name, login_users.EmailId, login_users.Phone, products.ProductName FROM store_enquiries INNER JOIN therapists ON therapists.UserID = store_enquiries.Create_By INNER JOIN login_users on login_users.UserID = therapists.UserID INNER JOIN products ON products.ProductID = store_enquiries.ProductID WHERE StoreEnquiryID = ?`,
    [StoreEnquiryID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.storeEnquiryCreate = (data, callBack) => {
  db.query(
    `INSERT INTO store_enquiries ( ProductID, Enquiry, Create_By ) VALUES ( ?, ?, ? )`,
    [data.ProductID, data.Enquiry, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Store enquiry created successfully");
      } else {
        return callBack("Failed to create store enquiry", null, 500);
      }
    }
  );
};

exports.storeEnquiryDelete = (StoreEnquiryID, callBack) => {
  db.query(
    `DELETE FROM store_enquiries WHERE StoreEnquiryID = ?`,
    [StoreEnquiryID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Store enquiry deleted successfully");
      } else {
        return callBack("Store enquiry not found", null, 404);
      }
    }
  );
};

exports.storeEnquiryUpdate = (data, callBack) => {
  db.query(
    `UPDATE store_enquiries SET IsAdminViewed = ?, Status = ?, Update_By = ? WHERE StoreEnquiryID = ? `,
    [data.IsAdminViewed, data.Status, data.UserID, data.StoreEnquiryID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Store enquiry updated successfully");
      } else {
        return callBack("Store enquiry not found", null, 404);
      }
    }
  );
};
