const { getDevLicence, regenerateDevLicence } = require("../services/devLicence.service");
const { hash } = require("bcrypt");
const {
  centerCreate,
  centerList,
  centerDetails,
  centerUpdate,
  centerUpdateByClientID,
  centerDelete,
  centerSearch,
  centerUpdateByUserID,
  centerDeleteByClientId,
  centerSearchByClientUserID,
  centerDetailsByCenterUserID,
  centerDetailsByClientUserID,
  centerListByClientUserID,
  regenerateCenterApiKey,
  generateApiKeysForAllCenters,
  updateCenterDeviceLimit,
} = require("../services/center.service");
const { getClientByClientId, getClientByUserId } = require("../services/client.service");
const { generatePassword } = require("../helpers/randomNumbers");
const { welcomeMailHTML } = require("../helpers/consts");
const { sendMail } = require("../helpers/email");

exports.centerList = (req, res) => {
  const data = { UserID: req.userData.UserID, RoleName: req.userData.RoleName };
  if (data.RoleName == "SuperAdmin") {
    centerList((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    centerListByClientUserID(data.UserID, (error, results) => {
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

exports.centerDetails = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    CenterID: req.params.CenterID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    centerDetails(data.CenterID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    centerDetailsByClientUserID(data, (error, results) => {
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
    centerDetailsByCenterUserID(data, (error, results) => {
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

exports.centerSearch = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    CenterName: req.body.CenterName,
    EmailId: req.body.EmailId,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    centerSearch(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    centerSearchByClientUserID(data, (error, results) => {
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

exports.centerCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  const password = data.Password ? data.Password : generatePassword();
  hash(password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    data.Password = hash;
    if (data.RoleName == "SuperAdmin") {
      getClientByClientId(data.ClientID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            errors: {
              message: "Client with provided ClientID not found",
            },
          });
        }
        centerCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          sendMail(data, "Your Auticare Center Account", welcomeMailHTML({ EmailId: data.EmailId, Password: password, AccountType: "center account", Name: data.CenterName })).finally(() => {
            res.status(201).send({
              success: true,
              results: { message: results },
            });
          });
        });
      });
    } else if (data.RoleName == "ClientAdmin") {
      getClientByUserId(data.UserID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            errors: {
              message: "Client with provided ClientID not found",
            },
          });
        }
        data.ClientID = results[0].ClientID;
        data.Status = 0;
        centerCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          res.status(201).send({
            success: true,
            results: { message: "Center submitted for admin approval" },
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
  });
};

exports.centerUpdate = (req, res) => {
  const data = {
    CenterID: req.params.CenterID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    centerUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
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
      data.ClientID = results[0].ClientID;
      centerUpdateByClientID(data, (error, results, status) => {
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
  } else if (data.RoleName == "Center") {
    centerUpdateByUserID(data, (error, results, status) => {
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

exports.centerDelete = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    CenterID: req.params.CenterID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    centerDelete(data.CenterID, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    getClientByUserId(data.UserID, (error, results) => {
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
      data.ClientID = results[0].ClientID;
      centerDeleteByClientId(data, (error, results, status) => {
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
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.regenerateApiKey = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  const CenterID = req.params.CenterID;
  regenerateCenterApiKey(CenterID, (error, result, status) => {
    if (error) {
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: result } });
  });
};

exports.generateApiKeys = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  generateApiKeysForAllCenters((error, result) => {
    if (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: `Generated API keys for ${result.updated} center(s)` } });
  });
};

exports.setDeviceLimit = (req, res) => {
  if (req.userData.RoleName !== "SuperAdmin") {
    return res.status(403).send({ success: false, errors: { message: "The user does not have access" } });
  }
  updateCenterDeviceLimit(req.params.CenterID, req.body.MaxDevices, (error, result, status) => {
    if (error) {
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: result } });
  });
};

/* ══════════════════════════════════════════════════════════════════════════
   DEVELOPER LICENCE
   Not a centre endpoint in anything but file placement: it returns the one
   internal key, and it is readable by the Auticare admin account alone.
   Anyone holding this key can activate the wall app anywhere, without limit,
   so the gate is the account AND the role, not either on its own.
   ══════════════════════════════════════════════════════════════════════════ */
const ADMIN_EMAIL = (process.env.DEV_LICENCE_ADMIN_EMAIL || "admin@auticare.com").toLowerCase();

function adminOnly(req, res) {
  const email = String(req.userData?.EmailId || "").toLowerCase();
  if (req.userData?.RoleName !== "SuperAdmin" || email !== ADMIN_EMAIL) {
    /* 404, not 403: a 403 confirms the endpoint exists to anyone who probes
       it. There is nothing here to find unless you are the admin. */
    res.status(404).send({ success: false, errors: { message: "Not found" } });
    return false;
  }
  return true;
}

exports.viewDevLicence = (req, res) => {
  if (!adminOnly(req, res)) return;
  getDevLicence((error, result) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: result } });
  });
};

exports.regenerateDevLicenceKey = (req, res) => {
  if (!adminOnly(req, res)) return;
  regenerateDevLicence((error, result) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: result } });
  });
};
