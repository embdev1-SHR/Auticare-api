const db = require("../config/db.config");
const { addDays } = require("../helpers/date");
const promiseDB = db.promise();

exports.clientList = (callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, ( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID GROUP BY clients.ClientID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.clientListDesc = async () => {
  const [rows] = await promiseDB.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, ( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID GROUP BY clients.ClientID ORDER BY clients.Create_TS DESC LIMIT 5;`
  );
  return rows;
};

exports.clientDetails = (ClientID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, subscription_plans.PlanName, ( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID AND clients.ClientID = ? INNER JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID; `,
    [ClientID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.clientDetailsByUserID = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, subscription_plans.PlanName FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID INNER JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId WHERE clients.UserID = ?`,
    // `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, subscription_plans.PlanName FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID INNER JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId WHERE clients.ClientID = ? AND clients.UserID = ?`,
    [data.UserID],
    // [data.ClientID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.clientSearch = (data, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.* FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID WHERE clients.ClientName LIKE '%${data.ClientName}%' AND login_users.EmailId LIKE '%${data.EmailId}%' `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.clientCreate = (data, callBack) => {
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
            `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, Pincode, State, Country, RoleId, Password, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
            [
              data.EmailId,
              data.UserName,
              data.Phone,
              data.AddressLine1,
              data.AddressLine2,
              data.City,
              data.Pincode,
              data.State,
              data.Country,
              2,
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
                  `INSERT INTO clients ( UserID, ClientName, ClientLogo, WebsiteURL, ClientType, OrganizationType, ContactPersonName, ContactPersonDesignation, ContactEmailId, IncorporationCertificateURL, RegistrationCertificateURL, SubscriptionPlanId, SubscriptionPlanStatus, SubscriptionPlanActivatedDate, SubcriptionPlanEndDate, PaymentId, BillingAddressLine1, BillingAddressLine2, BillingCity, BillingDistrict, BillingPincode, BillingState, BillingCountry, GSTNumber, Bank, BankAccountNumber, Branch, IFSCCode ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
                  [
                    UserID,
                    data.ClientName,
                    data.ClientLogo,
                    data.WebsiteURL,
                    data.ClientType,
                    data.OrganizationType,
                    data.ContactPersonName,
                    data.ContactPersonDesignation,
                    data.ContactEmailId,
                    data.IncorporationCertificateURL,
                    data.RegistrationCertificateURL,
                    data.SubscriptionPlanId,
                    data.SubscriptionPlanStatus,
                    new Date(),
                    new Date(addDays(data.NumberOfPlanActiveDays)),
                    data.PaymentId,
                    data.BillingAddressLine1,
                    data.BillingAddressLine2,
                    data.BillingCity,
                    data.BillingDistrict,
                    data.BillingPincode,
                    data.BillingState,
                    data.BillingCountry,
                    data.GSTNumber,
                    data.Bank,
                    data.BankAccountNumber,
                    data.Branch,
                    data.IFSCCode,
                  ],
                  (error, clientsResult) => {
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
                        if (login_usersResult.affectedRows >= 1 && clientsResult.affectedRows >= 1) {
                          return callBack(null, "Client created successfully");
                        } else {
                          return callBack("Failed to create client", null, 404);
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

exports.clientUpdate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(`SELECT UserID FROM clients WHERE ClientID = ? `, [data.ClientID], (error, results) => {
            if (error) {
              connection.rollback(() => {
                connection.release();
                return callBack(error.message);
              });
            } else
              connection.query(
                `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
                [
                  data.Phone,
                  data.AddressLine1,
                  data.AddressLine2,
                  data.City,
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
                      `UPDATE clients SET ClientName = ?, ClientLogo = ?, WebsiteURL = ?, ClientType = ?, OrganizationType = ?, ContactPersonName = ?, ContactPersonDesignation = ?, ContactEmailId = ?, IncorporationCertificateURL = ?, RegistrationCertificateURL = ?, SubscriptionPlanId = ?, SubscriptionPlanStatus = ?, SubscriptionPlanActivatedDate = CASE WHEN ? IS NOT NULL THEN ? ELSE SubscriptionPlanActivatedDate END, SubcriptionPlanEndDate = CASE WHEN ? IS NOT NULL THEN ? ELSE SubcriptionPlanEndDate END, PaymentId = ?, BillingAddressLine1 = ?, BillingAddressLine2 = ?, BillingCity = ?, BillingDistrict = ?, BillingPincode = ?, BillingState = ?, BillingCountry = ?, GSTNumber = ?, Bank = ?, BankAccountNumber = ?, Branch = ?, IFSCCode = ? WHERE ClientID = ? `,
                      [
                        data.ClientName,
                        data.ClientLogo,
                        data.WebsiteURL,
                        data.ClientType,
                        data.OrganizationType,
                        data.ContactPersonName,
                        data.ContactPersonDesignation,
                        data.ContactEmailId,
                        data.IncorporationCertificateURL,
                        data.RegistrationCertificateURL,
                        data.SubscriptionPlanId,
                        data.SubscriptionPlanStatus,
                        data.SubscriptionPlanActivatedDate,
                        data.SubscriptionPlanActivatedDate,
                        data.SubcriptionPlanEndDate,
                        data.SubcriptionPlanEndDate,
                        data.PaymentId,
                        data.BillingAddressLine1,
                        data.BillingAddressLine2,
                        data.BillingCity,
                        data.BillingDistrict,
                        data.BillingPincode,
                        data.BillingState,
                        data.BillingCountry,
                        data.GSTNumber,
                        data.Bank,
                        data.BankAccountNumber,
                        data.Branch,
                        data.IFSCCode,
                        data.ClientID,
                      ],
                      (error, clientsResult) => {
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
                            if (login_usersResult.affectedRows >= 1 && clientsResult.affectedRows >= 1) {
                              return callBack(null, "Client updated successfully");
                            } else {
                              return callBack("Client not found", null, 404);
                            }
                          });
                      }
                    );
                }
              );
          });
      });
    /* End transaction */
  });
};

exports.activateClientSubscription = (data, callBack) => {
  db.query(
    `UPDATE clients SET SubscriptionPlanStatus = 'Payment Success', SubscriptionPlanActivatedDate = ?, SubcriptionPlanEndDate = ? WHERE ClientID = ?`,
    [data.activatedDate, data.endDate, data.ClientID],
    (error, results) => {
      if (error) return callBack(error.message);
      if (results.affectedRows < 1) return callBack("Client not found", null, 404);
      return callBack(null, "Subscription activated successfully");
    }
  );
};

exports.clientUpdateByUserID = (data, callBack) => {
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
            `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, Pincode = ?, State = ?, Country = ?, Status = ?, Update_By = ? WHERE UserID = ? `,
            [
              data.Phone,
              data.AddressLine1,
              data.AddressLine2,
              data.City,
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
                  `UPDATE clients SET ClientName = ?, ClientLogo = ?, WebsiteURL = ?, ClientType = ?, OrganizationType = ?, ContactPersonName = ?, ContactPersonDesignation = ?, ContactEmailId = ?, IncorporationCertificateURL = ?, RegistrationCertificateURL = ?, SubscriptionPlanId = ?, SubscriptionPlanStatus = ?, SubscriptionPlanActivatedDate = CASE WHEN ? IS NOT NULL THEN ? ELSE SubscriptionPlanActivatedDate END, SubcriptionPlanEndDate = CASE WHEN ? IS NOT NULL THEN ? ELSE SubcriptionPlanEndDate END, PaymentId = ?, BillingAddressLine1 = ?, BillingAddressLine2 = ?, BillingCity = ?, BillingDistrict = ?, BillingPincode = ?, BillingState = ?, BillingCountry = ?, GSTNumber = ?, Bank = ?, BankAccountNumber = ?, Branch = ?, IFSCCode = ? WHERE UserID = ?`,
                  [
                    data.ClientName,
                    data.ClientLogo,
                    data.WebsiteURL,
                    data.ClientType,
                    data.OrganizationType,
                    data.ContactPersonName,
                    data.ContactPersonDesignation,
                    data.ContactEmailId,
                    data.IncorporationCertificateURL,
                    data.RegistrationCertificateURL,
                    data.SubscriptionPlanId,
                    data.SubscriptionPlanStatus,
                    data.SubscriptionPlanActivatedDate,
                    data.SubscriptionPlanActivatedDate,
                    data.SubcriptionPlanEndDate,
                    data.SubcriptionPlanEndDate,
                    data.PaymentId,
                    data.BillingAddressLine1,
                    data.BillingAddressLine2,
                    data.BillingCity,
                    data.BillingDistrict,
                    data.BillingPincode,
                    data.BillingState,
                    data.BillingCountry,
                    data.GSTNumber,
                    data.Bank,
                    data.BankAccountNumber,
                    data.Branch,
                    data.IFSCCode,
                    data.UserID,
                  ],
                  (error, clientsResult) => {
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
                        if (login_usersResult.affectedRows >= 1 && clientsResult.affectedRows >= 1) {
                          return callBack(null, "Client updated successfully");
                        } else {
                          return callBack("Client not found", null, 404);
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

exports.clientDelete = ({ ClientID, Status }, callBack) => {
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
            `UPDATE login_users INNER JOIN clients ON login_users.UserID = clients.UserID SET login_users.Status = ? WHERE clients.ClientID = ?; `,
            [Status, ClientID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.Status = ? WHERE clients.ClientID = ? `,
                  [Status, ClientID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.Status = ? WHERE clients.ClientID = ? `,
                        [Status, ClientID],
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
                                return callBack(
                                  null,
                                  Status ? "Client enabled successfully" : "Client disabled successfully"
                                );
                              } else {
                                return callBack("Client not found", null, 404);
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

exports.clientHardDelete = ({ ClientID }, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.beginTransaction((error) => {
      if (error) return callBack(error.message);
      connection.query(
        `UPDATE login_users INNER JOIN clients ON login_users.UserID = clients.UserID SET login_users.UserName = NULL, login_users.Password = NULL, login_users.Status = 0 WHERE clients.ClientID = ?`,
        [ClientID],
        (error) => {
          if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
          connection.query(
            `UPDATE login_users INNER JOIN centers ON login_users.UserID = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.UserName = NULL, login_users.Password = NULL, login_users.Status = 0 WHERE clients.ClientID = ?`,
            [ClientID],
            (error) => {
              if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
              connection.query(
                `UPDATE login_users INNER JOIN therapists ON login_users.UserID = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET login_users.UserName = NULL, login_users.Password = NULL, login_users.Status = 0 WHERE clients.ClientID = ?`,
                [ClientID],
                (error) => {
                  if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
                  connection.commit((error) => {
                    if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
                    connection.release();
                    return callBack(null, "Client deleted successfully");
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};

exports.getClientByClientId = (ClientID, callBack) => {
  db.query(
    `SELECT * FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID AND clients.ClientID = ? AND login_users.Status = 1 `,
    [ClientID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getClientByUserIdNClientId = (data, callBack) => {
  db.query(
    `SELECT * from clients where UserID = ? AND ClientID = ? `,
    [data.UserID, data.ClientID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.getClientByUserId = (UserID, callBack) => {
  db.query(`SELECT * from clients where UserID = ?`, [UserID], (error, results) => {
    if (error) {
      callBack(error.message);
    } else return callBack(null, results);
  });
};
