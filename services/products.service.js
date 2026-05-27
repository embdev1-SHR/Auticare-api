const db = require("../config/db.config");

exports.productList = (callBack) => {
  db.query(`SELECT * FROM products WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.productDetails = (ProductID, callBack) => {
  db.query(`SELECT * FROM products WHERE ProductID = ? AND Status = 1`, [ProductID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.productCreate = (data, callBack) => {
  db.query(
    `INSERT INTO products ( ProductName, Category, Price, DiscountedPrice, Highlights, ProductDescription, ImageURL, ImageURL1, ImageURL2, ImageURL3, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.ProductName,
      data.Category,
      data.Price,
      data.DiscountedPrice,
      data.Highlights,
      data.ProductDescription,
      data.ImageURL,
      data.ImageURL1,
      data.ImageURL2,
      data.ImageURL3,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Product created successfully");
      } else {
        return callBack("Failed to create product", null, 500);
      }
    }
  );
};

exports.productUpdate = (data, callBack) => {
  db.query(
    `UPDATE products SET ProductName = ?, Category = ?, Price = ?, DiscountedPrice = ?, Highlights = ?,
    ProductDescription = ?, ImageURL = ?, ImageURL1 = ?, ImageURL2 = ?, ImageURL3 = ?, Status = ?, Update_By = ? WHERE ProductID = ? `,
    [
      data.ProductName,
      data.Category,
      data.Price,
      data.DiscountedPrice,
      data.Highlights,
      data.ProductDescription,
      data.ImageURL,
      data.ImageURL1,
      data.ImageURL2,
      data.ImageURL3,
      data.Status,
      data.UserID,
      data.ProductID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Product updated successfully");
      } else {
        return callBack("Product not found", null, 404);
      }
    }
  );
};
