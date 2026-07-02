const router = require("express").Router();
const { pageAuthorisation } = require("../middleware/authorization");
const { getCenterByUserId } = require("../services/center.service");
const {
  getClasses, createClass, deleteClass,
  verifyClassPassword, getClassStudents, addStudentToClass, removeStudentFromClass,
  getActivitySummary, getHeatmapData, getCompletionTimeSeries,
} = require("../services/external.service");

const ALLOWED_ROLES = ["SuperAdmin", "ClientAdmin", "Center", "Therapist"];

// Resolves CenterID for the request.
// Center users: derived from their own UserID via centers table.
// ClientAdmin / SuperAdmin / Therapist: must pass ?centerID=X or body.centerID.
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

// ── Classes ──────────────────────────────────────────────────────────────────
router.get("/classes", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getClasses(req.resolvedCenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.post("/classes", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), resolveCenterID, (req, res) => {
  const { ClassName, password } = req.body;
  if (!ClassName || !password) return res.status(400).send({ success: false, errors: { message: "ClassName and password required" } });
  createClass(req.resolvedCenterID, ClassName, password, (error, result) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(201).send({ success: true, results: { data: result } });
  });
});

router.delete("/classes/:classId", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), resolveCenterID, (req, res) => {
  deleteClass(req.params.classId, req.resolvedCenterID, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

// ── Students ─────────────────────────────────────────────────────────────────
router.get("/classes/:classId/students", pageAuthorisation(ALLOWED_ROLES), resolveCenterID, (req, res) => {
  getClassStudents(req.params.classId, req.resolvedCenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.post("/classes/:classId/students", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), resolveCenterID, (req, res) => {
  const { PatientID, PatientName } = req.body;
  if (!PatientID || !PatientName) return res.status(400).send({ success: false, errors: { message: "PatientID and PatientName required" } });
  addStudentToClass(req.params.classId, req.resolvedCenterID, PatientID, PatientName, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

router.delete("/classes/:classId/students/:patientId", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), resolveCenterID, (req, res) => {
  removeStudentFromClass(req.params.classId, req.resolvedCenterID, req.params.patientId, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
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
