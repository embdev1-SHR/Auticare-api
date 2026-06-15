const db = require("../config/db.config");

exports.centerList = (callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID WHERE login_users.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID WHERE clients.UserID = ? AND login_users.Status = 1;`,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerDetails = (CenterID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID WHERE centers.CenterID = ? AND login_users.Status = 1;`,
    [CenterID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerDetailsByClientUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID WHERE clients.UserID = ? AND centers.CenterID = ? AND login_users.Status = 1;`,
    [data.UserID, data.CenterID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerDetailsByCenterUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID AND centers.UserID = ? AND login_users.Status = 1;`,
    // `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID AND centers.CenterID = ? AND centers.UserID = ? `,
    [data.UserID],
    // [data.CenterID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerSearch = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID AND centers.CenterName LIKE '%${data.CenterName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerSearchByClientUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, centers.CenterID, centers.UserID, centers.ClientID, centers.CenterName, centers.CenterType, centers.CenterHeadSalutation, centers.CenterHeadName, centers.CenterHeadDesignation, centers.CenterHeadEmailId, centers.CenterHeadPhone, clients.ClientName FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID WHERE centers.CenterName LIKE '%${data.CenterName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND clients.UserID = ${data.UserID} AND login_users.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.centerCreate = (data, callBack) => {
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
            `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Password, Create_By, Status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
            [
              data.EmailId,
              data.UserName,
              data.Phone,
              data.AddressLine1,
              data.AddressLine2,
              data.City,
              data.District,
              data.Pincode,
              data.State,
              data.Country,
              3,
              data.Password,
              data.UserID,
              data.Status !== undefined ? data.Status : 1,
            ],
            (error, login_usersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else {
                const UserID = login_usersResult?.insertId;
                connection.query(
                  `INSERT INTO centers ( UserID, ClientID, CenterName, CenterType, CenterHeadSalutation, CenterHeadName, CenterHeadDesignation, CenterHeadEmailId, CenterHeadPhone ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    UserID,
                    data.ClientID,
                    data.CenterName,
                    data.CenterType,
                    data.CenterHeadSalutation,
                    data.CenterHeadName,
                    data.CenterHeadDesignation,
                    data.CenterHeadEmailId,
                    data.CenterHeadPhone,
                  ],
                  (error, centersResult) => {
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
                        if (login_usersResult.affectedRows >= 1 && centersResult.affectedRows >= 1) {
                          return callBack(null, "Center created successfully");
                        } else {
                          return callBack("Center not found", null, 404);
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

exports.centerCreateFromPending = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.query(
      `SELECT lu.UserID, lu.EmailId, lu.UserName, lu.Phone, c.CenterName, c.ClientID
       FROM login_users lu
       LEFT JOIN centers c ON lu.UserID = c.UserID
       WHERE lu.UserID = ? AND lu.Status = 0 AND lu.RoleId = 3`,
      [data.UserID],
      (error, rows) => {
        if (error) { connection.release(); return callBack(error.message); }
        if (!rows.length) { connection.release(); return callBack("Pending center not found or already approved"); }
        const pending = rows[0];
        const centerName = pending.CenterName || pending.UserName || pending.EmailId;
        const hasCentersRow = !!pending.CenterName;
        connection.query(
          `UPDATE login_users SET Status = 1 WHERE UserID = ? AND Status = 0 AND RoleId = 3`,
          [pending.UserID],
          (error) => {
            if (error) { connection.release(); return callBack(error.message); }
            if (hasCentersRow) {
              connection.release();
              return callBack(null, "Center approved successfully", { EmailId: pending.EmailId, CenterName: centerName });
            }
            const clientID = data.ClientID || pending.ClientID;
            if (!clientID) { connection.release(); return callBack("ClientID required for legacy center approval"); }
            connection.query(
              `INSERT INTO centers (UserID, ClientID, CenterName, CenterType, CenterHeadSalutation, CenterHeadName, CenterHeadDesignation, CenterHeadEmailId, CenterHeadPhone)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [pending.UserID, clientID, centerName, 'Association', '', centerName, 'Director', pending.EmailId, pending.Phone || ''],
              (error) => {
                connection.release();
                if (error) return callBack(error.message);
                return callBack(null, "Center approved successfully", { EmailId: pending.EmailId, CenterName: centerName });
              }
            );
          }
        );
      }
    );
  });
};

exports.rejectPendingCenter = (UserID, callBack) => {
  db.query(
    `SELECT lu.EmailId, lu.UserName, c.CenterName FROM login_users lu LEFT JOIN centers c ON lu.UserID = c.UserID WHERE lu.UserID = ? AND lu.Status = 0 AND lu.RoleId = 3`,
    [UserID],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Pending center not found");
      const pending = rows[0];
      const centerName = pending.CenterName || pending.UserName;
      db.query(`DELETE FROM centers WHERE UserID = ?`, [UserID], (error) => {
        if (error) return callBack(error.message);
        db.query(
          `DELETE FROM login_users WHERE UserID = ? AND Status = 0 AND RoleId = 3`,
          [UserID],
          (error, results) => {
            if (error) return callBack(error.message);
            if (results.affectedRows >= 1) return callBack(null, "Center registration rejected", { EmailId: pending.EmailId, CenterName: centerName });
            return callBack("Pending center not found");
          }
        );
      });
    }
  );
};

exports.centerUpdate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(`SELECT UserID FROM centers WHERE CenterID = ?`, [data.CenterID], (error, results) => {
            if (error) {
              connection.rollback(() => {
                connection.release();
                return callBack(error.message);
              });
            } else if (!results.length) {
              connection.rollback(() => {
                connection.release();
                return callBack("Center with provided CenterID not found", null, 404);
              });
            } else {
              connection.query(
                `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, District = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
                [
                  data.Phone,
                  data.AddressLine1,
                  data.AddressLine2,
                  data.City,
                  data.District,
                  data.Pincode,
                  data.State,
                  data.Country,
                  data.Status,
                  data.UserID,
                  results[0]?.UserID,
                ],
                (error, login_usersResult) => {
                  if (error) {
                    connection.rollback(() => {
                      connection.release();
                      return callBack(error.message);
                    });
                  } else
                    connection.query(
                      `UPDATE centers SET CenterName = ?, CenterType = ?, CenterHeadSalutation = ?, CenterHeadName = ?, CenterHeadDesignation = ?, CenterHeadEmailId = ?, CenterHeadPhone = ? WHERE CenterID = ?`,
                      [
                        data.CenterName,
                        data.CenterType,
                        data.CenterHeadSalutation,
                        data.CenterHeadName,
                        data.CenterHeadDesignation,
                        data.CenterHeadEmailId,
                        data.CenterHeadPhone,
                        data.CenterID,
                      ],
                      (error, centersResult) => {
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
                            if (login_usersResult.affectedRows >= 1 && centersResult.affectedRows >= 1) {
                              return callBack(null, "Center updated successfully");
                            } else {
                              return callBack("Center not found", null, 404);
                            }
                          });
                      }
                    );
                }
              );
            }
          });
      });
    /* End transaction */
  });
};

exports.centerUpdateByClientID = (data, callBack) => {
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
            `SELECT UserID FROM centers WHERE CenterID = ? AND ClientID = ?`,
            [data.CenterID, data.ClientID],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else if (!results.length) {
                connection.rollback(() => {
                  connection.release();
                  return callBack("Center with provided CenterID not found", null, 404);
                });
              } else {
                connection.query(
                  `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, District = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
                  [
                    data.Phone,
                    data.AddressLine1,
                    data.AddressLine2,
                    data.City,
                    data.District,
                    data.Pincode,
                    data.State,
                    data.Country,
                    data.Status,
                    data.UserID,
                    results[0].UserID,
                  ],
                  (error, login_usersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE centers SET CenterName = ?, CenterType = ?, CenterHeadSalutation = ?, CenterHeadName = ?, CenterHeadDesignation = ?, CenterHeadEmailId = ?, CenterHeadPhone = ? WHERE ClientID = ? AND CenterID = ?`,
                        [
                          data.CenterName,
                          data.CenterType,
                          data.CenterHeadSalutation,
                          data.CenterHeadName,
                          data.CenterHeadDesignation,
                          data.CenterHeadEmailId,
                          data.CenterHeadPhone,
                          data.ClientID,
                          data.CenterID,
                        ],
                        (error, centersResult) => {
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
                              if (login_usersResult.affectedRows >= 1 && centersResult.affectedRows >= 1) {
                                return callBack(null, "Center updated successfully");
                              } else {
                                return callBack("Center not found", null, 404);
                              }
                            });
                        }
                      );
                  }
                );
              }
            }
          );
      });
    /* End transaction */
  });
};

exports.centerUpdateByUserID = (data, callBack) => {
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
            `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, District = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
            [
              data.Phone,
              data.AddressLine1,
              data.AddressLine2,
              data.City,
              data.District,
              data.Pincode,
              data.State,
              data.Country,
              data.Status,
              data.UserID,
              data.UserID,
            ],
            (error, login_usersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE centers SET CenterName = ?, CenterType = ?, CenterHeadSalutation = ?, CenterHeadName = ?, CenterHeadDesignation = ?, CenterHeadEmailId = ?, CenterHeadPhone = ? WHERE UserID = ?`,
                  [
                    data.CenterName,
                    data.CenterType,
                    data.CenterHeadSalutation,
                    data.CenterHeadName,
                    data.CenterHeadDesignation,
                    data.CenterHeadEmailId,
                    data.CenterHeadPhone,
                    data.UserID,
                  ],
                  (error, centersResult) => {
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
                        if (login_usersResult.affectedRows >= 1 && centersResult.affectedRows >= 1) {
                          return callBack(null, "Center updated successfully");
                        } else {
                          return callBack("Center not found", null, 404);
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

exports.centerDelete = (CenterID, callBack) => {
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
            `UPDATE login_users INNER JOIN centers ON login_users.UserID = centers.UserID SET login_users.Status = 0 WHERE centers.CenterID = ? `,
            [CenterID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET login_users.Status = 0 WHERE centers.CenterID = ? `,
                  [CenterID],
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
                          return callBack(null, "Center deleted successfully");
                        } else {
                          return callBack("Center not found", null, 404);
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

exports.centerDeleteByClientId = (data, callBack) => {
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
            `UPDATE login_users INNER JOIN centers ON login_users.UserID = centers.UserID SET login_users.Status = 0 WHERE centers.CenterID = ? AND centers.ClientID = ? `,
            [data.CenterID, data.ClientID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET login_users.Status = 0 WHERE centers.CenterID = ? AND centers.ClientID = ? `,
                  [data.CenterID, data.ClientID],
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
                          return callBack(null, "Center deleted successfully");
                        } else {
                          return callBack("Center not found", null, 404);
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

exports.getCenterByCenterID = (CenterID, callBack) => {
  db.query(`SELECT * FROM centers WHERE CenterID = ? `, [CenterID], (error, results) => {
    if (error) {
      callBack(error.message);
    } else return callBack(null, results);
  });
};
exports.getCenterByCenterIDNClientUserId = (data, callBack) => {
  db.query(
    `SELECT centers.CenterID FROM login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON centers.ClientID = clients.ClientID WHERE clients.UserID = ? AND centers.CenterID = ?`,
    [data.UserID, data.CenterID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getCenterByUserId = (UserID, callBack) => {
  db.query(`SELECT * from centers where UserID = ?`, [UserID], (error, results) => {
    if (error) {
      callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.getCenterByCenterIDNCenterUserId = (data, callBack) => {
  db.query(
    `SELECT * from centers where UserID = ? AND CenterID = ?`,
    [data.UserID, data.CenterID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
