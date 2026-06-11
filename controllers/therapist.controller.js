const { hash } = require("bcrypt");
const { departmentDetails } = require("../services/department.service");
const {
  therapistList,
  therapistCreate,
  therapistUpdate,
  therapistDelete,
  therapistSearch,
  therapistDetails,
  therapistUpdateByUserID,
  therapistDetailsByNUserID,
  therapistListByClientID,
  therapistListByCenterID,
  therapistDetailsByClientID,
  therapistDetailsByCenterID,
  therapistSearchByClientID,
  therapistSearchByCenterID,
  therapistUpdateByClientID,
  therapistUpdateByCenterID,
  therapistDeleteByTherapistIDNClientID,
  therapistDeleteByTherapistIDNCenterID,
  therapistListForPublic,
  therapistSearchForPublic,
  therapistCountByClientID,
  therapistCountByCenterID,
} = require("../services/therapist.service");
const { getClientByUserId } = require("../services/client.service");
const {
  getCenterByUserId,
  getCenterByCenterIDNClientUserId,
  getCenterByCenterID,
} = require("../services/center.service");
// const { facilitatorByFacilitatorType } = require("../services/other.service");
const { generatePassword } = require("../helpers/randomNumbers");
const { sendMail } = require("../helpers/email");
const { welcomeMailHTML } = require("../helpers/consts");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");

exports.therapistList = (req, res) => {
  const data = { UserID: req.userData.UserID, RoleName: req.userData.RoleName };
  if (data.RoleName == "SuperAdmin") {
    therapistList((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.ClientID = results[0].ClientID;
      therapistListByClientID(data.ClientID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Center") {
    getCenterByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.CenterID = results[0].CenterID;
      therapistListByCenterID(data.CenterID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Patient") {
    therapistListForPublic((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.therapistDetails = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    TherapistID: req.params.TherapistID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapistDetails(data.TherapistID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.ClientID = results[0].ClientID;
      therapistDetailsByClientID(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Center") {
    getCenterByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.CenterID = results[0].CenterID;
      therapistDetailsByCenterID(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Therapist") {
    therapistDetailsByNUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.therapistSearch = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    Name: req.body.Name,
    EmailId: req.body.EmailId,
    Phone: req.body.Phone,
    FacilitatorType: req.body.FacilitatorType,
    DepartmentName: req.body.DepartmentName,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapistSearch(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.ClientID = results[0].ClientID;
      therapistSearchByClientID(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Center") {
    getCenterByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.CenterID = results[0].CenterID;
      therapistSearchByCenterID(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      });
    });
  } else if (data.RoleName == "Patient") {
    therapistSearchForPublic(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.therapistCreate = async (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (["ClientAdmin", "Center"].includes(data.RoleName)) {
    const subscriptionResults = (await subscriptionPlanDetailsByUserID(data.UserID))[0];
    if (data.RoleName == "ClientAdmin") {
      getClientByUserId(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        data.ClientID = results[0].ClientID;
        therapistCountByClientID(data.ClientID, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          if (results[0].TherapistsCount >= subscriptionResults.NumberofTherapists) {
            return res.status(400).send({
              success: false,
              errors: { message: "The number of therapists allowed in the subscription plan has already been created" },
            });
          } else {
            // facilitatorByFacilitatorType(data.FacilitatorType, (error, results) => {
            //   if (error) {
            //     console.log(error);
            //     return res.status(500).send({ success: false, errors: { message: error } });
            //   }
            //   if (!results.length) {
            //     return res.status(404).send({
            //       success: false,
            //       errors: {
            //         message: "FacilitatorType not found",
            //       },
            //     });
            //   }
            departmentDetails(data.DepartmentID, (error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({ success: false, errors: { message: error } });
              }
              if (!results.length) {
                return res.status(404).send({
                  success: false,
                  errors: {
                    message: "Department with provided DepartmentID not found",
                  },
                });
              }
              const password = data.Password ? data.Password : generatePassword();
              hash(password, 10, (error, hash) => {
                if (error) {
                  console.log(error);
                  return res.status(500).send({ success: false, errors: { message: error } });
                }
                data.Password = hash;
                getCenterByCenterIDNClientUserId(data, (error, results) => {
                  if (error) {
                    console.log(error);
                    return res.status(500).send({ success: false, errors: { message: error } });
                  }
                  if (!results.length) {
                    return res.status(404).send({
                      success: false,
                      errors: {
                        message: "Center with provided CenterID not found",
                      },
                    });
                  }
                  therapistCreate(data, (error, results) => {
                    if (error) {
                      console.log(error);
                      return res.status(500).send({ success: false, errors: { message: error } });
                    }
                    sendMail(data, "Your Auticare Therapist Account", welcomeMailHTML({ EmailId: data.EmailId, Password: password, AccountType: "therapist account", Name: data.Name })).finally(() => {
                      res.status(201).send({
                        success: true,
                        results: { message: results },
                      });
                    });
                  });
                });
              });
            });
            // });
          }
        });
      });
    } else if (data.RoleName == "Center") {
      getCenterByUserId(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        data.CenterID = results[0].CenterID;
        therapistCountByCenterID(data.CenterID, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          console.warn(results[0].TherapistsCount, subscriptionResults.NumberofTherapists);
          if (results[0].TherapistsCount >= subscriptionResults.NumberofTherapists) {
            return res.status(400).send({
              success: false,
              errors: { message: "The number of therapists allowed in the subscription plan has already been created" },
            });
          } else {
            // facilitatorByFacilitatorType(data.FacilitatorType, (error, results) => {
            //   if (error) {
            //     console.log(error);
            //     return res.status(500).send({ success: false, errors: { message: error } });
            //   }
            //   if (!results.length) {
            //     return res.status(404).send({
            //       success: false,
            //       errors: {
            //         message: "FacilitatorType not found",
            //       },
            //     });
            //   }
            departmentDetails(data.DepartmentID, (error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({ success: false, errors: { message: error } });
              }
              if (!results.length) {
                return res.status(404).send({
                  success: false,
                  errors: {
                    message: "Department with provided DepartmentID not found",
                  },
                });
              }
              const password = data.Password ? data.Password : generatePassword();
              hash(password, 10, (error, hash) => {
                if (error) {
                  console.log(error);
                  return res.status(500).send({ success: false, errors: { message: error } });
                }
                data.Password = hash;
                getCenterByUserId(data.UserID, (error, results) => {
                  if (error) {
                    console.log(error);
                    return res.status(500).send({ success: false, errors: { message: error } });
                  }
                  if (!results.length) {
                    return res.status(404).send({
                      success: false,
                      errors: {
                        message: "The user does not have access rights to the content",
                      },
                    });
                  }
                  data.CenterID = results[0].CenterID;
                  therapistCreate(data, (error, results) => {
                    if (error) {
                      console.log(error);
                      return res.status(500).send({ success: false, errors: { message: error } });
                    }
                    sendMail(data, "Your Auticare Therapist Account", welcomeMailHTML({ EmailId: data.EmailId, Password: password, AccountType: "therapist account", Name: data.Name })).finally(() => {
                      res.status(201).send({
                        success: true,
                        results: { message: results },
                      });
                    });
                  });
                });
              });
            });
            // });
          }
        });
      });
    }
  } else {
    // facilitatorByFacilitatorType(data.FacilitatorType, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).send({ success: false, errors: { message: error } });
    //   }
    //   if (!results.length) {
    //     return res.status(404).send({
    //       success: false,
    //       errors: {
    //         message: "FacilitatorType not found",
    //       },
    //     });
    //   }
    departmentDetails(data.DepartmentID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(404).send({
          success: false,
          errors: {
            message: "Department with provided DepartmentID not found",
          },
        });
      }
      const password = data.Password ? data.Password : generatePassword();
      hash(password, 10, (error, hash) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        data.Password = hash;
        if (data.RoleName == "SuperAdmin") {
          getCenterByCenterID(data.CenterID, (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).send({ success: false, errors: { message: error } });
            }
            if (!results.length) {
              return res.status(404).send({
                success: false,
                errors: {
                  message: "Center with provided CenterID not found",
                },
              });
            }
            therapistCreate(data, (error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({ success: false, errors: { message: error } });
              }
              sendMail(data, "Your Auticare Therapist Account", welcomeMailHTML({ EmailId: data.EmailId, Password: password, AccountType: "therapist account", Name: data.Name }));
              return res.status(201).send({
                success: true,
                results: { message: results },
              });
            });
          });
        } else {
          return res.status(403).send({
            success: false,
            errors: {
              message: "The user does not have access",
            },
          });
        }
      });
    });
    // });
  }
};

exports.therapistUpdate = (req, res) => {
  const data = {
    TherapistID: req.params.TherapistID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    AddressLine2: req.body.AddressLine2 ? req.body.AddressLine2 : null,
  };
  // facilitatorByFacilitatorType(data.FacilitatorType, (error, results) => {
  //   if (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .send({ success: false, errors: { message: error } });
  //   }
  //   if (!results.length) {
  //     return res.status(404).send({
  //       success: false,
  //       errors: {
  //         message: "FacilitatorType not found",
  //       },
  //     });
  //   }
  // departmentDetails(data.DepartmentID, (error, results) => {
  //   if (error) {
  //     console.log(error);
  //     return res.status(500).send({ success: false, errors: { message: error } });
  //   }
  //   if (!results.length) {
  //     return res.status(404).send({
  //       success: false,
  //       errors: {
  //         message: "Department with provided DepartmentID not found",
  //       },
  //     });
  //   }
    if (data.RoleName == "SuperAdmin") {
      therapistUpdate(data, (error, results, status) => {
        if (error) {
          console.log(error);
          return res.status(status || 500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      });
    } else if (data.RoleName == "ClientAdmin") {
      getClientByUserId(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(403).send({
            success: false,
            errors: {
              message: "The user does not have access rights to the content",
            },
          });
        }
        data.ClientID = results[0].ClientID;
        therapistUpdateByClientID(data, (error, results, status) => {
          if (error) {
            console.log(error);
            return res.status(status || 500).send({ success: false, errors: { message: error } });
          }
          return res.status(200).send({
            success: true,
            results: { message: results },
          });
        });
      });
    } else if (data.RoleName == "Center") {
      getCenterByUserId(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(403).send({
            success: false,
            errors: {
              message: "The user does not have access rights to the content",
            },
          });
        }
        data.CenterID = results[0].CenterID;
        therapistUpdateByCenterID(data, (error, results, status) => {
          if (error) {
            console.log(error);
            return res.status(status || 500).send({ success: false, errors: { message: error } });
          }
          return res.status(200).send({
            success: true,
            results: { message: results },
          });
        });
      });
    } else if (data.RoleName == "Therapist") {
      therapistUpdateByUserID(data, (error, results, status) => {
        if (error) {
          console.log(error);
          return res.status(status || 500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        errors: {
          message: "The user does not have access",
        },
      });
    }
  // });
  // });
};

exports.therapistDelete = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    TherapistID: req.params.TherapistID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapistDelete(data.TherapistID, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.ClientID = results[0].ClientID;
      therapistDeleteByTherapistIDNClientID(data, (error, results, status) => {
        if (error) {
          console.log(error);
          return res.status(status || 500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      });
    });
  } else if (data.RoleName == "Center") {
    getCenterByUserId(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the content",
          },
        });
      }
      data.CenterID = results[0].CenterID;
      therapistDeleteByTherapistIDNCenterID(data, (error, results, status) => {
        if (error) {
          console.log(error);
          return res.status(status || 500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};
