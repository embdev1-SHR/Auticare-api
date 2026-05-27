const db = require("../config/db.config");
const dbAwait = require("../config/dbAwait.config");
const { arrayToNumberPair } = require("../helpers/arrayFunctions");

exports.therapyList = (callBack) => {
  db.query(`SELECT * FROM therapy_methods WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.therapyGoalsList = (callBack) => {
  db.query(
    `SELECT therapy_goals.GoalID, therapy_goals.TherapyID, therapy_goals.GoalName FROM therapy_methods INNER JOIN therapy_goals ON therapy_goals.TherapyID = therapy_methods.TherapyID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyGoalsListByTherapies = (Therapies, callBack) => {
  db.query(
    `SELECT therapy_goals.GoalID, therapy_goals.TherapyID, therapy_goals.GoalName FROM therapy_methods INNER JOIN therapy_goals ON therapy_goals.TherapyID = therapy_methods.TherapyID WHERE therapy_methods.TherapyID IN (${Therapies})`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySkillList = (callBack) => {
  db.query(
    `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, skills.SkillName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySkillListByTherapies = (Therapies, callBack) => {
  db.query(
    `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, skills.SkillName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID WHERE therapy_methods.TherapyID IN (${Therapies})`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE clients.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE clients.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE clients.UserID = ? AND therapy_methods.Status = 1 UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyDetails = (TherapyID, callBack) => {
  db.query(`SELECT * FROM therapy_methods WHERE TherapyID = ? AND Status = 1`, [TherapyID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.therapyDetailsByTherapyIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyID = ?;`,
    [
      data.UserID,
      data.TherapyID,
      data.UserID,
      data.TherapyID,
      data.UserID,
      data.TherapyID,
      data.UserID,
      data.TherapyID,
      data.TherapyID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyDetailsByTherapyIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyID = ?;`,
    [data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.TherapyID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyDetailsByTherapyIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE therapists.UserID = ? AND therapy_methods.Status = 1 AND therapy_methods.TherapyID = ? UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyID = ?;`,
    [data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.UserID, data.TherapyID, data.TherapyID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySearch = (data, callBack) => {
  db.query(
    `SELECT * FROM therapy_methods WHERE TherapyName LIKE '%${data.TherapyName}%' AND Status = 1`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySearchByTherapyNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyName LIKE '%${data.TherapyName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySearchByTherapyNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyName LIKE '%${data.TherapyName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapySearchByTherapyNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON clients.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON centers.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT therapy_methods.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN therapy_methods ON therapists.UserID = therapy_methods.Create_By WHERE centers.UserID = ${data.UserID} AND therapy_methods.Status = 1 AND therapy_methods.TherapyName LIKE '%${data.TherapyName}%' UNION SELECT * FROM therapy_methods WHERE TherapyType = "Default" AND Status = 1 AND TherapyName LIKE '%${data.TherapyName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapyCreate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const therapyResult = await connection.awaitQuery(
      `INSERT INTO therapy_methods ( TherapyName, AgeGroup, TherapyType, Create_By ) VALUES ( ?, ?, ?, ? )`,
      [data.TherapyName, data.AgeGroup, data.TherapyType, data.UserID]
    );
    const TherapyID = therapyResult?.insertId;
    const goalList = [];
    const goals = data?.Goals;
    if (goals?.length) {
      for (let index = 0; index < goals.length; index++) {
        const element = goals[index];
        goalList.push([TherapyID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO therapy_goals ( TherapyID, GoalName, Create_By ) VALUES ?`, [goalList]);
    }
    const skillIDList = [];
    const skillIDs = data?.SkillIDs;
    if (skillIDs?.length) {
      for (let index = 0; index < skillIDs.length; index++) {
        const element = skillIDs[index];
        skillIDList.push([TherapyID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO therapy_skill_mappings ( TherapyID, SkillID, Create_By ) VALUES ?`, [
        skillIDList,
      ]);
    }
    await connection.awaitCommit();
    await connection.release();
    if (therapyResult.affectedRows >= 1) {
      return callBack(null, "Therapy created successfully");
    } else {
      return callBack("Failed to create therapy", null, 500);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.therapyUpdate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const skillResult = await connection.awaitQuery(
      `UPDATE therapy_methods SET TherapyName = ?, AgeGroup = ?, Status = ?, Update_By = ? WHERE TherapyID = ? `,
      [data.TherapyName, data.AgeGroup, data.Status, data.UserID, data.TherapyID]
    );
    const TherapyID = data.TherapyID;
    await GoalUpdates(data, TherapyID, connection);
    await SkillIDUpdates(data, TherapyID, connection);
    await connection.awaitCommit();
    await connection.release();
    if (skillResult.affectedRows >= 1) {
      return callBack(null, "Therapy updated successfully");
    } else {
      return callBack("Therapy not found", null, 404);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.therapyUpdateByCreate_By = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const skillResult = await connection.awaitQuery(
      `UPDATE therapy_methods SET TherapyName = ?, AgeGroup = ?, Status = ?, Update_By = ? WHERE TherapyID = ? AND Create_By = ? `,
      [data.TherapyName, data.AgeGroup, data.Status, data.UserID, data.TherapyID, data.UserID]
    );
    const TherapyID = data.TherapyID;
    await GoalUpdates(data, TherapyID, connection);
    await SkillIDUpdates(data, TherapyID, connection);
    await connection.awaitCommit();
    await connection.release();
    if (skillResult.affectedRows >= 1) {
      return callBack(null, "Therapy updated successfully");
    } else {
      return callBack("Therapy not found", null, 404);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.therapyDelete = (TherapyID, callBack) => {
  db.query(`UPDATE therapy_methods SET Status = 0 WHERE TherapyID = ? `, [TherapyID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Therapy deleted successfully");
    } else {
      return callBack("Therapy not found", null, 404);
    }
  });
};

exports.therapyDeleteByTherapyIDNClientUserID = (data, callBack) => {
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
            `UPDATE therapy_methods INNER JOIN clients ON therapy_methods.Create_By = clients.UserID SET therapy_methods.Status = 0 WHERE clients.UserID = ? AND therapy_methods.TherapyID = ? `,
            [data.UserID, data.TherapyID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE therapy_methods INNER JOIN centers ON therapy_methods.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET therapy_methods.Status = 0 WHERE clients.UserID = ? AND therapy_methods.TherapyID = ? `,
                  [data.UserID, data.TherapyID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE therapy_methods INNER JOIN therapists ON therapy_methods.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET therapy_methods.Status = 0 WHERE clients.UserID = ? AND therapy_methods.TherapyID = ? `,
                        [data.UserID, data.TherapyID],
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
                                return callBack(null, "Therapy deleted successfully");
                              } else {
                                return callBack("Therapy not found", null, 404);
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

exports.therapyDeleteByTherapyIDNCenterUserID = (data, callBack) => {
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
            `UPDATE therapy_methods INNER JOIN centers ON therapy_methods.Create_By = centers.UserID SET therapy_methods.Status = 0 WHERE centers.UserID = ? AND therapy_methods.TherapyID = ? `,
            [data.UserID, data.TherapyID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE therapy_methods INNER JOIN therapists ON therapy_methods.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET therapy_methods.Status = 0 WHERE centers.UserID = ? AND therapy_methods.TherapyID = ? `,
                  [data.UserID, data.TherapyID],
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
                          return callBack(null, "Therapy deleted successfully");
                        } else {
                          return callBack("Therapy not found", null, 404);
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

exports.therapyDeleteByTherapyIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE therapy_methods INNER JOIN therapists ON therapy_methods.Create_By = therapists.UserID SET therapy_methods.Status = 0 WHERE therapy_methods.TherapyID = ? AND therapists.UserID = ? `,
    [data.TherapyID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Therapy deleted successfully");
        } else {
          return callBack("Therapy not found", null, 404);
        }
      }
    }
  );
};

exports.getTherapyByCreate_ByNTherapyId = (data, callBack) => {
  db.query(
    `SELECT * from therapy_methods where Create_By = ? AND TherapyID = ? `,
    [data.UserID, data.TherapyID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

async function GoalUpdates(data, TherapyID, connection) {
  const goalList = [];
  const goals = data?.AddGoals;
  if (goals?.length) {
    for (let index = 0; index < goals.length; index++) {
      const element = goals[index];
      goalList.push([TherapyID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO therapy_goals ( TherapyID, GoalName, Create_By ) VALUES ?`, [goalList]);
  }
  if (data?.RemoveGoalIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM therapy_goals WHERE (GoalID, TherapyID) IN (${arrayToNumberPair(data?.RemoveGoalIDs, TherapyID)})`
    );
  }
}

async function SkillIDUpdates(data, TherapyID, connection) {
  const skillIDList = [];
  const skillIDs = data?.AddSkillIDs;
  if (skillIDs?.length) {
    for (let index = 0; index < skillIDs.length; index++) {
      const element = skillIDs[index];
      skillIDList.push([TherapyID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO therapy_skill_mappings ( TherapyID, SkillID, Create_By ) VALUES ?`, [
      skillIDList,
    ]);
  }
  if (data?.RemoveSkillIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM therapy_skill_mappings WHERE (SkillID, TherapyID) IN (${arrayToNumberPair(
        data?.RemoveSkillIDs,
        TherapyID
      )})`
    );
  }
}
