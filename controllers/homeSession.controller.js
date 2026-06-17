const { sign, verify } = require("jsonwebtoken");
const {
  homeSessionCreate,
  homeSessionUpdate,
  homeSessionListByTherapistUserID,
  homeSessionListByPatientUserID,
  homeSessionReadUpdate,
  homeSessionGetByID,
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

exports.homeSessionGenerateShareToken = (req, res) => {
  const HomeSessionID = parseInt(req.params.HomeSessionID, 10);
  if (!HomeSessionID) return res.status(400).send({ success: false, errors: { message: "HomeSessionID required" } });
  const token = sign(
    { HomeSessionID, purpose: "home-session-share" },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  return res.status(200).send({ success: true, results: { token } });
};

exports.homeSessionPublicView = (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send({ success: false, errors: { message: "Token is required" } });
  verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) return res.status(401).send({ success: false, errors: { message: "Link is invalid or has expired" } });
    if (payload.purpose !== "home-session-share")
      return res.status(401).send({ success: false, errors: { message: "Invalid token type" } });
    homeSessionGetByID(payload.HomeSessionID, (err, results) => {
      if (err) return res.status(500).send({ success: false, errors: { message: err } });
      if (!results.length) return res.status(404).send({ success: false, errors: { message: "Session not found" } });
      return res.status(200).send({ success: true, results: { data: results[0] } });
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
