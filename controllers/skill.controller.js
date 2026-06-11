const {
  skillCreate,
  skillList,
  skillDetails,
  skillUpdate,
  skillUpdateByCreate_By,
  skillDelete,
  skillSearch,
  getSkillByCreate_ByNSkillId,
  skillListByClientUserID,
  skillListByCenterUserID,
  skillListByTherapistUserID,
  skillDetailsBySkillIDNClientUserID,
  skillDetailsBySkillIDNCenterUserID,
  skillSearchBySkillNameNClientUserID,
  skillSearchBySkillNameNCenterUserID,
  skillDetailsBySkillIDNTherapistUserID,
  skillSearchBySkillNameNTherapistUserID,
  skillDeleteBySkillIDNClientUserID,
  skillDeleteBySkillIDNCenterUserID,
  skillDeleteBySkillIDNTherapistUserID,
  skillContentList,
  skillDepartmentList,
  skillGoalList,
  skillScaleList,
  skillTherapyList,
  skillContentListBySkills,
  skillDepartmentListBySkills,
  skillGoalListBySkills,
  skillScaleListBySkills,
  skillTherapyListBySkills,
  subSkillList,
  subSkillListBySkills,
  skillCountByClientUserID,
  skillCountByCenterUserID,
  skillCountByTherapistUserID,
  skillScaleListByScaleID,
} = require("../services/skill.service");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");

exports.skillList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    skillList((error, results) => {
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
    skillListByClientUserID(data.UserID, (error, results) => {
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
    skillListByCenterUserID(data.UserID, (error, results) => {
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
    skillListByTherapistUserID(data.UserID, (error, results) => {
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

exports.skillListByScaleID = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    ScaleID: req.params.ScaleID,
  };
  // let result = {};
  // if (data.RoleName == "SuperAdmin") {
    skillScaleListByScaleID(data.ScaleID, (error, results) => {
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
  //   skillListByClientUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     const skills = results.map((item) => item.SkillID);
  //     getSkillListByScaleID(res, skills, data.ScaleID);
  //   });
  // } else if (data.RoleName == "Center") {
  //   skillListByCenterUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     const skills = results.map((item) => item.SkillID);
  //     getSkillListByScaleID(res, skills, data.ScaleID);
  //   });
  // } else if (data.RoleName == "Therapist") {
  //   skillListByTherapistUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     const skills = results.map((item) => item.SkillID);
  //     getSkillListByScaleID(res, skills, data.ScaleID);
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

exports.skillMappingList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  let result = {};
  if (data.RoleName == "SuperAdmin") {
    subSkillList((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      result.SubSkills = results;
      skillContentList((error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        result.SkillContentMappings = results;
        skillDepartmentList((error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          result.SkillDepartmentMappings = results;
          skillGoalList((error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).send({ success: false, errors: { message: error } });
            }
            result.SkillGoalMappings = results;
            skillScaleList((error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({ success: false, errors: { message: error } });
              }
              result.SkillScaleMappings = results;
              skillTherapyList((error, results) => {
                if (error) {
                  console.log(error);
                  return res.status(500).send({ success: false, errors: { message: error } });
                }
                result.SkillTherapyMappings = results;
                return res.status(200).send({
                  success: true,
                  results: { data: result },
                });
              });
            });
          });
        });
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    skillListByClientUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const skills = results.map((item) => item.SkillID);
      getSkillMappingList(res, result, skills);
    });
  } else if (data.RoleName == "Center") {
    skillListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const skills = results.map((item) => item.SkillID);
      getSkillMappingList(res, result, skills);
    });
  } else if (data.RoleName == "Therapist") {
    skillListByTherapistUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const skills = results.map((item) => item.SkillID);
      getSkillMappingList(res, result, skills);
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

exports.skillDetails = (req, res) => {
  const data = {
    SkillID: req.params.SkillID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    skillDetails(data.SkillID, (error, results) => {
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
    skillDetailsBySkillIDNClientUserID(data, (error, results) => {
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
    skillDetailsBySkillIDNCenterUserID(data, (error, results) => {
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
    skillDetailsBySkillIDNTherapistUserID(data, (error, results) => {
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

exports.skillSearch = (req, res) => {
  const data = {
    SkillName: req.body.SkillName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    skillSearch(data, (error, results) => {
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
    skillSearchBySkillNameNClientUserID(data, (error, results) => {
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
    skillSearchBySkillNameNCenterUserID(data, (error, results) => {
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
    skillSearchBySkillNameNTherapistUserID(data, (error, results) => {
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

exports.skillCreate = async (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    Type: "Custom",
  };
  if (data.RoleName == "SuperAdmin") {
    data.Type = "Default";
    skillCreate(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    skillCreate(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results },
      });
    });
  } else {
    return res.status(403).send({
      success: false,
      errors: { message: "The user does not have access" },
    });
  }
};

exports.skillUpdate = (req, res) => {
  const data = {
    SkillID: req.params.SkillID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    skillUpdate(data, (error, results, status) => {
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
    getSkillByCreate_ByNSkillId(data, (error, results) => {
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
      skillUpdateByCreate_By(data, (error, results, status) => {
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

exports.skillDelete = (req, res) => {
  const data = {
    SkillID: req.params.SkillID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    skillDelete(data.SkillID, (error, results, status) => {
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
    skillDeleteBySkillIDNClientUserID(data, (error, results, status) => {
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
    skillDeleteBySkillIDNCenterUserID(data, (error, results, status) => {
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
    skillDeleteBySkillIDNTherapistUserID(data, (error, results, status) => {
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

getSkillMappingList = (res, result, skills) => {
  if (skills.length) {
    subSkillListBySkills(skills, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      result.SubSkills = results;
      skillContentListBySkills(skills, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        result.SkillContentMappings = results;
        skillDepartmentListBySkills(skills, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          result.SkillDepartmentMappings = results;
          skillGoalListBySkills(skills, (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).send({ success: false, errors: { message: error } });
            }
            result.SkillGoalMappings = results;
            skillScaleListBySkills(skills, (error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({
                  success: false,
                  errors: { message: error },
                });
              }
              result.SkillScaleMappings = results;
              skillTherapyListBySkills(skills, (error, results) => {
                if (error) {
                  console.log(error);
                  return res.status(500).send({
                    success: false,
                    errors: { message: error },
                  });
                }
                result.SkillTherapyMappings = results;
                return res.status(200).send({
                  success: true,
                  results: { data: result },
                });
              });
            });
          });
        });
      });
    });
  } else {
    return res.status(200).send({
      success: true,
      results: { data: result },
    });
  }
};
