const {
  subscriptionPlanList,
  subscriptionPlanDetails,
  subscriptionPlanCreate,
  subscriptionPlanUpdate,
  subscriptionPlanDelete,
} = require("../services/subscriptionPlan.service");

exports.subscriptionPlanList = (req, res) => {
  subscriptionPlanList((error, results) => {
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

exports.subscriptionPlanDetails = (req, res) => {
  const data = {
    SubscriptionPlanId: req.params.SubscriptionPlanId,
  };
  subscriptionPlanDetails(data.SubscriptionPlanId, (error, results) => {
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

exports.subscriptionPlanCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  subscriptionPlanCreate(data, (error, results) => {
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

exports.subscriptionPlanDelete = (req, res) => {
  const SubscriptionPlanID = req.params.SubscriptionPlanId;
  subscriptionPlanDelete(SubscriptionPlanID, (error, results, status) => {
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

exports.subscriptionPlanUpdate = (req, res) => {
  const data = {
    SubscriptionPlanId: req.params.SubscriptionPlanId,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
  };
  subscriptionPlanUpdate(data, (error, results, status) => {
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
