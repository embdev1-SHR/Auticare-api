const { moduleRoleBasedList } = require("../services/module.service");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");

exports.userDetails = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    EmailId: req.userData.EmailId,
    RoleID: req.userData.RoleID,
  };
  moduleRoleBasedList(data.RoleID, async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
      try {
        const subscriptionResults = await subscriptionPlanDetailsByUserID(data.UserID);
        return res.status(200).send({
          success: true,
          results: {
            data: {
              ...data,
              RoleBasedModules: results,
              SubscriptionPlan: subscriptionResults,
            },
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
    } else {
      return res.status(200).send({
        success: true,
        results: {
          data: {
            ...data,
            RoleBasedModules: results,
            SubscriptionPlan: null,
          },
        },
      });
    }
  });
};
