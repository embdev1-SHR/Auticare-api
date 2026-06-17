const db = require("../config/db.config");

exports.storeOrderList = (callBack) => {
  db.query(
    `SELECT store_orders.*, login_users.EmailId, login_users.Phone, products.ProductName, products.DiscountedPrice,
      COALESCE(therapists.Name, centers.CenterName, clients.ClientName, login_users.UserName) AS RequesterName
    FROM store_orders
    INNER JOIN login_users ON login_users.UserID = store_orders.Create_By
    LEFT JOIN therapists ON therapists.UserID = store_orders.Create_By
    LEFT JOIN centers ON centers.UserID = store_orders.Create_By
    LEFT JOIN clients ON clients.UserID = store_orders.Create_By
    INNER JOIN products ON products.ProductID = store_orders.ProductID
    ORDER BY store_orders.Create_TS DESC`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.storeOrderDetails = (StoreOrderID, callBack) => {
  db.query(
    `SELECT store_orders.*, login_users.EmailId, login_users.Phone, products.ProductName, products.DiscountedPrice,
      COALESCE(therapists.Name, centers.CenterName, clients.ClientName, login_users.UserName) AS RequesterName
    FROM store_orders
    INNER JOIN login_users ON login_users.UserID = store_orders.Create_By
    LEFT JOIN therapists ON therapists.UserID = store_orders.Create_By
    LEFT JOIN centers ON centers.UserID = store_orders.Create_By
    LEFT JOIN clients ON clients.UserID = store_orders.Create_By
    INNER JOIN products ON products.ProductID = store_orders.ProductID
    WHERE store_orders.StoreOrderID = ?`,
    [StoreOrderID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.storeOrderCreate = (data, callBack) => {
  db.query(
    `INSERT INTO store_orders (ProductID, Quantity, ShippingAddress, ContactName, Phone, OrderNotes, OrderStatus, Create_By)
     VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)`,
    [data.ProductID, data.Quantity, data.ShippingAddress, data.ContactName, data.Phone, data.OrderNotes || null, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Store order created successfully");
      } else {
        return callBack("Failed to create store order", null, 500);
      }
    }
  );
};

exports.storeOrderUpdate = (data, callBack) => {
  db.query(
    `UPDATE store_orders SET OrderStatus = ?, Update_By = ?, Update_TS = NOW() WHERE StoreOrderID = ?`,
    [data.OrderStatus, data.UserID, data.StoreOrderID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Store order updated successfully");
      } else {
        return callBack("Store order not found", null, 404);
      }
    }
  );
};

exports.storeOrderDelete = (StoreOrderID, callBack) => {
  db.query(
    `DELETE FROM store_orders WHERE StoreOrderID = ?`,
    [StoreOrderID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Store order deleted successfully");
      } else {
        return callBack("Store order not found", null, 404);
      }
    }
  );
};
