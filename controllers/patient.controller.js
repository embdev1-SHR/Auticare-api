const {
  patientList,
  patientCreate,
  patientUpdate,
  patientDelete,
  patientSearch,
  patientDetails,
  patientListByClientUserID,
  patientListByCenterUserID,
  patientListByTherapistUserID,
  patientDetailsByPatientIDNClientUserID,
  patientDetailsByPatientIDNCenterUserID,
  patientDetailsByPatientIDNTherapistUserID,
  patientSearchByPatientNameNClientUserID,
  patientSearchByPatientNameNCenterUserID,
  patientSearchByPatientNameNTherapistUserID,
  patientMetricListByTherapistUserID,
  patientMetricsCreate,
  patientMetricsUpdate,
  patientScreeningMetricResponseCreate,
  patientAssessmentMetricResponseCreate,
  patientScreeningMetricResponseList,
  patientAssessmentMetricResponseList,
  patientMetricDetailsByTherapistUserID,
  patientCommentCreate,
  patientCommentList,
  patientCommentUpdate,
  patientCommentDelete,
  patientPlanCreate,
  patientPlanList,
  patientPlanGoalList,
  patientPlanGoalUpdate,
  patientPlanGoalDelete,
  patientPlanGoalCreate,
  patientDetailsByUserID,
  patientIssueList,
  // patientIssueListByClientUserID,
  // patientIssueListByCenterUserID,
  // patientIssueListByTherapistUserID,
  patientPlanUpdate,
  patientSessionCreate,
  patientSessionTrialCreate,
  patientSessionTrialFinish,
  patientSessionListByTherapistUserID,
  patientSessionDetailsByTherapistUserID,
  patientSessionTrialListByTherapistUserID,
  patientSessionTrialBehaviourListByTherapistUserID,
  patientSessionTrialMandListByTherapistUserID,
  patientSessionListByPatientUserID,
  patientSessionTrialDetailsByTherapistUserID,
  patientSessionUpdate,
  patientMetricListByPatientID,
  patientVRSessionDetails,
  patientVRSessionDetailsUpdate,
  patientSessionTrialUnfinishedByTherapistUserID,
  patientCountByClientUserID,
  patientCountByCenterUserID,
  patientCountByTherapistUserID,
  patientSessionBehaviourListByTherapistUserID,
  patientSessionMandListByTherapistUserID,
} = require("../services/patient.service");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");
const { therapistDetailsByUserID } = require("../services/therapist.service");

exports.patientList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    patientList((error, results) => {
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
    patientListByClientUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    patientListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    patientListByTherapistUserID(data.UserID, (error, results) => {
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

exports.patientIssueList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    // UserID: req.userData.UserID,
    // RoleName: req.userData.RoleName,
  };
  // if (data.RoleName == "SuperAdmin") {
  patientIssueList(data.PatientID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
  // } else if (data.RoleName == "ClientAdmin") {
  //   patientIssueListByClientUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Center") {
  //   patientIssueListByCenterUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Therapist") {
  //   patientIssueListByTherapistUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else {
  //   return res.status(403).send({
  //     success: false,
  //     errors: {
  //       message: "The user does not have access",
  //     },
  //   });
  // }
};

exports.patientMetricList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    patientMetricListByTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Patient") {
    patientDetailsByUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(404).send({ success: false, errors: { message: "Patient not found" } });
      }
      data.PatientID = results[0].PatientID;
      patientMetricListByPatientID(data.PatientID, (error, results) => {
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
  }
};

exports.patientScreeningMetricResponseList = async (req, res) => {
  let data = {
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientScreeningMetricResponseList(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientAssessmentMetricResponseList = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientAssessmentMetricResponseList(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientCommentList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
  };
  patientCommentList(data.PatientID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientPlanList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
  };
  patientPlanList(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientPlanGoalList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    PlanID: req.params.PlanID,
    UserID: req.userData.UserID,
  };
  patientPlanGoalList(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientSessionList = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    patientSessionListByTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Patient") {
    patientSessionListByPatientUserID(data.UserID, (error, results) => {
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

exports.patientSessionTrialList = async (req, res) => {
  const data = {
    SessionID: req.params.SessionID,
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientSessionTrialListByTherapistUserID(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientSessionTrialUnfinished = async (req, res) => {
  const data = {
    SessionID: req.params.SessionID,
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientSessionTrialUnfinishedByTherapistUserID(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientSessionTrialBehaviourList = (req, res) => {
  const data = {
    SessionTrialID: req.params.SessionTrialID,
    UserID: req.userData.UserID,
  };
  patientSessionTrialBehaviourListByTherapistUserID(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientSessionBehaviourList = (req, res) => {
  const data = {
    SessionID: req.params.SessionID,
    UserID: req.userData.UserID,
  };
  patientSessionBehaviourListByTherapistUserID(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientSessionTrialMandList = (req, res) => {
  const data = {
    SessionTrialID: req.params.SessionTrialID,
    UserID: req.userData.UserID,
  };
  patientSessionTrialMandListByTherapistUserID(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientSessionMandList = (req, res) => {
  const data = {
    SessionID: req.params.SessionID,
    UserID: req.userData.UserID,
  };
  patientSessionMandListByTherapistUserID(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientDetails = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    patientDetails(data.PatientID, (error, results) => {
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
    patientDetailsByPatientIDNClientUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    patientDetailsByPatientIDNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    patientDetailsByPatientIDNTherapistUserID(data, (error, results) => {
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

exports.patientMetricDetails = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientMetricDetailsByTherapistUserID(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientSessionDetails = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    SessionID: req.params.SessionID,
    UserID: req.userData.UserID,
  };
  try {
    const results = await patientSessionDetailsByTherapistUserID(data);
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  } catch (error) {
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientVRSessionDetails = (req, res) => {
  const data = {
    SessionID: req.params.SessionID,
  };
  patientVRSessionDetails(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientVRSessionDetailsUpdate = (req, res) => {
  const data = {
    ...req.body,
    SessionID: req.params.SessionID,
  };
  if (!data.Trials.length) {
    return res.status(400).send({
      success: false,
      errors: { message: "Trials array is empty" },
    });
  }
  patientVRSessionDetailsUpdate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientSessionTrialDetails = (req, res) => {
  const data = {
    SessionTrialID: req.params.SessionTrialID,
    UserID: req.userData.UserID,
  };
  patientSessionTrialDetailsByTherapistUserID(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.patientSearch = (req, res) => {
  const data = {
    PatientName: req.body.PatientName,
    EmailId: req.body.ParentEmailID,
    Phone: req.body.ParentPhone,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    patientSearch(data, (error, results) => {
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
    patientSearchByPatientNameNClientUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    patientSearchByPatientNameNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    patientSearchByPatientNameNTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  }
};

exports.patientCreate = async (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  const subscriptionResults = (await subscriptionPlanDetailsByUserID(data.UserID))[0];

  if (["ClientAdmin", "Center"].includes(data.RoleName)) {
    let patientCount = 0;
    if (data.RoleName == "ClientAdmin") {
      patientCount = (await patientCountByClientUserID(data.UserID))[0].PatientCount;
    } else {
      patientCount = (await patientCountByCenterUserID(data.UserID))[0].PatientCount;
    }
    if (patientCount >= subscriptionResults.NumberofPatients) {
      return res.status(400).send({
        success: false,
        errors: { message: "The number of patients allowed in the subscription plan has already been created" },
      });
    } else {
      patientCreate(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(201).send({
          success: true,
          results: { message: results },
        });
      });
    }
  } else if (data.RoleName == "Therapist") {
    const patientCount = (await patientCountByTherapistUserID(data.UserID))[0].PatientCount;

    if (patientCount >= subscriptionResults.NumberofPatients) {
      return res.status(400).send({
        success: false,
        errors: { message: "The number of patients allowed in the subscription plan has already been created" },
      });
    } else {
      therapistDetailsByUserID(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(404).send({ success: false, errors: { message: "Therapist not found" } });
        }
        data.TherapistID = results[0].TherapistID;
        patientCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          return res.status(201).send({
            success: true,
            results: { message: results },
          });
        });
      });
    }
  }
};

exports.patientCommentCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  patientCommentCreate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientMetricCreate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
  };
  therapistDetailsByUserID(data.UserID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    data.TherapistID = results[0].TherapistID;
    patientMetricsCreate(data, (error, results, insertId) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results, insertId },
      });
    });
  });
};

exports.patientScreeningMetricResponseCreate = (req, res) => {
  let data = {
    ...req.body,
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
  };
  patientScreeningMetricResponseCreate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientAssessmentMetricResponseCreate = (req, res) => {
  let data = {
    ...req.body,
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
  };
  patientAssessmentMetricResponseCreate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientPlanCreate = (req, res) => {
  const data = {
    ...req.body,
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
  };
  patientPlanCreate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientPlanGoalCreate = (req, res) => {
  const data = {
    ...req.body,
    ...req.params,
    UserID: req.userData.UserID,
  };
  patientPlanGoalCreate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientSessionCreate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
  };
  therapistDetailsByUserID(data.UserID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    data.TherapistID = results[0].TherapistID;
    patientSessionCreate(data, (error, results, insertId) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results, insertId },
      });
    });
  });
};

exports.patientSessionTrialCreate = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
    SessionID: req.params.SessionID,
  };
  patientSessionTrialCreate(data, (error, results, insertId) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results, insertId },
    });
  });
};

exports.patientSessionTrialFinish = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
    SessionID: req.params.SessionID,
    SessionTrialID: req.params.SessionTrialID,
  };
  patientSessionTrialFinish(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientUpdate = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };

  if (data.RoleName == "SuperAdmin") {
    patientUpdate(data, (error, results, status) => {
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
    patientDetailsByPatientIDNClientUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientUpdate(data, (error, results, status) => {
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
    patientDetailsByPatientIDNCenterUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientUpdate(data, (error, results, status) => {
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
    patientDetailsByPatientIDNTherapistUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientUpdate(data, (error, results, status) => {
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
  } else if (data.RoleName == "Patient") {
    patientDetailsByUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      data.PatientID = results[0].PatientID;
      patientUpdate(data, (error, updateResult, status) => {
        if (error) {
          console.log(error);
          return res.status(status || 500).send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: updateResult },
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

exports.patientMetricsUpdate = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    ScheduleStartDate: req.body.ScheduleStartDate ? req.body.ScheduleStartDate : null,
    ScheduleEndDate: req.body.ScheduleEndDate ? req.body.ScheduleEndDate : null,
    ActualStartDate: req.body.ActualStartDate ? req.body.ActualStartDate : null,
    ActualEndDate: req.body.ActualEndDate ? req.body.ActualEndDate : null,
    CompletionStatus: req.body.CompletionStatus ? req.body.CompletionStatus : null,
  };
  patientMetricsUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }

    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientCommentUpdate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    CommentID: req.params.CommentID,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
  };
  patientCommentUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }

    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientPlanUpdate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
    PlanID: req.params.PlanID,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    CompletionStatus: [true, "true", "TRUE", 1, "1"].includes(req.body.CompletionStatus) ? 1 : 0,
  };
  patientPlanUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }

    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientPlanGoalUpdate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PlanGoalID: req.params.PlanGoalID,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
  };
  patientPlanGoalUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }

    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientSessionUpdate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    SessionID: req.params.SessionID,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
  };
  patientSessionUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }

    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientDelete = (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    patientDelete(data.PatientID, (error, results, status) => {
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
    patientDetailsByPatientIDNClientUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientDelete(data.PatientID, (error, results, status) => {
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
    patientDetailsByPatientIDNCenterUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientDelete(data.PatientID, (error, results, status) => {
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
    patientDetailsByPatientIDNTherapistUserID({ UserID: data.UserID, PatientID: data.PatientID }, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message: "The user does not have access rights to the patient",
          },
        });
      }
      patientDelete(data.PatientID, (error, results, status) => {
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

exports.patientCommentDelete = (req, res) => {
  const data = {
    CommentID: req.params.CommentID,
    UserID: req.userData.UserID,
  };
  patientCommentDelete(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.patientPlanGoalDelete = (req, res) => {
  const data = {
    PlanGoalID: req.params.PlanGoalID,
    UserID: req.userData.UserID,
  };
  patientPlanGoalDelete(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { message: results },
    });
  });
};
