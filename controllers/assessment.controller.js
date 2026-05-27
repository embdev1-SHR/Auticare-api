const {
  assessmentCreate,
  assessmentList,
  assessmentDetails,
  assessmentUpdate,
  assessmentUpdateByCreate_By,
  assessmentDelete,
  assessmentSearch,
  getAssessmentByCreate_ByNAssessmentId,
  assessmentListByClientUserID,
  assessmentListByCenterUserID,
  assessmentListByTherapistUserID,
  assessmentDetailsByAssessmentIDNClientUserID,
  assessmentDetailsByAssessmentIDNCenterUserID,
  assessmentSearchByAssessmentNameNClientUserID,
  assessmentSearchByAssessmentNameNCenterUserID,
  assessmentDetailsByAssessmentIDNTherapistUserID,
  assessmentSearchByAssessmentNameNTherapistUserID,
  assessmentDeleteByAssessmentIDNClientUserID,
  assessmentDeleteByAssessmentIDNCenterUserID,
  assessmentDeleteByAssessmentIDNTherapistUserID,
} = require("../services/assessment.service");
const { regionDetails } = require("../services/region.service");
const { scaleDetails } = require("../services/scale.service");
const { skillDetails } = require("../services/skill.service");

exports.assessmentList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    assessmentList((error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    assessmentListByClientUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    assessmentListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    assessmentListByTherapistUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
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

exports.assessmentDetails = (req, res) => {
  const data = {
    AssessmentID: req.params.AssessmentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    assessmentDetails(data.AssessmentID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    assessmentDetailsByAssessmentIDNClientUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    assessmentDetailsByAssessmentIDNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    assessmentDetailsByAssessmentIDNTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  }
};

exports.assessmentSearch = (req, res) => {
  const data = {
    AssessmentName: req.body.AssessmentName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    assessmentSearch(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    assessmentSearchByAssessmentNameNClientUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Center") {
    assessmentSearchByAssessmentNameNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    assessmentSearchByAssessmentNameNTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  }
};

exports.assessmentCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };

  scaleDetails(data.ScaleID, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(404).send({
        success: false,
        errors: {
          message: "Scale with provided ScaleID not found",
        },
      });
    }
    skillDetails(data.SkillID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(404).send({
          success: false,
          errors: {
            message: "Skill with provided SkillID not found",
          },
        });
      }
      // TODO: verifythe RegionIDs provided exists in db
      regionDetails(data.RegionIDs[0], (error, results) => {
        // console.warn(data.RegionIDs.toString());
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            errors: {
              message: "Region with provided RegionID not found",
            },
          });
        }
        assessmentCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .send({ success: false, errors: { message: error } });
          }
          return res.status(201).send({
            success: true,
            results: { message: results },
          });
        });
      });
    });
  });
};

exports.assessmentUpdate = (req, res) => {
  const data = {
    AssessmentID: req.params.AssessmentID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  scaleDetails(data.ScaleID, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(404).send({
        success: false,
        errors: {
          message: "Scale with provided ScaleID not found",
        },
      });
    }
    skillDetails(data.SkillID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(404).send({
          success: false,
          errors: {
            message: "Skill with provided SkillID not found",
          },
        });
      }
      regionDetails(data.RegionIDs[0], (error, results) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            errors: {
              message: "Region with provided RegionID not found",
            },
          });
        }
        if (data.RoleName == "SuperAdmin") {
          assessmentUpdate(data, (error, results, status) => {
            if (error) {
              console.log(error);
              return res
                .status(status || 500)
                .send({ success: false, errors: { message: error } });
            }

            return res.status(200).send({
              success: true,
              results: { message: results },
            });
          });
        } else if (
          ["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)
        ) {
          getAssessmentByCreate_ByNAssessmentId(data, (error, results) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .send({ success: false, errors: { message: error } });
            }
            if (!results.length) {
              return res.status(403).send({
                success: false,
                errors: {
                  message:
                    "The user does not have access rights to the content",
                },
              });
            }
            assessmentUpdateByCreate_By(data, (error, results, status) => {
              if (error) {
                console.log(error);
                return res
                  .status(status || 500)
                  .send({ success: false, errors: { message: error } });
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
      });
    });
  });
};

exports.assessmentDelete = (req, res) => {
  const data = {
    AssessmentID: req.params.AssessmentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    assessmentDelete(data.AssessmentID, (error, results, status) => {
      if (error) {
        console.log(error);
        return res
          .status(status || 500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    assessmentDeleteByAssessmentIDNClientUserID(
      data,
      (error, results, status) => {
        if (error) {
          console.log(error);
          return res
            .status(status || 500)
            .send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      }
    );
  } else if (data.RoleName == "Center") {
    assessmentDeleteByAssessmentIDNCenterUserID(
      data,
      (error, results, status) => {
        if (error) {
          console.log(error);
          return res
            .status(status || 500)
            .send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      }
    );
  } else if (data.RoleName == "Therapist") {
    assessmentDeleteByAssessmentIDNTherapistUserID(
      data,
      (error, results, status) => {
        if (error) {
          console.log(error);
          return res
            .status(status || 500)
            .send({ success: false, errors: { message: error } });
        }
        return res.status(200).send({
          success: true,
          results: { message: results },
        });
      }
    );
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};
