const db = require("../config/db.config");

exports.goalList = (callBack) => {
  db.query(`SELECT * FROM therapy_goals WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.goalListByTherapyID = (TherapyID, callBack) => {
  db.query(`SELECT * FROM therapy_goals WHERE TherapyID = ? AND Status = 1`, [TherapyID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.goalListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalListByClientUserIDNTherapyID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND TherapyID = ?`,
    [data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.TherapyID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalListByCenterUserIDNTherapyID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND TherapyID = ?;`,
    [data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.TherapyID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalListByTherapistUserIDNTherapyID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.TherapyID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND TherapyID = ?;`,
    [data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.TherapyID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalDetails = (GoalID, callBack) => {
  db.query(`SELECT * FROM therapy_goals WHERE GoalID = ? AND Status = 1`, [GoalID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.goalDetailsByGoalIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE clients.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalID = ?;`,
    [data.UserID, data.GoalID, data.UserID, data.GoalID, data.UserID, data.GoalID, data.GoalID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalDetailsByGoalIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE centers.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalID = ?;`,
    [data.UserID, data.GoalID, data.UserID, data.GoalID, data.UserID, data.GoalID, data.GoalID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalDetailsByGoalIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE therapists.UserID = ? AND therapy_goals.GoalID = ? AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalID = ?;`,
    [data.UserID, data.GoalID, data.UserID, data.GoalID, data.UserID, data.GoalID, data.GoalID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalSearch = (data, callBack) => {
  db.query(`SELECT * FROM therapy_goals WHERE GoalName LIKE '%${data.GoalName}%' AND Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.goalSearchByGoalNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE clients.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE clients.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE clients.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalName LIKE '%${data.GoalName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalSearchByGoalNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalName LIKE '%${data.GoalName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalSearchByGoalNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON clients.UserID = therapy_goals.Create_By WHERE therapists.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON centers.UserID = therapy_goals.Create_By WHERE therapists.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT therapy_goals.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_goals ON therapists.UserID = therapy_goals.Create_By WHERE therapists.UserID = ${data.UserID} AND therapy_goals.GoalName LIKE '%${data.GoalName}%' AND therapy_goals.Status = 1 UNION SELECT * FROM therapy_goals WHERE GoalType = "Default" AND Status = 1 AND GoalName LIKE '%${data.GoalName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.goalCreate = (data, callBack) => {
  db.query(
    `INSERT INTO therapy_goals ( TherapyID, GoalName, GoalType, Create_By ) VALUES ( ?, ?, ?, ? )`,
    [data.TherapyID, data.GoalName, data.GoalType, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Goal created successfully");
      } else {
        return callBack("Failed to create goal", null, 500);
      }
    }
  );
};

exports.goalUpdate = (data, callBack) => {
  db.query(
    `UPDATE therapy_goals SET TherapyID = ?, GoalName = ?, Status = ?, Update_By = ? WHERE GoalID = ? `,
    [data.TherapyID, data.GoalName, data.Status, data.UserID, data.GoalID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Goal updated successfully");
      } else {
        return callBack("Goal not found", null, 404);
      }
    }
  );
};

exports.goalUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE therapy_goals SET TherapyID = ?, GoalName = ?, Status = ?, Update_By = ? WHERE GoalID = ? AND Create_By = ? `,
    [data.TherapyID, data.GoalName, data.Status, data.UserID, data.GoalID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Goal updated successfully");
      } else {
        return callBack("Goal not found", null, 404);
      }
    }
  );
};

exports.goalDelete = (GoalID, callBack) => {
  db.query(`UPDATE therapy_goals SET Status = 0 WHERE GoalID = ? `, [GoalID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Goal deleted successfully");
    } else {
      return callBack("Goal not found", null, 404);
    }
  });
};

exports.goalDeleteByGoalIDNClientUserID = (data, callBack) => {
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
            `UPDATE therapy_goals INNER JOIN clients ON therapy_goals.Create_By = clients.UserID SET therapy_goals.Status = 0 WHERE clients.UserID = ? AND therapy_goals.GoalID = ? `,
            [data.UserID, data.GoalID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE therapy_goals INNER JOIN centers ON therapy_goals.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET therapy_goals.Status = 0 WHERE clients.UserID = ? AND therapy_goals.GoalID = ? `,
                  [data.UserID, data.GoalID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE therapy_goals INNER JOIN therapists ON therapy_goals.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET therapy_goals.Status = 0 WHERE clients.UserID = ? AND therapy_goals.GoalID = ? `,
                        [data.UserID, data.GoalID],
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
                                return callBack(null, "Goal deleted successfully");
                              } else {
                                return callBack("Goal not found", null, 404);
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

exports.goalDeleteByGoalIDNCenterUserID = (data, callBack) => {
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
            `UPDATE therapy_goals INNER JOIN centers ON therapy_goals.Create_By = centers.UserID SET therapy_goals.Status = 0 WHERE centers.UserID = ? AND therapy_goals.GoalID = ? `,
            [data.UserID, data.GoalID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE therapy_goals INNER JOIN therapists ON therapy_goals.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET therapy_goals.Status = 0 WHERE centers.UserID = ? AND therapy_goals.GoalID = ? `,
                  [data.UserID, data.GoalID],
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
                          return callBack(null, "Goal deleted successfully");
                        } else {
                          return callBack("Goal not found", null, 404);
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

exports.goalDeleteByGoalIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE therapy_goals INNER JOIN therapists ON therapy_goals.Create_By = therapists.UserID SET therapy_goals.Status = 0 WHERE therapy_goals.GoalID = ? AND therapists.UserID = ? `,
    [data.GoalID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Goal deleted successfully");
        } else {
          return callBack("Goal not found", null, 404);
        }
      }
    }
  );
};

exports.getGoalByCreate_ByNGoalId = (data, callBack) => {
  db.query(
    `SELECT * from therapy_goals where Create_By = ? AND GoalID = ? `,
    [data.UserID, data.GoalID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
