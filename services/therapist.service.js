const db = require("../config/db.config");

exports.therapistList = (callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON centers.CenterID = therapists.CenterID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistListForPublic = (callBack) => {
  db.query(
    `SELECT therapists.UserID, therapists.TherapistID, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistListByClientID = (ClientID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE centers.ClientID = ?`,
    [ClientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistCountByClientID = (ClientID, callBack) => {
  db.query(
    `SELECT COUNT(*) AS TherapistsCount FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE centers.ClientID = ? AND login_users.Status = 1;`,
    [ClientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistListByCenterID = (CenterID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE centers.CenterID = ?`,
    [CenterID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistCountByCenterID = (CenterID, callBack) => {
  db.query(
    `SELECT COUNT(*) AS TherapistsCount FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE centers.CenterID = ? AND login_users.Status = 1;`,
    [CenterID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistDetails = (TherapistID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName , ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON centers.CenterID = therapists.CenterID WHERE therapists.TherapistID = ?`,
    [TherapistID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistDetailsByClientID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE therapists.TherapistID = ? AND centers.ClientID = ?`,
    [data.TherapistID, data.ClientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistDetailsByCenterID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, centers.CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE therapists.TherapistID = ? AND centers.CenterID = ?`,
    [data.TherapistID, data.CenterID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistDetailsByUserID = (UserID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT CenterName FROM centers WHERE centers.CenterID = therapists.CenterID ) AS CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID WHERE therapists.UserID = ? `,
    [UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistDetailsByNUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT CenterName FROM centers WHERE centers.CenterID = therapists.CenterID ) AS CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID WHERE therapists.UserID = ? `,
    // `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT CenterName FROM centers WHERE centers.CenterID = therapists.CenterID ) AS CenterName, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID WHERE therapists.TherapistID = ? AND therapists.UserID = ? `,
    [data.UserID],
    // [data.TherapistID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistSearch = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.DepartmentID = departments.DepartmentID WHERE therapists.Name LIKE '%${data.Name}%' AND therapists.FacilitatorType LIKE '%${data.FacilitatorType}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%' AND departments.DepartmentName LIKE '%${data.DepartmentName}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistSearchForPublic = (data, callBack) => {
  db.query(
    `SELECT therapists.UserID, therapists.TherapistID, therapists.Salutation, therapists.Name, therapists.Designation, therapists.Language, therapists.Photo, therapists.TherapistType, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.DepartmentID = departments.DepartmentID WHERE therapists.Name LIKE '%${data.Name}%' AND therapists.FacilitatorType LIKE '%${data.FacilitatorType}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%' AND departments.DepartmentName LIKE '%${data.DepartmentName}%'; `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistSearchByClientID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.DepartmentID = departments.DepartmentID WHERE therapists.Name LIKE '%${data.Name}%' AND therapists.FacilitatorType LIKE '%${data.FacilitatorType}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%' AND departments.DepartmentName LIKE '%${data.DepartmentName}%' AND centers.ClientID = ${data.ClientID}`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistSearchByCenterID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.District, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, therapists.*, ( SELECT DepartmentName FROM departments WHERE departments.DepartmentID = therapists.DepartmentID ) AS DepartmentName, centers.CenterName FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN departments ON therapists.DepartmentID = departments.DepartmentID WHERE therapists.Name LIKE '%${data.Name}%' AND therapists.FacilitatorType LIKE '%${data.FacilitatorType}%' AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Phone LIKE '%${data.Phone}%' AND departments.DepartmentName LIKE '%${data.DepartmentName}%' AND centers.CenterID = ${data.CenterID}`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.therapistCreate = (data, callBack) => {
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
            `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, District, Pincode, State, Country, RoleId, Password, Create_By ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
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
              4,
              data.Password,
              data.UserID,
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
                  `INSERT INTO therapists ( UserID, CenterID, DepartmentID, Salutation, Name, Designation, Language, Photo, Qualification, Experience, Profile, DocumentsURL, TherapistType, FacilitatorType ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    UserID,
                    data.CenterID,
                    data.DepartmentID,
                    data.Salutation,
                    data.Name,
                    data.Designation,
                    data.Language,
                    data.Photo,
                    data.Qualification,
                    data.Experience,
                    data.Profile,
                    data.DocumentsURL,
                    data.TherapistType,
                    data.FacilitatorType,
                  ],
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
                        if (login_usersResult.affectedRows >= 1 && therapistsResult.affectedRows >= 1) {
                          return callBack(null, "Therapist created successfully");
                        } else {
                          return callBack("Failed to create therapist", null, 500);
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

exports.therapistUpdate = (data, callBack) => {
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
            `SELECT UserID FROM therapists WHERE TherapistID = ?`,
            [data.TherapistID],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else if (!results.length) {
                connection.rollback(() => {
                  connection.release();
                  return callBack("Therapist with provided TherapistID not found", null, 404);
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
                        `UPDATE therapists SET Salutation = ?, Name = ?, Designation = ?, Language = ?, Photo = ?, Qualification = ?, Experience = ?, Profile = ?, DocumentsURL = ?, TherapistType  = ?, DepartmentID = ?, FacilitatorType = ? WHERE TherapistID = ?`,
                        [
                          data.Salutation,
                          data.Name,
                          data.Designation,
                          data.Language,
                          data.Photo,
                          data.Qualification,
                          data.Experience,
                          data.Profile,
                          data.DocumentsURL,
                          data.TherapistType,
                          data.DepartmentID,
                          data.FacilitatorType,
                          data.TherapistID,
                        ],
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
                              if (login_usersResult.affectedRows >= 1 && therapistsResult.affectedRows >= 1) {
                                return callBack(null, "Therapist updated successfully");
                              } else {
                                return callBack("Therapist not found", null, 404);
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

exports.therapistUpdateByClientID = (data, callBack) => {
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
            `SELECT therapists.UserID FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE therapists.TherapistID = ? AND centers.ClientID = ?`,
            [data.TherapistID, data.ClientID],
            (error, results) => {
              if (error) {
                // connection.rollback(() => {
                connection.release();
                return callBack(error.message);
                // });
              } else if (!results.length) {
                // connection.rollback(() => {
                connection.release();
                return callBack("Therapist with provided TherapistID not found", null, 404);
                // });
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
                        `UPDATE therapists SET Salutation = ?, Name = ?, Designation = ?, Language = ?, Photo = ?, Qualification = ?, Experience = ?, Profile = ?, DocumentsURL = ?, TherapistType = ?, FacilitatorType = ?, DepartmentID = ? WHERE TherapistID = ?`,
                        [
                          data.Salutation,
                          data.Name,
                          data.Designation,
                          data.Language,
                          data.Photo,
                          data.Qualification,
                          data.Experience,
                          data.Profile,
                          data.DocumentsURL,
                          data.TherapistType,
                          data.FacilitatorType,
                          data.DepartmentID,
                          data.TherapistID,
                        ],
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
                              if (login_usersResult.affectedRows >= 1 && therapistsResult.affectedRows >= 1) {
                                return callBack(null, "Therapist updated successfully");
                              } else {
                                return callBack("Therapist not found", null, 404);
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

exports.therapistUpdateByCenterID = (data, callBack) => {
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
            `SELECT therapists.UserID FROM login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID WHERE therapists.TherapistID = ? AND centers.CenterID = ?`,
            [data.TherapistID, data.CenterID],
            (error, results) => {
              if (error) {
                // connection.rollback(() => {
                connection.release();
                return callBack(error.message);
                // });
              } else if (!results.length) {
                connection.rollback(() => {
                  connection.release();
                  return callBack("Therapist with provided TherapistID not found", null, 404);
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
                        `UPDATE therapists SET Salutation = ?, Name = ?, Designation = ?, Language = ?, Photo = ?, Qualification = ?, Experience = ?, Profile = ?, DocumentsURL = ?, TherapistType  = ?, DepartmentID = ?, FacilitatorType = ? WHERE TherapistID = ?`,
                        [
                          data.Salutation,
                          data.Name,
                          data.Designation,
                          data.Language,
                          data.Photo,
                          data.Qualification,
                          data.Experience,
                          data.Profile,
                          data.DocumentsURL,
                          data.TherapistType,
                          data.DepartmentID,
                          data.FacilitatorType,
                          data.TherapistID,
                        ],
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
                              if (login_usersResult.affectedRows >= 1 && therapistsResult.affectedRows >= 1) {
                                return callBack(null, "Therapist updated successfully");
                              } else {
                                return callBack("Therapist not found", null, 404);
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

exports.therapistUpdateByUserID = (data, callBack) => {
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
                  `UPDATE therapists SET Salutation = ?, Name = ?, Designation = ?, Language = ?, Photo = ?, Qualification = ?, Experience = ?, Profile = ?, DocumentsURL = ?, TherapistType  = ?, DepartmentID = ?, FacilitatorType = ? WHERE UserID = ?`,
                  [
                    data.Salutation,
                    data.Name,
                    data.Designation,
                    data.Language,
                    data.Photo,
                    data.Qualification,
                    data.Experience,
                    data.Profile,
                    data.DocumentsURL,
                    data.TherapistType,
                    data.UserID,
                    data.DepartmentID,
                    data.FacilitatorType,
                  ],
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
                        if (login_usersResult.affectedRows >= 1 || therapistsResult.affectedRows >= 1) {
                          return callBack(null, "Therapist updated successfully");
                        } else {
                          return callBack("Therapist not updated", null, 400);
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

exports.therapistDelete = (TherapistID, callBack) => {
  db.query(
    `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID SET login_users.Status = 0 WHERE therapists.TherapistID = ? `,
    [TherapistID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Therapist deleted successfully");
        } else {
          return callBack("Therapist not found", null, 404);
        }
      }
    }
  );
};

exports.therapistDeleteByTherapistIDNClientID = (data, callBack) => {
  db.query(
    `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET login_users.Status = 0 WHERE therapists.TherapistID = ? AND centers.ClientID = ? `,
    [data.TherapistID, data.ClientID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Therapist deleted successfully");
        } else {
          return callBack("Therapist not found", null, 404);
        }
      }
    }
  );
};

exports.therapistDeleteByTherapistIDNCenterID = (data, callBack) => {
  db.query(
    `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON centers.CenterID = therapists.CenterID SET login_users.Status = 0 WHERE therapists.TherapistID = ? AND centers.CenterID = ? `,
    [data.TherapistID, data.CenterID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Therapist deleted successfully");
        } else {
          return callBack("Therapist not found", null, 404);
        }
      }
    }
  );
};
