const db = require("../config/db.config");
const { addDays } = require("../helpers/date");
const promiseDB = db.promise();

exports.clientList = (callBack) => {
  db.query(
    `SELECT clients.*, login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, COALESCE(clients.ClientName, login_users.UserName) AS ClientName, CASE WHEN clients.ClientType IS NOT NULL THEN 'Complete' ELSE 'Pending' END AS OnboardingStatus, COALESCE(clients.SubscriptionPlanStatus, 'Not Assigned') AS PaymentStatus, COALESCE(( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ), 0) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users LEFT JOIN clients ON login_users.UserID = clients.UserID LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID WHERE login_users.Status = 1 AND login_users.RoleId = 2 GROUP BY login_users.UserID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.clientListDesc = async () => {
  const [rows] = await promiseDB.query(
    `SELECT clients.*, login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, COALESCE(clients.ClientName, login_users.UserName) AS ClientName, CASE WHEN clients.ClientType IS NOT NULL THEN 'Complete' ELSE 'Pending' END AS OnboardingStatus, COALESCE(clients.SubscriptionPlanStatus, 'Not Assigned') AS PaymentStatus, COALESCE(( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ), 0) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users LEFT JOIN clients ON login_users.UserID = clients.UserID LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID WHERE login_users.Status = 1 AND login_users.RoleId = 2 GROUP BY login_users.UserID ORDER BY login_users.Create_TS DESC LIMIT 5;`
  );
  return rows;
};

exports.clientDetails = (ClientID, callBack) => {
  db.query(
    `SELECT login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, clients.*, subscription_plans.PlanName, ( SELECT COUNT(*) FROM centers WHERE centers.ClientID = clients.ClientID ) AS CentersCount, COUNT(therapists.CenterID) AS TherapistsCount FROM login_users INNER JOIN clients ON login_users.UserID = clients.UserID AND clients.ClientID = ? LEFT JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId LEFT JOIN centers ON centers.ClientID = clients.ClientID LEFT JOIN therapists ON therapists.CenterID = centers.CenterID; `,
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
    `SELECT clients.*, subscription_plans.PlanName, login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By FROM login_users LEFT JOIN clients ON login_users.UserID = clients.UserID LEFT JOIN subscription_plans ON subscription_plans.SubscriptionPlanID = clients.SubscriptionPlanId WHERE login_users.UserID = ?`,
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
    `SELECT clients.*, login_users.UserID, login_users.EmailId, login_users.UserName, login_users.Phone, login_users.AddressLine1, login_users.AddressLine2, login_users.City, login_users.Pincode, login_users.State, login_users.Country, login_users.RoleId, login_users.Status, login_users.Create_TS, login_users.Update_TS, login_users.Create_By, login_users.Update_By, COALESCE(clients.ClientName, login_users.UserName) AS ClientName, CASE WHEN clients.ClientType IS NOT NULL THEN 'Complete' ELSE 'Pending' END AS OnboardingStatus, COALESCE(clients.SubscriptionPlanStatus, 'Not Assigned') AS PaymentStatus FROM login_users LEFT JOIN clients ON login_users.UserID = clients.UserID WHERE (clients.ClientName LIKE '%${data.ClientName}%' OR login_users.UserName LIKE '%${data.ClientName}%') AND login_users.EmailId LIKE '%${data.EmailId}%' AND login_users.Status = 1 AND login_users.RoleId = 2`,
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
            `INSERT INTO login_users ( EmailId, UserName, Phone, AddressLine1, AddressLine2, City, Pincode, State, Country, RoleId, Password, Create_By, Status ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
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
              1,
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
                    data.IncorporationCertificateURL || "",
                    data.RegistrationCertificateURL || "",
                    data.SubscriptionPlanId,
                    data.SubscriptionPlanStatus,
                    new Date(),
                    new Date(addDays(data.NumberOfPlanActiveDays)),
                    data.PaymentId,
                    data.BillingAddressLine1 || "",
                    data.BillingAddressLine2 || "",
                    data.BillingCity || "",
                    data.BillingDistrict || "",
                    data.BillingPincode || "",
                    data.BillingState || "",
                    data.BillingCountry || "",
                    data.GSTNumber || "",
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

exports.clientOnboardByUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.beginTransaction((error) => {
      if (error) return callBack(error.message);
      connection.query(
        `UPDATE login_users SET Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, Pincode = ?, State = ?, Country = ? WHERE UserID = ?`,
        [data.Phone, data.AddressLine1, data.AddressLine2, data.City, data.Pincode, data.State, data.Country, data.UserID],
        (error) => {
          if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
          connection.query(
            `INSERT INTO clients (UserID, ClientName, ClientLogo, WebsiteURL, ClientType, OrganizationType, ContactPersonName, ContactPersonDesignation, ContactEmailId, BillingAddressLine1, BillingAddressLine2, BillingCity, BillingDistrict, BillingPincode, BillingState, BillingCountry, GSTNumber, Bank, BankAccountNumber, Branch, IFSCCode, IncorporationCertificateURL, RegistrationCertificateURL, SubscriptionPlanStatus, SubscriptionPlanActivatedDate, SubcriptionPlanEndDate)
             VALUES (?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', '', 'Pending Setup', NOW(), NOW())
             ON DUPLICATE KEY UPDATE
               ClientName = VALUES(ClientName), WebsiteURL = VALUES(WebsiteURL), ClientType = VALUES(ClientType),
               OrganizationType = VALUES(OrganizationType), ContactPersonName = VALUES(ContactPersonName),
               ContactPersonDesignation = VALUES(ContactPersonDesignation), ContactEmailId = VALUES(ContactEmailId),
               BillingAddressLine1 = VALUES(BillingAddressLine1), BillingAddressLine2 = VALUES(BillingAddressLine2),
               BillingCity = VALUES(BillingCity), BillingDistrict = VALUES(BillingDistrict),
               BillingPincode = VALUES(BillingPincode), BillingState = VALUES(BillingState),
               BillingCountry = VALUES(BillingCountry), GSTNumber = VALUES(GSTNumber),
               Bank = VALUES(Bank), BankAccountNumber = VALUES(BankAccountNumber),
               Branch = VALUES(Branch), IFSCCode = VALUES(IFSCCode)`,
            [
              data.UserID, data.ClientName, data.WebsiteURL || null, data.ClientType, data.OrganizationType || null,
              data.ContactPersonName, data.ContactPersonDesignation || null, data.ContactEmailId || null,
              data.BillingAddressLine1 || "", data.BillingAddressLine2 || "", data.BillingCity || "",
              data.BillingDistrict || "", data.BillingPincode || "", data.BillingState || "",
              data.BillingCountry || "", data.GSTNumber || "",
              data.Bank || null, data.BankAccountNumber || null, data.Branch || null, data.IFSCCode || null,
            ],
            (error, result) => {
              if (error) return connection.rollback(() => { connection.release(); callBack(error.message); });
              connection.commit((error) => {
                connection.release();
                if (error) return callBack(error.message);
                return callBack(null, "Onboarding completed successfully");
              });
            }
          );
        }
      );
    });
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

exports.assignSubscriptionByUserID = (data, callBack) => {
  db.query(`SELECT ClientID FROM clients WHERE UserID = ?`, [data.UserID], (err, rows) => {
    if (err) return callBack(err.message);
    if (rows.length > 0) {
      // Client row exists — update subscription fields only.
      // Do not check affectedRows: MySQL returns 0 when values are unchanged, which is still a success.
      db.query(
        `UPDATE clients SET SubscriptionPlanId = ?, SubscriptionPlanStatus = 'Payment Success', SubscriptionPlanActivatedDate = ?, SubcriptionPlanEndDate = ? WHERE UserID = ?`,
        [data.SubscriptionPlanId, data.activatedDate, data.endDate, data.UserID],
        (error) => {
          if (error) return callBack(error.message);
          return callBack(null, "Subscription assigned successfully");
        }
      );
    } else {
      // No clients row yet (unonboarded client). Mirror clientOnboardByUserID column list
      // and use empty strings for VARCHAR fields to satisfy any NOT NULL constraints.
      db.query(
        `INSERT INTO clients (UserID, ClientName, ClientLogo, WebsiteURL, ClientType, OrganizationType, ContactPersonName, ContactPersonDesignation, ContactEmailId, BillingAddressLine1, BillingAddressLine2, BillingCity, BillingDistrict, BillingPincode, BillingState, BillingCountry, GSTNumber, Bank, BankAccountNumber, Branch, IFSCCode, IncorporationCertificateURL, RegistrationCertificateURL, SubscriptionPlanId, SubscriptionPlanStatus, SubscriptionPlanActivatedDate, SubcriptionPlanEndDate)
         VALUES (?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, 'Payment Success', ?, ?)`,
        [data.UserID, data.ClientName, data.SubscriptionPlanId, data.activatedDate, data.endDate],
        (error, result) => {
          if (error) return callBack(error.message);
          if (result.affectedRows < 1) return callBack("Failed to create client record for subscription");
          return callBack(null, "Subscription assigned successfully");
        }
      );
    }
  });
};

exports.deleteUnonboardedClient = (UserID, callBack) => {
  db.query(
    `SELECT UserID FROM clients WHERE UserID = ?`,
    [UserID],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (rows.length > 0) return callBack("Client has an existing profile — use the standard delete", null, 400);
      db.query(
        `DELETE FROM login_users WHERE UserID = ? AND RoleId = 2`,
        [UserID],
        (error, result) => {
          if (error) return callBack(error.message);
          if (result.affectedRows < 1) return callBack("Client not found", null, 404);
          return callBack(null, "Client deleted successfully");
        }
      );
    }
  );
};

exports.updateUnonboardedClientDetails = (data, callBack) => {
  db.query(
    `UPDATE login_users SET UserName = ?, EmailId = ?, Phone = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, Pincode = ?, State = ?, Country = ? WHERE UserID = ? AND RoleId = 2`,
    [data.UserName, data.EmailId, data.Phone, data.AddressLine1, data.AddressLine2, data.City, data.Pincode, data.State, data.Country, data.UserID],
    (error, result) => {
      if (error) return callBack(error.message);
      if (result.affectedRows < 1) return callBack("Client not found", null, 404);
      return callBack(null, "Client updated successfully");
    }
  );
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

exports.clientCreateFromPending = (data, callBack) => {
  db.query(
    `SELECT UserID, EmailId, UserName FROM login_users WHERE UserID = ? AND Status = 0 AND RoleId = 2`,
    [data.UserID],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Pending client not found or already approved");
      const pending = rows[0];
      const clientName = pending.UserName || pending.EmailId;
      db.query(
        `UPDATE login_users SET Status = 1 WHERE UserID = ? AND Status = 0 AND RoleId = 2`,
        [pending.UserID],
        (error, updateResult) => {
          if (error) return callBack(error.message);
          if (!updateResult.affectedRows) return callBack("Failed to activate client");
          return callBack(null, "Client approved successfully", { EmailId: pending.EmailId, OrgName: clientName });
        }
      );
    }
  );
};

exports.rejectPendingClient = (UserID, callBack) => {
  db.query(
    `SELECT EmailId, UserName FROM login_users WHERE UserID = ? AND Status = 0 AND RoleId = 2`,
    [UserID],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Pending client not found");
      const pending = rows[0];
      db.query(
        `DELETE FROM login_users WHERE UserID = ? AND Status = 0 AND RoleId = 2`,
        [UserID],
        (error, results) => {
          if (error) return callBack(error.message);
          if (results.affectedRows >= 1) return callBack(null, "Client registration rejected", { EmailId: pending.EmailId, OrgName: pending.UserName });
          return callBack("Pending client not found");
        }
      );
    }
  );
};
