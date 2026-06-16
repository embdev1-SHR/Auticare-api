const {
  storeEnquiryList,
  storeEnquiryDetails,
  storeEnquiryCreate,
  storeEnquiryUpdate,
  storeEnquiryDelete,
} = require("../services/storeEnquiry.service");

exports.storeEnquiryList = (req, res) => {
  storeEnquiryList((error, results) => {
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

exports.storeEnquiryDetails = (req, res) => {
  const data = {
    StoreEnquiryID: req.params.StoreEnquiryID,
  };
  storeEnquiryDetails(data.StoreEnquiryID, (error, results) => {
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

exports.storeEnquiryCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  storeEnquiryCreate(data, (error, results) => {
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

exports.storeEnquiryDelete = (req, res) => {
  const StoreEnquiryID = req.params.StoreEnquiryID;
  storeEnquiryDelete(StoreEnquiryID, (error, results, status) => {
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

exports.storeEnquiryUpdate = (req, res) => {
  const data = {
    StoreEnquiryID: req.params.StoreEnquiryID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    IsAdminViewed: [true, "true", "TRUE", 1, "1"].includes(req.body.IsAdminViewed) ? 1 : 0,
    UserID: req.userData.UserID,
  };
  storeEnquiryUpdate(data, (error, results, status) => {
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
