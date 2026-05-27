const {
  therapyList,
  therapyCreate,
  therapyUpdate,
  therapyDelete,
  therapySearch,
  therapyDetails,
  therapyUpdateByCreate_By,
  therapyListByClientUserID,
  therapyListByCenterUserID,
  therapyListByTherapistUserID,
  getTherapyByCreate_ByNTherapyId,
  therapyDeleteByTherapyIDNClientUserID,
  therapyDeleteByTherapyIDNCenterUserID,
  therapyDetailsByTherapyIDNClientUserID,
  therapyDetailsByTherapyIDNCenterUserID,
  therapyDeleteByTherapyIDNTherapistUserID,
  therapyDetailsByTherapyIDNTherapistUserID,
  therapySearchByTherapyNameNClientUserID,
  therapySearchByTherapyNameNCenterUserID,
  therapySearchByTherapyNameNTherapistUserID,
  therapyGoalsList,
  therapySkillListByTherapies,
  therapyGoalsListByTherapies,
  therapySkillList,
} = require("../services/therapy.service");

exports.therapyList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapyList((error, results) => {
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
    therapyListByClientUserID(data.UserID, (error, results) => {
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
    therapyListByCenterUserID(data.UserID, (error, results) => {
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
    therapyListByTherapistUserID(data.UserID, (error, results) => {
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

exports.therapyMappingList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  let result = {};
  if (data.RoleName == "SuperAdmin") {
    therapyGoalsList((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      result.Goals = results;
      therapySkillList((error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        result.TherapySkillMappings = results;
        return res.status(200).send({
          success: true,
          results: { data: result },
        });
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    therapyListByClientUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const therapies = results.map((item) => item.TherapyID);
      getTherapyMappingList(res, result, therapies);
    });
  } else if (data.RoleName == "Center") {
    therapyListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const therapies = results.map((item) => item.TherapyID);
      getTherapyMappingList(res, result, therapies);
    });
  } else if (data.RoleName == "Therapist") {
    therapyListByTherapistUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const therapies = results.map((item) => item.TherapyID);
      getTherapyMappingList(res, result, therapies);
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

exports.therapyDetails = (req, res) => {
  const data = {
    TherapyID: req.params.TherapyID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapyDetails(data.TherapyID, (error, results) => {
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
    therapyDetailsByTherapyIDNClientUserID(data, (error, results) => {
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
    therapyDetailsByTherapyIDNCenterUserID(data, (error, results) => {
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
    therapyDetailsByTherapyIDNTherapistUserID(data, (error, results) => {
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

exports.therapySearch = (req, res) => {
  const data = {
    TherapyName: req.body.TherapyName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapySearch(data, (error, results) => {
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
    therapySearchByTherapyNameNClientUserID(data, (error, results) => {
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
    therapySearchByTherapyNameNCenterUserID(data, (error, results) => {
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
    therapySearchByTherapyNameNTherapistUserID(data, (error, results) => {
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

exports.therapyCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    TherapyType: req.userData.RoleName == "SuperAdmin" ? "Default" : "Custom",
  };
  therapyCreate(data, (error, results) => {
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

exports.therapyUpdate = (req, res) => {
  const data = {
    TherapyID: req.params.TherapyID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapyUpdate(data, (error, results, status) => {
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
    getTherapyByCreate_ByNTherapyId(data, (error, results) => {
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
      therapyUpdateByCreate_By(data, (error, results, status) => {
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

exports.therapyDelete = (req, res) => {
  const data = {
    TherapyID: req.params.TherapyID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    therapyDelete(data.TherapyID, (error, results, status) => {
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
    therapyDeleteByTherapyIDNClientUserID(data, (error, results, status) => {
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
    therapyDeleteByTherapyIDNCenterUserID(data, (error, results, status) => {
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
    therapyDeleteByTherapyIDNTherapistUserID(data, (error, results, status) => {
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

getTherapyMappingList = (res, result, therapies) => {
  if (therapies.length) {
    therapyGoalsListByTherapies(therapies, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      result.Goals = results;
      therapySkillListByTherapies(therapies, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({
            success: false,
            errors: { message: error },
          });
        }
        result.TherapySkillMappings = results;
        return res.status(200).send({
          success: true,
          results: { data: result },
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
