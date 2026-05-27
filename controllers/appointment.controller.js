const {
  appointmentCreate,
  appointmentUpdateByTherapistID,
  appointmentListByTherapistUserID,
  appointmentDetailsByAppointmentIDNTherapistUserID,
  appointmentSearchByAppointmentNameNTherapistUserID,
  appointmentListByPatientUserID,
  appointmentApproveByTherapistID,
  appointmentUpdateByPatientUserID,
  appointmentUpcomingByPatientUserID,
  appointmentUpcomingByTherapistUserID,
  appointmentUploadsCreate,
  appointmentUploadDeleteByAppointmentIDNPatientUserID,
  appointmentUploadDeleteByAppointmentIDNTherapistUserID,
  appointmentUploadsListByTherapistUserIDNAppointmentID,
  appointmentUploadsListByPatientUserIDNAppointmentID,
  appointmentListByCenterUserID,
  appointmentList,
} = require("../services/appointment.service");
const { patientDetailsByUserID } = require("../services/patient.service");

exports.appointmentList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    appointmentList((error, results) => {
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
    appointmentListByCenterUserID(data.UserID, (error, results) => {
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
    appointmentListByTherapistUserID(data.UserID, (error, results) => {
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
    appointmentListByPatientUserID(data.UserID, (error, results) => {
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

exports.appointmentUploadsList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    AppointmentID: req.params.AppointmentID,
  };
  if (data.RoleName == "Therapist") {
    appointmentUploadsListByTherapistUserIDNAppointmentID(data, (error, results) => {
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
    appointmentUploadsListByPatientUserIDNAppointmentID(data, (error, results) => {
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

exports.appointmentUpcoming = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    appointmentUpcomingByTherapistUserID(data.UserID, (error, results) => {
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
    appointmentUpcomingByPatientUserID(data.UserID, (error, results) => {
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

exports.appointmentSearch = (req, res) => {
  const data = {
    AppointmentName: req.body.AppointmentName,
    UserID: req.userData.UserID,
  };
  appointmentSearchByAppointmentNameNTherapistUserID(data, (error, results) => {
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

exports.appointmentCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  patientDetailsByUserID(data.UserID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(404).send({ success: false, errors: { message: "Patient not found" } });
    }
    data.PatientID = results[0].PatientID;
    appointmentCreate(data, (error, results) => {
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
};

exports.appointmentUploadsCreate = (req, res) => {
  let data = {
    ...req.body,
    AppointmentID: req.params.AppointmentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    UserType: req.userData.RoleName,
  };

  appointmentUploadsCreate(data, (error, results) => {
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

exports.appointmentUpdate = (req, res) => {
  const data = {
    AppointmentID: req.params.AppointmentID,
    AppointmentStatus: req.body.AppointmentStatus,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "Therapist") {
    appointmentDetailsByAppointmentIDNTherapistUserID(data, (error, results) => {
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
      data.TherapistID = results[0].TherapistID;
      appointmentUpdateByTherapistID(data, (error, results, status) => {
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
    appointmentUpdateByPatientUserID(data, (error, results, status) => {
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

exports.appointmentApprove = (req, res) => {
  const data = {
    AppointmentID: req.params.AppointmentID,
    ...req.body,
    UserID: req.userData.UserID,
  };
  appointmentDetailsByAppointmentIDNTherapistUserID(data, (error, results) => {
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
    data.TherapistID = results[0].TherapistID;
    appointmentApproveByTherapistID(data, (error, results, status) => {
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
};

exports.appointmentUploadsDelete = (req, res) => {
  const data = {
    AppointmentID: req.params.AppointmentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  // TODO: delete object from aws
  if (data.RoleName == "Therapist") {
    appointmentUploadDeleteByAppointmentIDNTherapistUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Patient") {
    appointmentUploadDeleteByAppointmentIDNPatientUserID(data, (error, results, status) => {
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
