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
          sendMail(data, "Login Credentials", welcomeMailHTML({ EmailId: data.EmailId, Password: password }));
          return res.status(201).send({
            success: true,
            results: { message: results },
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
        centerCreate(data, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ success: false, errors: { message: error } });
          }
          sendMail(data, "Login Credentials", welcomeMailHTML({ EmailId: data.EmailId, Password: password }));
          return res.status(201).send({
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
