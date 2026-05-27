const {
  categoryCreate,
  categoryList,
  categoryDetails,
  categoryUpdate,
  categoryUpdateByCreate_By,
  categoryDelete,
  categorySearch,
  getCategoryByCreate_ByNCategoryId,
  // categoryListByClientUserID,
  // categoryListByCenterUserID,
  // categoryListByTherapistUserID,
  // categoryDetailsByCategoryIDNClientUserID,
  // categoryDetailsByCategoryIDNCenterUserID,
  // categoryDetailsByCategoryIDNTherapistUserID,
  // categorySearchByCategoryNameNClientUserID,
  // categorySearchByCategoryNameNCenterUserID,
  // categorySearchByCategoryNameNTherapistUserID,
  categoryDeleteByCategoryIDNClientUserID,
  categoryDeleteByCategoryIDNCenterUserID,
  categoryDeleteByCategoryIDNTherapistUserID,
  categoryListByScaleID,
  // categoryListByClientUserIDNScaleID,
  // categoryListByCenterUserIDNScaleID,
  // categoryListByTherapistUserIDNScaleID,
} = require("../services/category.service");

exports.categoryList = (req, res) => {
  // const data = {
  //   UserID: req.userData.UserID,
  //   RoleName: req.userData.RoleName,
  // };
  // if (data.RoleName == "SuperAdmin") {
  categoryList((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
  // } else if (data.RoleName == "ClientAdmin") {
  //   categoryListByClientUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Center") {
  //   categoryListByCenterUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Therapist") {
  //   categoryListByTherapistUserID(data.UserID, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else {
  //   return res.status(403).send({
  //     success: false,
  //     errors: {
  //       message: "The user does not have access",
  //     },
  //   });
  // }
};

exports.categoryListByScaleID = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
    ScaleID: req.params.ScaleID,
  };
  // if (data.RoleName == "SuperAdmin") {
  categoryListByScaleID(data.ScaleID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
  // } else if (data.RoleName == "ClientAdmin") {
  //   categoryListByClientUserIDNScaleID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res
  //         .status(500)
  //         .send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Center") {
  //   categoryListByCenterUserIDNScaleID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res
  //         .status(500)
  //         .send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Therapist") {
  //     categoryListByTherapistUserIDNScaleID(data)
  //       .then((results) => {
  //         return res.status(200).send({
  //           success: true,
  //           results: { data: results },
  //         });
  //       })
  //       .catch((error) => {
  //         return res.status(500).send({ success: false, errors: { message: error } });
  //       });
  // } else {
  //   return res.status(403).send({
  //     success: false,
  //     errors: {
  //       message: "The user does not have access",
  //     },
  //   });
  // }
};

exports.categoryDetails = (req, res) => {
  const data = {
    CategoryID: req.params.CategoryID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  // if (data.RoleName == "SuperAdmin") {
  categoryDetails(data.CategoryID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
  // } else if (data.RoleName == "ClientAdmin") {
  //   categoryDetailsByCategoryIDNClientUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Center") {
  //   categoryDetailsByCategoryIDNCenterUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Therapist") {
  //   categoryDetailsByCategoryIDNTherapistUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // }
};

exports.categorySearch = (req, res) => {
  const data = {
    CategoryName: req.body.CategoryName,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  // if (data.RoleName == "SuperAdmin") {
  categorySearch(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
  // } else if (data.RoleName == "ClientAdmin") {
  //   categorySearchByCategoryNameNClientUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Center") {
  //   categorySearchByCategoryNameNCenterUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // } else if (data.RoleName == "Therapist") {
  //   categorySearchByCategoryNameNTherapistUserID(data, (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).send({ success: false, errors: { message: error } });
  //     }
  //     return res.status(200).send({
  //       success: true,
  //       results: { data: results },
  //     });
  //   });
  // }
};

exports.categoryCreate = (req, res) => {
  let data = {
    ...req.body,
    UserID: req.userData.UserID,
    CategoryLabel: req.body.CategoryLabel ? req.body.CategoryLabel : null,
  };
  categoryCreate(data, (error, results) => {
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

exports.categoryUpdate = (req, res) => {
  const data = {
    CategoryID: req.params.CategoryID,
    CategoryName: req.body.CategoryName,
    Status: [true, "true", "TRUE", 1, "1"].includes(req.body.Status) ? 1 : 0,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    categoryUpdate(data, (error, results, status) => {
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
    getCategoryByCreate_ByNCategoryId(data, (error, results) => {
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
      categoryUpdateByCreate_By(data, (error, results, status) => {
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

exports.categoryDelete = (req, res) => {
  const data = {
    CategoryID: req.params.CategoryID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    categoryDelete(data.CategoryID, (error, results, status) => {
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
    categoryDeleteByCategoryIDNClientUserID(data, (error, results, status) => {
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
    categoryDeleteByCategoryIDNCenterUserID(data, (error, results, status) => {
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
    categoryDeleteByCategoryIDNTherapistUserID(data, (error, results, status) => {
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
