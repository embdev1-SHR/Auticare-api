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
      data.ImageURL1 || null,
      data.ImageURL2 || null,
      data.ImageURL3 || null,
      data.UserID,
    ],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows === 1) return callBack(null, "Product created successfully");
      return callBack("Failed to create product", null, 500);
    }
  );
};

exports.productBulkCreate = (products, userID, callBack) => {
  if (!products || products.length === 0) return callBack("No products provided");
  const values = products.map((p) => [
    p.ProductName, p.Category, p.Price, p.DiscountedPrice,
    p.Highlights || "", p.ProductDescription || "",
    p.ImageURL || "", p.ImageURL1 || null, p.ImageURL2 || null, p.ImageURL3 || null,
    userID,
  ]);
  db.query(
    `INSERT INTO products (ProductName, Category, Price, DiscountedPrice, Highlights, ProductDescription, ImageURL, ImageURL1, ImageURL2, ImageURL3, Create_By) VALUES ?`,
    [values],
    (error, results) => {
      if (error) return callBack(error.message);
      return callBack(null, `${results.affectedRows} product(s) created successfully`);
    }
  );
};

exports.productDelete = (ProductID, userID, callBack) => {
  db.query(
    `UPDATE products SET Status = 0, Update_By = ? WHERE ProductID = ?`,
    [userID, ProductID],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows === 1) return callBack(null, "Product deleted successfully");
      return callBack("Product not found", null, 404);
    }
  );
};

exports.productUpdate = (data, callBack) => {
  db.query(
    `UPDATE products SET ProductName = ?, Category = ?, Price = ?, DiscountedPrice = ?, Highlights = ?,
    ProductDescription = ?, ImageURL = ?, ImageURL1 = ?, ImageURL2 = ?, ImageURL3 = ?, Status = ?, Update_By = ? WHERE ProductID = ?`,
    [
      data.ProductName,
      data.Category,
      data.Price,
      data.DiscountedPrice,
      data.Highlights,
      data.ProductDescription,
      data.ImageURL,
      data.ImageURL1 || null,
      data.ImageURL2 || null,
      data.ImageURL3 || null,
      data.Status,
      data.UserID,
      data.ProductID,
    ],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows == 1) return callBack(null, "Product updated successfully");
      return callBack("Product not found", null, 404);
    }
  );
};
