const router = require("express").Router();
const { pageAuthorisation } = require("../middleware/authorization");
const { getCenterByUserId } = require("../services/center.service");
const {
  getClasses, setDepartmentAuth, getDepartmentCredentials,
  getClassStudents,
  getActivitySummary, getHeatmapData, getCompletionTimeSeries,
} = require("../services/external.service");

const ALLOWED_ROLES = ["SuperAdmin", "ClientAdmin", "Center", "Therapist"];

function resolveCenterID(req, res, next) {
  if (req.userData.RoleName === "Center") {
    getCenterByUserId(req.userData.UserID, (error, rows) => {
      if (error || !rows.length) return res.status(400).send({ success: false, errors: { message: "Center not found for this user" } });
      req.resolvedCenterID = rows[0].CenterID;
      next();
    });
  } else {
    const id = req.query.centerID || req.body.centerID;
    if (!id) return res.status(400).send({ success: false, errors: { message: "centerID is required for this role" } });
    req.resolvedCenterID = parseInt(id, 10);
    next();
  }
}

// ── Classes (departments) ─────────────────────────────────────────────────────
router.get("/classes", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getClasses(req.resolvedCenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.get("/classes/credentials", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getDepartmentCredentials(req.resolvedCenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.post("/classes/:classId/auth", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), resolveCenterID, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ success: false, errors: { message: "username and password required" } });
  setDepartmentAuth(req.resolvedCenterID, req.params.classId, username, password, (error, msg) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

// ── Students ── auto-derived from patients assigned to the department ──────────
router.get("/classes/:classId/students", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getClassStudents(req.params.classId, req.resolvedCenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

// ── Analytics ─────────────────────────────────────────────────────────────────
router.get("/activity", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getActivitySummary(req.resolvedCenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.get("/heatmap", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getHeatmapData(req.resolvedCenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.get("/timeseries", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getCompletionTimeSeries(req.resolvedCenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

module.exports = router;
