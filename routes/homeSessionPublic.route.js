const router = require("express").Router();
const { homeSessionPublicView } = require("../controllers/homeSession.controller");

// Public endpoint — no auth middleware — returns session data for a signed share token
router.get("/share/view", homeSessionPublicView);

module.exports = router;
