const {
  scaleCreate,
  scaleUpdate,
  scaleUpdateByCreate_By,
  scaleList,
  scaleListByClientUserID,
  scaleListByCenterUserID,
  scaleListByTherapistUserID,
  scaleDetails,
  scaleDetailsByScaleIDNClientUserID,
  scaleDetailsByScaleIDNCenterUserID,
  scaleDetailsByScaleIDNTherapistUserID,
  scaleSearch,
  scaleSearchByScaleNameNClientUserID,
  scaleSearchByScaleNameNCenterUserID,
  scaleSearchByScaleNameNTherapistUserID,
  scaleDelete,
  scaleDeleteByScaleIDNClientUserID,
  scaleDeleteByScaleIDNCenterUserID,
  scaleDeleteByScaleIDNTherapistUserID,
  scaleScreeningQuestionList,
  scaleScreeningQuestionListByScaleIDNClientUserID,
  scaleScreeningQuestionListByScaleIDNCenterUserID,
  scaleScreeningQuestionListByScaleIDNTherapistUserID,
  scaleScreeningUpdate,
  scaleScreeningUpdateByCreate_By,
  scaleScreeningCreate,
  scaleAssessmentUpdate,
  scaleAssessmentUpdateByCreate_By,
  scaleAssessmentCreate,
  scaleAssessmentQuestionList,
  scaleAssessmentQuestionListByScaleIDNClientUserID,
  scaleAssessmentQuestionListByScaleIDNCenterUserID,
  scaleAssessmentQuestionListByScaleIDNTherapistUserID,
  scaleMetricDelete,
  scaleMetricDeleteByScaleIDNClientUserID,
  scaleMetricDeleteByMetricIDNCenterUserID,
  scaleMetricDeleteByMetricIDNTherapistUserID,
  ScaleScreeningScoreCriteriaUpdate,
  ScaleScreeningScoreCriteriaUpdateByCreate_By,
  scaleCountByClientUserID,
  scaleCountByCenterUserID,
  scaleCountByTherapistUserID,
} = require("../services/scale.service");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");
const { categories } = require("../utils/consts/abllsCategoryNames");

exports.scaleList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleList((error, results) => {
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
    scaleListByClientUserID(data.UserID, (error, results) => {
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
    scaleListByCenterUserID(data.UserID, (error, results) => {
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
    scaleListByTherapistUserID(data.UserID, (error, results) => {
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

exports.scaleScreeningQuestionList = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleScreeningQuestionList(data.ScaleID, (error, results) => {
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
    scaleScreeningQuestionListByScaleIDNClientUserID(data, (error, results) => {
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
    scaleScreeningQuestionListByScaleIDNCenterUserID(data, (error, results) => {
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
    scaleScreeningQuestionListByScaleIDNTherapistUserID(data, (error, results) => {
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

exports.scaleAssessmentQuestionList = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleAssessmentQuestionList(data.ScaleID, (error, results) => {
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
    scaleAssessmentQuestionListByScaleIDNClientUserID(data, (error, results) => {
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
    scaleAssessmentQuestionListByScaleIDNCenterUserID(data, (error, results) => {
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
    scaleAssessmentQuestionListByScaleIDNTherapistUserID(data)
      .then((results) => {
        return res.status(200).send({
          success: true,
          results: { data: results },
        });
      })
      .catch((error) => {
        return res.status(500).send({ success: false, errors: { message: error } });
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

exports.scaleDetails = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleDetails(data.ScaleID, (error, results) => {
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
    scaleDetailsByScaleIDNClientUserID(data, (error, results) => {
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
    scaleDetailsByScaleIDNCenterUserID(data, (error, results) => {
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
    scaleDetailsByScaleIDNTherapistUserID(data, (error, results) => {
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

exports.scaleSearch = (req, res) => {
  const data = {
    ScaleName: req.body.ScaleName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleSearch(data, (error, results) => {
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
    scaleSearchByScaleNameNClientUserID(data, (error, results) => {
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
    scaleSearchByScaleNameNCenterUserID(data, (error, results) => {
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
    scaleSearchByScaleNameNTherapistUserID(data, (error, results) => {
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

exports.scaleCreate = async (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.ScaleMetric == "Assessment" && data.ScaleMetricType == "ABLLS") {
    data.Categories = categories;
  }

  // Trivandrum scales are always Default — accessible to all logins, no subscription limit
  if (data.ScaleMetricType === "Trivandrum") {
    data.ScaleType = "Default";
    scaleCreate(data, (error, results, insertId) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results, insertId },
      });
    });
    return;
  }

  if (data.RoleName != "SuperAdmin") {
    try {
      const subscriptionResults = (await subscriptionPlanDetailsByUserID(data.UserID))[0];
      if (!subscriptionResults) {
        return res.status(400).send({
          success: false,
          errors: { message: "No active subscription plan found for this account" },
        });
      }
      data.ScaleType = "Custom";
      let scaleCount = 0;
      if (data.RoleName == "ClientAdmin") {
        scaleCount = (await scaleCountByClientUserID(data.UserID))[0].ScaleCount;
      } else if (data.RoleName == "Center") {
        scaleCount = (await scaleCountByCenterUserID(data.UserID))[0].ScaleCount;
      } else if (data.RoleName == "Therapist") {
        scaleCount = (await scaleCountByTherapistUserID(data.UserID))[0].ScaleCount;
      }
      if (scaleCount >= subscriptionResults.NumberofCustomScales) {
        return res.status(400).send({
          success: false,
          errors: { message: "The number of scales allowed in the subscription plan has already been created" },
        });
      } else {
        scaleCreate(data, (error, results, insertId) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          return res.status(201).send({
            success: true,
            results: { message: results, insertId },
          });
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error.message || "Failed to create scale" } });
    }
  } else {
    data.ScaleType = "Default";
    scaleCreate(data, (error, results, insertId) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results, insertId },
      });
    });
  }
};

exports.scaleScreeningCreate = (req, res) => {
  let data = {
    ...req.body,
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
  };
  scaleScreeningCreate(data, (error, results) => {
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

exports.scaleAssessmentCreate = (req, res) => {
  let data = {
    ...req.body,
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
  };
  scaleAssessmentCreate(data, (error, results) => {
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

exports.scaleUpdate = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    scaleUpdateByCreate_By(data, (error, results, status) => {
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
};

exports.ScaleScreeningScoreCriteriaUpdate = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    ScaleScreeningScoreCriteriaUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    ScaleScreeningScoreCriteriaUpdateByCreate_By(data, (error, results, status) => {
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
};

exports.scaleScreeningUpdate = (req, res) => {
  const data = {
    ...req.body,
    ScaleID: req.params.ScaleID,
    MetricID: req.params.MetricID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleScreeningUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    scaleScreeningUpdateByCreate_By(data, (error, results, status) => {
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
};

exports.scaleAssessmentUpdate = (req, res) => {
  const data = {
    ...req.body,
    ScaleID: req.params.ScaleID,
    MetricID: req.params.MetricID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleAssessmentUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    scaleAssessmentUpdateByCreate_By(data, (error, results, status) => {
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
};

exports.scaleDelete = (req, res) => {
  const data = {
    ScaleID: req.params.ScaleID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    scaleDelete(data.ScaleID, (error, results, status) => {
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
    scaleDeleteByScaleIDNClientUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Center") {
    scaleDeleteByScaleIDNCenterUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    scaleDeleteByScaleIDNTherapistUserID(data, (error, results, status) => {
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
};

exports.scaleMetricDelete = (req, res) => {
  let data = {
    MetricID: req.params.MetricID,
    ScaleMetricType: req.params.ScaleMetricType,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.ScaleMetricType == "Screening") {
    data.DBName = "screen_metrics";
  } else if (data.ScaleMetricType == "Assessment") {
    data.DBName = "assessment_metrics";
  } else {
    return res.status(400).send({ success: false, errors: { message: "Bad Requests" } });
  }
  if (data.RoleName == "SuperAdmin") {
    scaleMetricDelete(data, (error, results, status) => {
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
    scaleMetricDeleteByScaleIDNClientUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Center") {
    scaleMetricDeleteByMetricIDNCenterUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    scaleMetricDeleteByMetricIDNTherapistUserID(data, (error, results, status) => {
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
};
