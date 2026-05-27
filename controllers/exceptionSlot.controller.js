const {
  exceptionSlotCreate,
  exceptionSlotListByTherapistUserID,
  exceptionSlotUpdateByTherapistUserID,
} = require("../services/exceptionSlot.service");
const { therapistDetailsByUserID } = require("../services/therapist.service");

exports.exceptionSlotList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  exceptionSlotListByTherapistUserID(data.UserID, (error, results) => {
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

exports.exceptionSlotCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
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
    exceptionSlotCreate(data, (error, results) => {
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

exports.exceptionSlotUpdate = (req, res) => {
  const data = {
    ExceptionSlotID: req.params.ExceptionSlotID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };

  exceptionSlotUpdateByTherapistUserID(data, (error, results, status) => {
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
