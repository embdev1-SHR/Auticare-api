const {
  paymentList,
  paymentDetails,
  paymentCreate,
  paymentUpdate,
} = require("../services/payment.service");

exports.paymentList = (req, res) => {
  paymentList((error, results) => {
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

exports.paymentDetails = (req, res) => {
  const data = {
    PaymentID: req.params.PaymentID,
  };
  paymentDetails(data.PaymentID, (error, results) => {
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

exports.paymentCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  paymentCreate(data, (error, results) => {
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

exports.paymentUpdate = (req, res) => {
  const data = {
    PaymentID: req.params.PaymentID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };
  paymentUpdate(data, (error, results, status) => {
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
