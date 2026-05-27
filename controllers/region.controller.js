const { regionList, regionDetails } = require("../services/region.service");

exports.regionList = (req, res) => {
  regionList((error, results) => {
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

exports.regionDetails = (req, res) => {
  const data = {
    RegionID: req.params.RegionID,
    UserID: req.userData.UserID,
  };
  regionDetails(data.RegionID, (error, results) => {
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
