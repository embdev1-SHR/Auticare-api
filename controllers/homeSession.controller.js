const {
  homeSessionCreate,
  homeSessionUpdate,
  homeSessionListByTherapistUserID,
  homeSessionListByPatientUserID,
  homeSessionReadUpdate,
} = require("../services/homeSession.service");

exports.homeSessionList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    PatientID: req.params.PatientID,
  };
  if (data.RoleName == "Therapist") {
    homeSessionListByTherapistUserID(data, (error, results) => {
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
    homeSessionListByPatientUserID(data.UserID, (error, results) => {
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

exports.homeSessionCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  homeSessionCreate(data, (error, results) => {
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

exports.homeSessionUpdate = (req, res) => {
  const data = {
    HomeSessionID: req.params.HomeSessionID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };
  homeSessionUpdate(data, (error, results, status) => {
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

exports.homeSessionReadUpdate = (req, res) => {
  const data = {
    ...req.body,
    HomeSessionID: req.params.HomeSessionID,
    UserID: req.userData.UserID,
  };
  homeSessionReadUpdate(data, (error, results, status) => {
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
