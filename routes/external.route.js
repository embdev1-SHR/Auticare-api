const router = require("express").Router();
const { sign } = require("jsonwebtoken");
const { getCenterByApiKey } = require("../services/center.service");

router.post("/center-auth", (req, res) => {
  const { CenterApiKey } = req.body;
  if (!CenterApiKey) {
    return res.status(400).send({ success: false, errors: { message: "CenterApiKey is required" } });
  }

  getCenterByApiKey(CenterApiKey, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    if (!results.length) {
      return res.status(401).send({ success: false, errors: { message: "Invalid CenterApiKey" } });
    }

    const center = results[0];
    const token = sign(
      {
        CenterID: center.CenterID,
        ClientID: center.ClientID,
        CenterName: center.CenterName,
        UserID: center.UserID,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      success: true,
      results: {
        token,
        center: {
          CenterID: center.CenterID,
          CenterName: center.CenterName,
          CenterType: center.CenterType,
          ClientID: center.ClientID,
          ClientName: center.ClientName,
          CenterHeadName: center.CenterHeadName,
          CenterHeadEmailId: center.CenterHeadEmailId,
          CenterHeadPhone: center.CenterHeadPhone,
          UserID: center.UserID,
          EmailId: center.EmailId,
          Phone: center.Phone,
        },
      },
    });
  });
});

module.exports = router;
