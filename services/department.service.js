const db = require("../config/db.config");

exports.departmentList = (callBack) => {
  db.query(`SELECT * FROM departments WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.departmentListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN departments ON clients.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM centers INNER JOIN departments ON centers.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentDetails = (DepartmentID, callBack) => {
  db.query(`SELECT * FROM departments WHERE DepartmentID = ? AND Status = 1`, [DepartmentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.departmentDetailsByDepartmentIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN departments ON clients.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE clients.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentID = ?;`,
    [data.UserID, data.DepartmentID, data.UserID, data.DepartmentID, data.UserID, data.DepartmentID, data.DepartmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentDetailsByDepartmentIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM centers INNER JOIN departments ON centers.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE centers.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentID = ?;`,
    [data.UserID, data.DepartmentID, data.UserID, data.DepartmentID, data.UserID, data.DepartmentID, data.DepartmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentDetailsByDepartmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE therapists.UserID = ? AND departments.Status = 1 AND departments.DepartmentID = ? UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentID = ?;`,
    [data.UserID, data.DepartmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentSearch = (data, callBack) => {
  db.query(`SELECT * FROM departments WHERE DepartmentName LIKE '%${data.DepartmentName}%' AND Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.departmentSearchByDepartmentNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN departments ON clients.UserID = departments.Create_By WHERE clients.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE clients.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE clients.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentName LIKE '%${data.DepartmentName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentSearchByDepartmentNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE centers.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM centers INNER JOIN departments ON centers.UserID = departments.Create_By WHERE centers.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE centers.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentName LIKE '%${data.DepartmentName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentSearchByDepartmentNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON clients.UserID = departments.Create_By WHERE therapists.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON centers.UserID = departments.Create_By WHERE therapists.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT departments.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.UserID = departments.Create_By WHERE therapists.UserID = ${data.UserID} AND departments.Status = 1 AND departments.DepartmentName LIKE '%${data.DepartmentName}%' UNION SELECT * FROM departments WHERE DepartmentType = "Default" AND Status = 1 AND DepartmentName LIKE '%${data.DepartmentName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.departmentCreate = (data, callBack) => {
  db.query(
    `INSERT INTO departments ( DepartmentName, DepartmentHeadName, DepartmentHeadDesignation, DepartmentHeadQualification, DepartmentHeadEmailId, DepartmentHeadPhone, DepartmentType, Create_By ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.DepartmentName,
      data.DepartmentHeadName,
      data.DepartmentHeadDesignation,
      data.DepartmentHeadQualification,
      data.DepartmentHeadEmailId,
      data.DepartmentHeadPhone,
      data.DepartmentType,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Department created successfully");
      } else {
        return callBack("Failed to create department", null, 500);
      }
    }
  );
};

exports.departmentUpdate = (data, callBack) => {
  db.query(
    `UPDATE departments SET DepartmentName = ?, DepartmentHeadQualification = ?, DepartmentHeadName = ?, DepartmentHeadDesignation = ?, DepartmentHeadEmailId = ?, DepartmentHeadPhone = ?, Status = ?, Update_By = ? WHERE DepartmentID = ?`,
    [
      data.DepartmentName,
      data.DepartmentHeadQualification,
      data.DepartmentHeadName,
      data.DepartmentHeadDesignation,
      data.DepartmentHeadEmailId,
      data.DepartmentHeadPhone,
      data.Status,
      data.UserID,
      data.DepartmentID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Department updated successfully");
      } else {
        return callBack("Department not found", null, 404);
      }
    }
  );
};

exports.departmentUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE departments SET DepartmentName = ?, DepartmentHeadQualification = ?, DepartmentHeadName = ?, DepartmentHeadDesignation = ?, DepartmentHeadEmailId = ?, DepartmentHeadPhone = ?, Status = ?, Update_By = ? WHERE DepartmentID = ? AND Create_By = ? `,
    [
      data.DepartmentName,
      data.DepartmentHeadQualification,
      data.DepartmentHeadName,
      data.DepartmentHeadDesignation,
      data.DepartmentHeadEmailId,
      data.DepartmentHeadPhone,
      data.Status,
      data.UserID,
      data.DepartmentID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Department updated successfully");
      } else {
        return callBack("Department not found", null, 404);
      }
    }
  );
};

exports.departmentDelete = (DepartmentID, callBack) => {
  db.query(`UPDATE departments SET Status = 0 WHERE DepartmentID = ? `, [DepartmentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Department deleted successfully");
    } else {
      return callBack("Department not found", null, 404);
    }
  });
};

exports.departmentDeleteByDepartmentIDNClientUserID = (data, callBack) => {
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
            `UPDATE departments INNER JOIN clients ON departments.Create_By = clients.UserID SET departments.Status = 0 WHERE clients.UserID = ? AND departments.DepartmentID = ? `,
            [data.UserID, data.DepartmentID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE departments INNER JOIN centers ON departments.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET departments.Status = 0 WHERE clients.UserID = ? AND departments.DepartmentID = ? `,
                  [data.UserID, data.DepartmentID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE departments INNER JOIN therapists ON departments.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET departments.Status = 0 WHERE clients.UserID = ? AND departments.DepartmentID = ? `,
                        [data.UserID, data.DepartmentID],
                        (error, therapistsResult) => {
                          if (error) {
                            connection.rollback(() => {
                              connection.release();
                              return callBack(error.message);
                            });
                          } else
                            connection.commit((error, results) => {
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
                                return callBack(null, "Department deleted successfully");
                              } else {
                                return callBack("Department not found", null, 404);
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

exports.departmentDeleteByDepartmentIDNCenterUserID = (data, callBack) => {
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
            `UPDATE departments INNER JOIN centers ON departments.Create_By = centers.UserID SET departments.Status = 0 WHERE centers.UserID = ? AND departments.DepartmentID = ? `,
            [data.UserID, data.DepartmentID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE departments INNER JOIN therapists ON departments.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET departments.Status = 0 WHERE centers.UserID = ? AND departments.DepartmentID = ? `,
                  [data.UserID, data.DepartmentID],
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
                          return callBack(null, "Department deleted successfully");
                        } else {
                          return callBack("Department not found", null, 404);
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

exports.departmentDeleteByDepartmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE departments INNER JOIN therapists ON departments.Create_By = therapists.UserID SET departments.Status = 0 WHERE departments.DepartmentID = ? AND therapists.UserID = ? `,
    [data.DepartmentID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Department deleted successfully");
        } else {
          return callBack("Department not found", null, 404);
        }
      }
    }
  );
};

exports.getDepartmentByCreate_ByNDepartmentId = (data, callBack) => {
  db.query(
    `SELECT * from departments where Create_By = ? AND DepartmentID = ? `,
    [data.UserID, data.DepartmentID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
