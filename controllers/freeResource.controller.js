const {
  freeResourceList,
  freeResourceDetails,
  freeResourceCreate,
  freeResourceUpdate,
  freeResourceClickUpdate,
} = require("../services/freeResource.service");

exports.freeResourceList = (req, res) => {
  freeResourceList((error, results) => {
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

exports.freeResourceDetails = (req, res) => {
  const data = {
    FreeResourceID: req.params.FreeResourceID,
  };
  freeResourceDetails(data.FreeResourceID, (error, results) => {
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

exports.freeResourceCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  freeResourceCreate(data, (error, results) => {
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

exports.freeResourceUpdate = (req, res) => {
  const data = {
    FreeResourceID: req.params.FreeResourceID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };
  freeResourceUpdate(data, (error, results, status) => {
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

exports.freeResourceClickUpdate = (req, res) => {
  const data = {
    FreeResourceID: req.params.FreeResourceID,
    UserID: req.userData.UserID,
  };
  freeResourceClickUpdate(data, (error, results, status) => {
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
