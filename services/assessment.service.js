const db = require("../config/db.config");

exports.assessmentList = (callBack) => {
  db.query(`SELECT * FROM assessments`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.assessmentListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT assessments.* FROM clients INNER JOIN assessments ON clients.UserID = assessments.Create_By WHERE clients.UserID = ? UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE clients.UserID = ? UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE clients.UserID = ?`,
    [UserID, UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT assessments.* FROM centers INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE centers.UserID = ? UNION SELECT assessments.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE centers.UserID = ? `,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT assessments.* FROM therapists INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE therapists.UserID = ? `,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentDetails = (AssessmentID, callBack) => {
  db.query(`SELECT * FROM assessments WHERE AssessmentID = ?`, [AssessmentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.assessmentDetailsByAssessmentIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM clients INNER JOIN assessments ON clients.UserID = assessments.Create_By WHERE clients.UserID = ? AND assessments.AssessmentID = ? UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE clients.UserID = ? AND assessments.AssessmentID = ? UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE clients.UserID = ? AND assessments.AssessmentID = ?`,
    [
      data.UserID,
      data.AssessmentID,
      data.UserID,
      data.AssessmentID,
      data.UserID,
      data.AssessmentID,
      data.UserID,
      data.AssessmentID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentDetailsByAssessmentIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM centers INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE centers.UserID = ? AND assessments.AssessmentID = ? UNION SELECT assessments.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE centers.UserID = ? AND assessments.AssessmentID = ? `,
    [data.UserID, data.AssessmentID, data.UserID, data.AssessmentID, data.UserID, data.AssessmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentDetailsByAssessmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM therapists INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE therapists.UserID = ? AND assessments.AssessmentID = ?`,
    [data.UserID, data.AssessmentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentSearch = (data, callBack) => {
  db.query(`SELECT * FROM assessments WHERE AssessmentName LIKE '%${data.AssessmentName}%' `, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.assessmentSearchByAssessmentNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM clients INNER JOIN assessments ON clients.UserID = assessments.Create_By WHERE clients.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE clients.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' UNION SELECT assessments.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE clients.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentSearchByAssessmentNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM centers INNER JOIN assessments ON centers.UserID = assessments.Create_By WHERE centers.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' UNION SELECT assessments.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE centers.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentSearchByAssessmentNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT assessments.* FROM therapists INNER JOIN assessments ON therapists.UserID = assessments.Create_By WHERE therapists.UserID = ${data.UserID} AND AssessmentName LIKE '%${data.AssessmentName}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.assessmentCreate = (data, callBack) => {
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
            `INSERT INTO assessments ( AssessmentName, Accreditation, AssessmentCategory, ScaleID, SkillID, Create_By ) VALUES ( ?, ?, ?, ?, ?, ? )`,
            [data.AssessmentName, data.Accreditation, data.AssessmentCategory, data.ScaleID, data.SkillID, data.UserID],
            (error, assessmentResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const AssessmentID = assessmentResult?.insertId;
                const assessment_region_mappingsArray = [];
                const array = data.RegionIDs;
                for (let index = 0; index < array.length; index++) {
                  const element = array[index];
                  assessment_region_mappingsArray.push([AssessmentID, element, data.UserID]);
                }
                connection.query(
                  `INSERT INTO assessment_region_mappings ( AssessmentID, RegionID, Create_By ) VALUES ?`,
                  [assessment_region_mappingsArray],
                  (error, assessment_region_mappingsResult) => {
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
                        if (assessmentResult.affectedRows >= 1 && assessment_region_mappingsResult.affectedRows >= 1) {
                          return callBack(null, "Assessment created successfully");
                        } else {
                          return callBack("Failed to create assessment", null, 500);
                        }
                      });
                  }
                );
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.assessmentUpdate = (data, callBack) => {
  db.query(
    `UPDATE assessments SET AssessmentName = ?, Accreditation = ?, AssessmentCategory = ?, ScaleID = ?, SkillID = ?, Status = ?, Update_By = ? WHERE AssessmentID = ? `,
    [
      data.AssessmentName,
      data.Accreditation,
      data.AssessmentCategory,
      data.ScaleID,
      data.SkillID,
      data.Status ? 1 : 0,
      data.UserID,
      data.AssessmentID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Assessment updated successfully");
      } else {
        return callBack("Assessment not found", null, 404);
      }
    }
  );
};

exports.assessmentUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE assessments SET AssessmentName = ?, Accreditation = ?, AssessmentCategory = ?, ScaleID = ?, SkillID = ?, Status = ?, Update_By = ? WHERE AssessmentID = ? AND Create_By = ? `,
    [
      data.AssessmentName,
      data.Accreditation,
      data.AssessmentCategory,
      data.ScaleID,
      data.SkillID,
      data.Status,
      data.UserID,
      data.AssessmentID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Assessment updated successfully");
      } else {
        return callBack("Assessment not found", null, 404);
      }
    }
  );
};

exports.assessmentDelete = (AssessmentID, callBack) => {
  db.query(`UPDATE assessments SET Status = 0 WHERE AssessmentID = ? `, [AssessmentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Assessment deleted successfully");
    } else {
      return callBack("Assessment not found", null, 404);
    }
  });
};

exports.assessmentDeleteByAssessmentIDNClientUserID = (data, callBack) => {
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
            `UPDATE assessments INNER JOIN clients ON assessments.Create_By = clients.UserID SET assessments.Status = 0 WHERE clients.UserID = ? AND assessments.AssessmentID = ? `,
            [data.UserID, data.AssessmentID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE assessments INNER JOIN centers ON assessments.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET assessments.Status = 0 WHERE clients.UserID = ? AND assessments.AssessmentID = ? `,
                  [data.UserID, data.AssessmentID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE assessments INNER JOIN therapists ON assessments.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET assessments.Status = 0 WHERE clients.UserID = ? AND assessments.AssessmentID = ? `,
                        [data.UserID, data.AssessmentID],
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
                                return callBack(null, "Assessment deleted successfully");
                              } else {
                                return callBack("Assessment not found", null, 404);
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

exports.assessmentDeleteByAssessmentIDNCenterUserID = (data, callBack) => {
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
            `UPDATE assessments INNER JOIN centers ON assessments.Create_By = centers.UserID SET assessments.Status = 0 WHERE centers.UserID = ? AND assessments.AssessmentID = ? `,
            [data.UserID, data.AssessmentID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE assessments INNER JOIN therapists ON assessments.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET assessments.Status = 0 WHERE centers.UserID = ? AND assessments.AssessmentID = ? `,
                  [data.UserID, data.AssessmentID],
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
                          return callBack(null, "Assessment deleted successfully");
                        } else {
                          return callBack("Assessment not found", null, 404);
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

exports.assessmentDeleteByAssessmentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE assessments INNER JOIN therapists ON assessments.Create_By = therapists.UserID SET assessments.Status = 0 WHERE assessments.AssessmentID = ? AND therapists.UserID = ? `,
    [data.AssessmentID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Assessment deleted successfully");
        } else {
          return callBack("Assessment not found", null, 404);
        }
      }
    }
  );
};

exports.getAssessmentByCreate_ByNAssessmentId = (data, callBack) => {
  db.query(
    `SELECT * from assessments where Create_By = ? AND AssessmentID = ? `,
    [data.UserID, data.AssessmentID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
