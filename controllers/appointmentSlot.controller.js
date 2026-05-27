const {
  appointmentSlotCreate,
  appointmentSlotListByTherapistUserID,
  appointmentSlotUpdateByTherapistUserID,
  appointmentSlotList,
  appointmentSlotListByTherapistID,
} = require("../services/appointmentSlot.service");
const { therapistDetailsByUserID } = require("../services/therapist.service");

exports.appointmentSlotList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    appointmentSlotListByTherapistUserID(data.UserID, (error, results) => {
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
    appointmentSlotList((error, results) => {
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

exports.appointmentSlotListByTherapistID = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    TherapistID: req.params.TherapistID,
    ...req.body,
  };
  appointmentSlotListByTherapistID(data.TherapistID, (error, results) => {
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
};

exports.appointmentSlotCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };

  therapistDetailsByUserID(data.UserID, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res
        .status(404)
        .send({ success: false, errors: { message: "Therapist not found" } });
    }
    data.TherapistID = results[0].TherapistID;
    appointmentSlotCreate(data, (error, results) => {
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
};

exports.appointmentSlotUpdate = (req, res) => {
  const data = {
    AppointmentSlotID: req.params.AppointmentSlotID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };

  appointmentSlotUpdateByTherapistUserID(data, (error, results, status) => {
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
