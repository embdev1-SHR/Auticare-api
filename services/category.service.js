const db = require("../config/db.config");
const promiseDB = db.promise();

exports.categoryList = (callBack) => {
  db.query(`SELECT * FROM categories WHERE Status = 1;`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.categoryListByScaleID = (ScaleID, callBack) => {
  db.query(`SELECT * FROM categories WHERE ScaleID = ? AND Status = 1;`, [ScaleID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

// exports.categoryListByClientUserID = (UserID, callBack) => {
//   db.query(
//     `SELECT categories.* FROM clients INNER JOIN categories ON clients.UserID = categories.Create_By WHERE clients.UserID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN categories ON centers.UserID = categories.Create_By WHERE clients.UserID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE clients.UserID = ?`,
//     [UserID, UserID, UserID, UserID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryListByClientUserIDNScaleID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM clients INNER JOIN categories ON clients.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.ScaleID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN categories ON centers.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.ScaleID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.ScaleID = ?`,
//     [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryListByCenterUserID = (UserID, callBack) => {
//   db.query(
//     `SELECT categories.* FROM centers INNER JOIN categories ON centers.UserID = categories.Create_By WHERE centers.UserID = ? UNION SELECT categories.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE centers.UserID = ? `,
//     [UserID, UserID, UserID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryListByCenterUserIDNScaleID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM centers INNER JOIN categories ON centers.UserID = categories.Create_By WHERE centers.UserID = ? AND categories.ScaleID = ? UNION SELECT categories.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE centers.UserID = ?  AND categories.ScaleID = ? `,
//     [data.UserID, data.ScaleID, data.UserID, data.ScaleID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryListByTherapistUserID = (UserID, callBack) => {
//   db.query(
//     `SELECT categories.* FROM therapists INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE therapists.UserID = ? `,
//     [UserID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

exports.categoryListByTherapistUserIDNScaleID = async (data) => {
  const [rows] = await promiseDB.query(`SELECT * FROM categories WHERE ScaleID = ?`, [data.ScaleID]);
  return rows;
};

exports.categoryDetails = (CategoryID, callBack) => {
  db.query(`SELECT * FROM categories WHERE CategoryID = ? AND Status = 1`, [CategoryID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

// exports.categoryDetailsByCategoryIDNClientUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM clients INNER JOIN categories ON clients.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.CategoryID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN categories ON centers.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.CategoryID = ? UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE clients.UserID = ? AND categories.CategoryID = ?`,
//     [
//       data.UserID,
//       data.CategoryID,
//       data.UserID,
//       data.CategoryID,
//       data.UserID,
//       data.CategoryID,
//       data.UserID,
//       data.CategoryID,
//     ],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryDetailsByCategoryIDNCenterUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM centers INNER JOIN categories ON centers.UserID = categories.Create_By WHERE centers.UserID = ? AND categories.CategoryID = ? UNION SELECT categories.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE centers.UserID = ? AND categories.CategoryID = ? `,
//     [data.UserID, data.CategoryID, data.UserID, data.CategoryID, data.UserID, data.CategoryID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categoryDetailsByCategoryIDNTherapistUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM therapists INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE therapists.UserID = ? AND categories.CategoryID = ?`,
//     [data.UserID, data.CategoryID],
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

exports.categorySearch = (data, callBack) => {
  db.query(
    `SELECT * FROM categories WHERE CategoryName LIKE '%${data.CategoryName}%' AND Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

// exports.categorySearchByCategoryNameNClientUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM clients INNER JOIN categories ON clients.UserID = categories.Create_By WHERE clients.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN categories ON centers.UserID = categories.Create_By WHERE clients.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' UNION SELECT categories.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE clients.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' `,
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categorySearchByCategoryNameNCenterUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM centers INNER JOIN categories ON centers.UserID = categories.Create_By WHERE centers.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' UNION SELECT categories.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE centers.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' `,
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

// exports.categorySearchByCategoryNameNTherapistUserID = (data, callBack) => {
//   db.query(
//     `SELECT categories.* FROM therapists INNER JOIN categories ON therapists.UserID = categories.Create_By WHERE therapists.UserID = ${data.UserID} AND CategoryName LIKE '%${data.CategoryName}%' `,
//     (error, results) => {
//       if (error) {
//         return callBack(error.message);
//       } else return callBack(null, results);
//     }
//   );
// };

exports.categoryCreate = (data, callBack) => {
  db.query(
    `INSERT INTO categories ( ScaleID, CategoryName, CategoryLabel, Create_By ) VALUES ( ?, ?, ?, ? )`,
    [data.ScaleID, data.CategoryName, data.CategoryLabel, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Category created successfully");
      } else {
        return callBack("Failed to create category", null, 500);
      }
    }
  );
};

exports.categoryUpdate = (data, callBack) => {
  db.query(
    `UPDATE categories SET CategoryName = ?, Status = ?, Update_By = ? WHERE CategoryID = ? `,
    [data.CategoryName, data.Status ? 1 : 0, data.UserID, data.CategoryID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Category updated successfully");
      } else {
        return callBack("Category not found", null, 404);
      }
    }
  );
};

exports.categoryUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE categories SET CategoryName = ?, Status = ?, Update_By = ? WHERE CategoryID = ? AND Create_By = ? `,
    [data.CategoryName, data.Status, data.UserID, data.CategoryID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Category updated successfully");
      } else {
        return callBack("Category not found", null, 404);
      }
    }
  );
};

exports.categoryDelete = (CategoryID, callBack) => {
  db.query(`UPDATE categories SET Status = 0 WHERE CategoryID = ? `, [CategoryID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Category deleted successfully");
    } else {
      return callBack("Category not found", null, 404);
    }
  });
};

exports.categoryDeleteByCategoryIDNClientUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE categories INNER JOIN clients ON categories.Create_By = clients.UserID SET categories.Status = 0 WHERE clients.UserID = ? AND categories.CategoryID = ? `,
            [data.UserID, data.CategoryID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE categories INNER JOIN centers ON categories.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET categories.Status = 0 WHERE clients.UserID = ? AND categories.CategoryID = ? `,
                  [data.UserID, data.CategoryID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE categories INNER JOIN therapists ON categories.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET categories.Status = 0 WHERE clients.UserID = ? AND categories.CategoryID = ? `,
                        [data.UserID, data.CategoryID],
                        (error, therapistsResult) => {
                          if (error) {
                            connection.rollback(() => {
                              connection.release();
                              return callBack(error.message);
                            });
                          } else
                            connection.commit((error) => {
                              if (error) {
                                connection.rollback(() => {
                                  connection.release();
                                  return callBack(error.message);
                                });
                              } else connection.release();
                              if (
                                clientsResult.affectedRows >= 1 ||
                                centersResult.affectedRows >= 1 ||
                                therapistsResult.affectedRows >= 1
                              ) {
                                return callBack(null, "Category deleted successfully");
                              } else {
                                return callBack("Category not found", null, 404);
                              }
                            });
                        }
                      );
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.categoryDeleteByCategoryIDNCenterUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE categories INNER JOIN centers ON categories.Create_By = centers.UserID SET categories.Status = 0 WHERE centers.UserID = ? AND categories.CategoryID = ? `,
            [data.UserID, data.CategoryID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE categories INNER JOIN therapists ON categories.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET categories.Status = 0 WHERE centers.UserID = ? AND categories.CategoryID = ? `,
                  [data.UserID, data.CategoryID],
                  (error, therapistsResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.commit((error) => {
                        if (error) {
                          connection.rollback(() => {
                            connection.release();
                            return callBack(error.message);
                          });
                        } else connection.release();
                        if (centersResult.affectedRows >= 1 || therapistsResult.affectedRows >= 1) {
                          return callBack(null, "Category deleted successfully");
                        } else {
                          return callBack("Category not found", null, 404);
                        }
                      });
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.categoryDeleteByCategoryIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE categories INNER JOIN therapists ON categories.Create_By = therapists.UserID SET categories.Status = 0 WHERE categories.CategoryID = ? AND therapists.UserID = ? `,
    [data.CategoryID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Category deleted successfully");
        } else {
          return callBack("Category not found", null, 404);
        }
      }
    }
  );
};

exports.getCategoryByCreate_ByNCategoryId = (data, callBack) => {
  db.query(
    `SELECT * from categories where Create_By = ? AND CategoryID = ? `,
    [data.UserID, data.CategoryID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
