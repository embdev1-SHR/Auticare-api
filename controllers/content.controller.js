const {
  contentList,
  contentCreate,
  contentUpdate,
  contentDelete,
  contentSearch,
  contentDetails,
  contentUpdateByCreate_By,
  contentListByClientUserID,
  contentListByCenterUserID,
  contentListByTherapistUserID,
  getContentByCreate_ByNContentId,
  contentDeleteByContentIDNClientUserID,
  contentDeleteByContentIDNCenterUserID,
  contentDetailsByContentIDNClientUserID,
  contentDetailsByContentIDNCenterUserID,
  contentDeleteByContentIDNTherapistUserID,
  contentDetailsByContentIDNTherapistUserID,
  contentSearchByContentActivityNameNClientUserID,
  contentSearchByContentActivityNameNCenterUserID,
  contentSearchByContentActivityNameNTherapistUserID,
  contentSkillList,
  contentTherapyList,
  contentSkillListByContents,
  contentTherapyListByContents,
  contentMediaDataCreate,
  contentMediaDatasList,
  contentMediaDatasListByTherapistUserID,
  contentMediaDatasListByCenterUserID,
  contentMediaDatasListByClientUserID,
  contentTutorialLinkCreate,
  contentTutorialLinkList,
  contentTutorialLinkListByClientUserID,
  contentTutorialLinkListByCenterUserID,
  contentTutorialLinkListByTherapistUserID,
  contentTutorialLinkDelete,
  contentTutorialLinkDeleteByTutorialLinkIDNClientUserID,
  contentTutorialLinkDeleteByTutorialLinkIDNCenterUserID,
  contentTutorialLinkDeleteByTutorialLinkIDNTherapistUserID,
  contentMediaDataUpdate,
  contentMediaDataUpdateByCreate_By,
  contentCountByClientUserID,
  contentCountByCenterUserID,
  contentCountByTherapistUserID,
} = require("../services/content.service");
const { subscriptionPlanDetailsByUserID } = require("../services/subscriptionPlan.service");

exports.contentList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentList((error, results) => {
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
    contentListByClientUserID(data.UserID, (error, results) => {
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
    contentListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentListByTherapistUserID(data.UserID, (error, results) => {
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

exports.contentMappingList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  let result = {};
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentSkillList((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      result.ContentSkillMappings = results;
      contentTherapyList((error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        result.ContentTherapyMappings = results;
        return res.status(200).send({
          success: true,
          results: { data: result },
        });
      });
    });
  } else if (data.RoleName == "ClientAdmin") {
    contentListByClientUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const contents = results.map((item) => item.ContentID);
      getContentMappingList(res, result, contents);
    });
  } else if (data.RoleName == "Center") {
    contentListByCenterUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const contents = results.map((item) => item.ContentID);
      getContentMappingList(res, result, contents);
    });
  } else if (data.RoleName == "Therapist") {
    contentListByTherapistUserID(data.UserID, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      const contents = results.map((item) => item.ContentID);
      getContentMappingList(res, result, contents);
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

exports.contentMediaDatasList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    ContentID: req.params.ContentID,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentMediaDatasList(data.ContentID, (error, results) => {
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
    contentMediaDatasListByClientUserID(data, (error, results) => {
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
    contentMediaDatasListByCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentMediaDatasListByTherapistUserID(data, (error, results) => {
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

exports.contentTutorialLinkList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    ContentID: req.params.ContentID,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentTutorialLinkList(data.ContentID, (error, results) => {
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
    contentTutorialLinkListByClientUserID(data, (error, results) => {
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
    contentTutorialLinkListByCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentTutorialLinkListByTherapistUserID(data, (error, results) => {
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

exports.contentDetails = (req, res) => {
  const data = {
    ContentID: req.params.ContentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentDetails(data.ContentID, (error, results) => {
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
    contentDetailsByContentIDNClientUserID(data, (error, results) => {
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
    contentDetailsByContentIDNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentDetailsByContentIDNTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  }
};

exports.contentSearch = (req, res) => {
  const data = {
    ContentActivityName: req.body.ContentActivityName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentSearch(data, (error, results) => {
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
    contentSearchByContentActivityNameNClientUserID(data, (error, results) => {
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
    contentSearchByContentActivityNameNCenterUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentSearchByContentActivityNameNTherapistUserID(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { data: results },
      });
    });
  }
};

exports.contentCreate = async (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    ContentType: ["SuperAdmin", "Admin"].includes(req.userData.RoleName) ? "Default" : "Custom",
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentCreate(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, errors: { message: error } });
      }
      return res.status(201).send({
        success: true,
        results: { message: results },
      });
    });
  } else {
    const subscriptionResults = (await subscriptionPlanDetailsByUserID(data.UserID))[0];
    let contentCount = 0;
    if (data.RoleName == "ClientAdmin") {
      contentCount = (await contentCountByClientUserID(data.UserID))[0].ContentCount;
    } else if (data.RoleName == "Center") {
      contentCount = (await contentCountByCenterUserID(data.UserID))[0].ContentCount;
    } else if (data.RoleName == "Therapist") {
      contentCount = (await contentCountByTherapistUserID(data.UserID))[0].ContentCount;
    }
    if (contentCount >= subscriptionResults.NumberofCustomContents) {
      return res.status(400).send({
        success: false,
        errors: { message: "The number of contents allowed in the subscription plan has already been created" },
      });
    } else {
      contentCreate(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ success: false, errors: { message: error } });
        }
        return res.status(201).send({
          success: true,
          results: { message: results },
        });
      });
    }
  }
};

exports.contentMediaDataCreate = (req, res) => {
  let data = {
    ...req.body,
    ContentID: req.params.ContentID,
    UserID: req.userData.UserID,
    ContentType: req.userData.RoleName == "SuperAdmin" ? "Default" : "Custom",
  };
  if (!data.MediaDatas.length) {
    return res.status(400).send({
      success: false,
      errors: { message: "MediaDatas array is empty" },
    });
  }
  contentMediaDataCreate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.contentTutorialLinkCreate = (req, res) => {
  let data = {
    ...req.body,
    ContentID: req.params.ContentID,
    UserID: req.userData.UserID,
    ContentType: req.userData.RoleName == "SuperAdmin" ? "Default" : "Custom",
  };
  if (!data.TutorialLinks.length) {
    return res.status(400).send({
      success: false,
      errors: { message: "TutorialLinks array is empty" },
    });
  }
  contentTutorialLinkCreate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({
      success: true,
      results: { message: results },
    });
  });
};

exports.contentUpdate = (req, res) => {
  const data = {
    ContentID: req.params.ContentID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    getContentByCreate_ByNContentId(data, (error, results) => {
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
      contentUpdateByCreate_By(data, (error, results, status) => {
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

exports.contentMediaDataUpdate = (req, res) => {
  const data = {
    MediaID: req.params.MediaID,
    ...req.body,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentMediaDataUpdate(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }

      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (["ClientAdmin", "Center", "Therapist"].includes(data.RoleName)) {
    contentMediaDataUpdateByCreate_By(data, (error, results, status) => {
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

exports.contentDelete = (req, res) => {
  const data = {
    ContentID: req.params.ContentID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentDelete(data.ContentID, (error, results, status) => {
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
    contentDeleteByContentIDNClientUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Center") {
    contentDeleteByContentIDNCenterUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentDeleteByContentIDNTherapistUserID(data, (error, results, status) => {
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

exports.contentTutorialLinkDelete = (req, res) => {
  const data = {
    TutorialLinkID: req.params.TutorialLinkID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin" || data.RoleName == "Admin") {
    contentTutorialLinkDelete(data.TutorialLinkID, (error, results, status) => {
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
    contentTutorialLinkDeleteByTutorialLinkIDNClientUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Center") {
    contentTutorialLinkDeleteByTutorialLinkIDNCenterUserID(data, (error, results, status) => {
      if (error) {
        console.log(error);
        return res.status(status || 500).send({ success: false, errors: { message: error } });
      }
      return res.status(200).send({
        success: true,
        results: { message: results },
      });
    });
  } else if (data.RoleName == "Therapist") {
    contentTutorialLinkDeleteByTutorialLinkIDNTherapistUserID(data, (error, results, status) => {
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

getContentMappingList = (res, result, contents) => {
  if (contents.length) {
    contentSkillListByContents(contents, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          errors: { message: error },
        });
      }
      result.ContentSkillMappings = results;
      contentTherapyListByContents(contents, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({
            success: false,
            errors: { message: error },
          });
        }
        result.ContentTherapyMappings = results;
        return res.status(200).send({
          success: true,
          results: { data: result },
        });
      });
    });
  } else {
    return res.status(200).send({
      success: true,
      results: { data: result },
    });
  }
};
