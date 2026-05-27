const {
  probdataCreate,
  probdataListByPatientIDNTherapistUserID,
  probdataUpdateByCreate_By,
  probdataResponseCreate,
  probdataResponseListByPatientIDNTherapistUserID,
  probdataListByPatientUserID,
  probdataResponseListByPatientUserID,
} = require("../services/probdata.service");

exports.probdataList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    probdataListByPatientIDNTherapistUserID(data, (error, results) => {
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
  } else if (data.RoleName == "Patient") {
    probdataListByPatientUserID(data.UserID, (error, results) => {
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

exports.probdataResponseList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
    RoleName: req.userData.RoleName,
  };

  if (data.RoleName == "Therapist") {
    probdataResponseListByPatientIDNTherapistUserID(data, (error, results) => {
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
  } else if (data.RoleName == "Patient") {
    probdataResponseListByPatientUserID(data.UserID, (error, results) => {
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

exports.probdataCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  probdataCreate(data, (error, results) => {
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
};

exports.probdataResponseCreate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    PatientID: req.params.PatientID,
  };
  probdataResponseCreate(data, (error, results) => {
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
};

exports.probdataUpdate = (req, res) => {
  const data = {
    ...req.body,
    ProbdataID: req.params.ProbdataID,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    IsAchieved: [true, "true", "TRUE", 1, "1"].includes(req.body.IsAchieved)
      ? 1
      : 0,
    UserID: req.userData.UserID,
  };
  probdataUpdateByCreate_By(data, (error, results, status) => {
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
};
