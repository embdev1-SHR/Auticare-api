exports.pageAuthorisation = (permittedRoles) => {
  return (req, res, next) => {
    const data = {
      RoleName: req.userData?.RoleName,
    };
    if (permittedRoles.includes(data.RoleName)) {
      next();
    } else {
      return res.status(403).send({
        success: false,
        errors: {
          message: "The user does not have access rights to the content",
        },
      });
    }
  };
};
