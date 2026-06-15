const {
  clientCreate,
  clientList,
  clientDetails,
  clientDetailsByUserID,
  clientUpdate,
  clientUpdateByUserID,
  clientOnboardByUserID,
  clientDelete,
  clientHardDelete,
  clientSearch,
  activateClientSubscription,
  deleteUnonboardedClient,
  assignSubscriptionByUserID,
} = require("../services/client.service");
const { hash } = require("bcrypt");
const { generatePassword } = require("../helpers/randomNumbers");
const {
  subscriptionPlanDetails,
} = require("../services/subscriptionPlan.service");
const { addDays } = require("../helpers/date");
const { sendMail } = require("../helpers/email");
const { welcomeMailHTML } = require("../helpers/consts");

exports.clientList = (req, res) => {
  const data = { UserID: req.userData.UserID, RoleName: req.userData.RoleName };
  if (data.RoleName == "SuperAdmin") {
    clientList((error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: {
          data: results,
        },
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

exports.clientDetails = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    ClientID: req.params.ClientID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    clientDetails(data.ClientID, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: {
          data: results.filter((result) => {
            if (result.UserID && result.ClientID) {
              return result;
            }
          }),
        },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    clientDetailsByUserID(data, (error, results) => {
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

exports.clientSearch = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    ClientName: req.body.ClientName,
    EmailId: req.body.EmailId,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    clientSearch(data, (error, results) => {
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

exports.clientCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    Bank: req.body.Bank ? req.body.Bank : null,
    BankAccountNumber: req.body.BankAccountNumber
      ? req.body.BankAccountNumber
      : null,
    Branch: req.body.Branch ? req.body.Branch : null,
    IFSCCode: req.body.IFSCCode ? req.body.IFSCCode : null,
    AddressLine2: req.body.AddressLine2 ? req.body.AddressLine2 : null,
    BillingAddressLine1: req.body.BillingAddressLine1
      ? req.body.BillingAddressLine1
      : null,
    BillingAddressLine2: req.body.BillingAddressLine2
      ? req.body.BillingAddressLine2
      : null,
    BillingCity: req.body.BillingCity ? req.body.BillingCity : null,
    BillingDistrict: req.body.BillingDistrict ? req.body.BillingDistrict : null,
    BillingPincode: req.body.BillingPincode ? req.body.BillingPincode : null,
    BillingState: req.body.BillingState ? req.body.BillingState : null,
    BillingCountry: req.body.BillingCountry ? req.body.BillingCountry : null,
    BankAccountNumber: req.body.BankAccountNumber
      ? req.body.BankAccountNumber
      : null,
  };
  if (data.RoleName == "SuperAdmin") {
    subscriptionPlanDetails(data.SubscriptionPlanId, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message:
              "Subscription Plan with provided SubscriptionPlanId not found",
          },
        });
      }
      data.NumberOfPlanActiveDays = results[0].NumberOfPlanActiveDays;
      const password = data.Password ? data.Password : generatePassword();
      hash(password, 10, (error, hash) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, errors: { message: error } });
        }
        data.Password = hash;
        clientCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .send({ success: false, errors: { message: error } });
          }
          sendMail(
            data,
            "Your Auticare Client Account",
            welcomeMailHTML({ EmailId: data.EmailId, Password: password, AccountType: "client account", Name: data.ClientName })
          ).finally(() => {
            res.status(201).send({
              success: true,
              results: { message: results },
            });
          });
        });
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

exports.clientUpdate = (req, res) => {
  const data = {
    ClientID: req.params.ClientID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UpdateSubscriptionPlan: [true, "true", "TRUE", 1, "1"].includes(
      req.body.UpdateSubscriptionPlan
    )
      ? 1
      : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    Bank: req.body.Bank ? req.body.Bank : null,
    BankAccountNumber: req.body.BankAccountNumber
      ? req.body.BankAccountNumber
      : null,
    Branch: req.body.Branch ? req.body.Branch : null,
    IFSCCode: req.body.IFSCCode ? req.body.IFSCCode : null,
    AddressLine2: req.body.AddressLine2 ? req.body.AddressLine2 : null,
    BillingAddressLine1: req.body.BillingAddressLine1
      ? req.body.BillingAddressLine1
      : null,
    BillingAddressLine2: req.body.BillingAddressLine2
      ? req.body.BillingAddressLine2
      : null,
    BillingCity: req.body.BillingCity ? req.body.BillingCity : null,
    BillingDistrict: req.body.BillingDistrict ? req.body.BillingDistrict : null,
    BillingPincode: req.body.BillingPincode ? req.body.BillingPincode : null,
    BillingState: req.body.BillingState ? req.body.BillingState : null,
    BillingCountry: req.body.BillingCountry ? req.body.BillingCountry : null,
    BankAccountNumber: req.body.BankAccountNumber
      ? req.body.BankAccountNumber
      : null,
  };
  if (data.UpdateSubscriptionPlan) {
    subscriptionPlanDetails(data.SubscriptionPlanId, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, errors: { message: error } });
      }
      if (!results.length) {
        return res.status(403).send({
          success: false,
          errors: {
            message:
              "Subscription Plan with provided SubscriptionPlanId not found",
          },
        });
      }
      data.SubscriptionPlanActivatedDate = new Date();
      data.SubcriptionPlanEndDate = addDays(results[0].NumberOfPlanActiveDays);
      updateClientFunction(data, res);
    });
  } else {
    data.SubscriptionPlanActivatedDate = null;
    data.SubcriptionPlanEndDate = null;
    updateClientFunction(data, res);
  }
};

exports.activateClientSubscription = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const data = {
    ClientID: req.params.ClientID,
    activatedDate: today.toISOString().split("T")[0],
    endDate: nextMonth.toISOString().split("T")[0],
  };
  activateClientSubscription(data, (error, results, status) => {
    if (error) {
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: results } });
  });
};

exports.clientDelete = (req, res) => {
  const data = {
    ClientID: req.params.ClientID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.query.Status) ? 1 : 0,
  };
  console.warn(data);
  if (data.RoleName == "SuperAdmin") {
    clientDelete(data, (error, results, status) => {
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
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.assignSubscription = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  const { SubscriptionPlanId } = req.body;
  if (!SubscriptionPlanId) {
    return res.status(400).send({ success: false, errors: { message: "SubscriptionPlanId is required" } });
  }
  subscriptionPlanDetails(SubscriptionPlanId, (error, results) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    if (!results.length) return res.status(404).send({ success: false, errors: { message: "Subscription plan not found" } });
    const plan = results[0];
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + plan.NumberOfPlanActiveDays);
    const data = {
      UserID: req.params.UserID,
      ClientName: req.body.ClientName || req.params.UserID,
      SubscriptionPlanId,
      activatedDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
    assignSubscriptionByUserID(data, (error, results) => {
      if (error) return res.status(500).send({ success: false, errors: { message: error } });
      return res.status(200).send({ success: true, results: { message: results } });
    });
  });
};

exports.deleteUnonboarded = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  deleteUnonboardedClient(req.params.UserID, (error, results, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: results } });
  });
};

exports.clientPermanentDelete = (req, res) => {
  const data = {
    ClientID: req.params.ClientID,
    RoleName: req.userData.RoleName,
  };
  clientHardDelete(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: results } });
  });
};

exports.clientOnboard = (req, res) => {
  if (req.userData.RoleName !== "ClientAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  const data = {
    UserID: req.userData.UserID,
    ClientName: req.body.ClientName,
    WebsiteURL: req.body.WebsiteURL || null,
    ClientType: req.body.ClientType,
    OrganizationType: req.body.OrganizationType || null,
    ContactPersonName: req.body.ContactPersonName,
    ContactPersonDesignation: req.body.ContactPersonDesignation || null,
    ContactEmailId: req.body.ContactEmailId || null,
    Phone: req.body.Phone || null,
    AddressLine1: req.body.AddressLine1 || null,
    AddressLine2: req.body.AddressLine2 || null,
    City: req.body.City || null,
    Pincode: req.body.Pincode || null,
    State: req.body.State || null,
    Country: req.body.Country || null,
    BillingAddressLine1: req.body.BillingAddressLine1 || null,
    BillingAddressLine2: req.body.BillingAddressLine2 || null,
    BillingCity: req.body.BillingCity || null,
    BillingDistrict: req.body.BillingDistrict || null,
    BillingPincode: req.body.BillingPincode || null,
    BillingState: req.body.BillingState || null,
    BillingCountry: req.body.BillingCountry || null,
    GSTNumber: req.body.GSTNumber || null,
    Bank: req.body.Bank || null,
    BankAccountNumber: req.body.BankAccountNumber || null,
    Branch: req.body.Branch || null,
    IFSCCode: req.body.IFSCCode || null,
  };
  clientOnboardByUserID(data, (error, results, status) => {
    if (error) {
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: results } });
  });
};

function updateClientFunction(data, res) {
  if (data.RoleName == "SuperAdmin") {
    clientUpdate(data, (error, results, status) => {
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
  } else if (data.RoleName == "ClientAdmin") {
    clientUpdateByUserID(data, (error, results, status) => {
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
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
}
