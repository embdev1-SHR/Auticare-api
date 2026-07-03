const router = require("express").Router();
const { verify, sign } = require("jsonwebtoken");
const { getCenterByApiKey } = require("../services/center.service");
const {
  registerDevice, checkDevice, touchDevice,
  getClasses, setDepartmentAuth, getDepartmentCredentials, loginWithDepartmentAuth,
  getClassStudents,
  logActivity, getActivitySummary, getHeatmapData, getCompletionTimeSeries,
  startSession, heartbeatSession, endSession,
} = require("../services/external.service");

// ── Middleware: verify center JWT ────────────────────────────────────────────
function verifyCenterToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).send({ success: false, errors: { message: "Authorization header required" } });
  const token = header.split(" ")[1];
  verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).send({ success: false, errors: { message: "Invalid or expired token" } });
    if (!payload.CenterID) return res.status(401).send({ success: false, errors: { message: "Not a center token" } });
    req.centerData = payload; // { CenterID, ClientID, CenterName, UserID }
    next();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/v1/external/center-auth  (no auth)
// ══════════════════════════════════════════════════════════════════════════════
router.post("/center-auth", (req, res) => {
  const { CenterApiKey } = req.body;
  if (!CenterApiKey) return res.status(400).send({ success: false, errors: { message: "CenterApiKey is required" } });

  getCenterByApiKey(CenterApiKey, (error, results) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    if (!results.length) return res.status(401).send({ success: false, errors: { message: "Invalid CenterApiKey" } });

    const center = results[0];
    const token = sign(
      { CenterID: center.CenterID, ClientID: center.ClientID, CenterName: center.CenterName, UserID: center.UserID },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      success: true,
      results: {
        token,
        center: {
          CenterID: center.CenterID, CenterName: center.CenterName, CenterType: center.CenterType,
          ClientID: center.ClientID, ClientName: center.ClientName,
          CenterHeadName: center.CenterHeadName, CenterHeadEmailId: center.CenterHeadEmailId,
          CenterHeadPhone: center.CenterHeadPhone, UserID: center.UserID,
          EmailId: center.EmailId, Phone: center.Phone,
        },
      },
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// DEVICE REGISTRATION  (no auth)
// POST /api/v1/external/device-register   body: { CenterID, deviceId, CenterName? }
// GET  /api/v1/external/device-check      query: ?deviceId=...
// ══════════════════════════════════════════════════════════════════════════════
router.post("/device-register", (req, res) => {
  const { CenterID, deviceId, CenterName } = req.body;
  if (!CenterID || !deviceId) return res.status(400).send({ success: false, errors: { message: "CenterID and deviceId required" } });

  registerDevice(CenterID, deviceId, CenterName || "", (error) => {
    if (error === "CONFLICT") return res.status(409).send({ success: false, errors: { message: "This device is already bound to another center." } });
    if (error === "LIMIT") return res.status(409).send({ success: false, errors: { message: "This center has reached its device limit. Ask an admin to raise it." } });
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: "Device registered" } });
  });
});

router.get("/device-check", (req, res) => {
  const { deviceId } = req.query;
  if (!deviceId) return res.status(400).send({ success: false, errors: { message: "deviceId required" } });

  checkDevice(deviceId, (error, row) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    if (row) touchDevice(deviceId);
    return res.status(200).send({ success: true, results: { data: row } });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// DEPARTMENT LOGIN  (center JWT required)
// POST /api/v1/external/login   body: { username, password }
// Returns the matched department so the Electron can skip class selection.
// ══════════════════════════════════════════════════════════════════════════════
router.post("/login", verifyCenterToken, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ success: false, errors: { message: "username and password required" } });

  loginWithDepartmentAuth(req.centerData.CenterID, username, password, (error, dept, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({
      success: true,
      results: {
        department: {
          DepartmentID: dept.DepartmentID,
          DepartmentName: dept.DepartmentName,
        }
      }
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// CLASSES (departments)  (center JWT required)
// GET  /api/v1/external/classes
// GET  /api/v1/external/classes/credentials
// POST /api/v1/external/classes/:classId/auth   body: { username, password }
// ══════════════════════════════════════════════════════════════════════════════
router.get("/classes", verifyCenterToken, (req, res) => {
  getClasses(req.centerData.CenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: rows });
  });
});

router.get("/classes/credentials", verifyCenterToken, (req, res) => {
  getDepartmentCredentials(req.centerData.CenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: rows });
  });
});

router.post("/classes/:classId/auth", verifyCenterToken, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ success: false, errors: { message: "username and password required" } });
  setDepartmentAuth(req.centerData.CenterID, req.params.classId, username, password, (error, msg) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// CLASS STUDENTS  (center JWT required) — auto-derived from patients' DepartmentID
// GET /api/v1/external/classes/:classId/students
// ══════════════════════════════════════════════════════════════════════════════
router.get("/classes/:classId/students", verifyCenterToken, (req, res) => {
  getClassStudents(req.params.classId, req.centerData.CenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: rows });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// LIVE SESSION LIFECYCLE  (center JWT — Electron drives these)
// POST /api/v1/external/session/start      body: { sessionId, StudentID?, PatientName?, ClassID?, ClassName?, mode, deviceId? }
// POST /api/v1/external/session/heartbeat  body: { sessionId, currentActivity? }
// POST /api/v1/external/session/end        body: { sessionId }
// ══════════════════════════════════════════════════════════════════════════════
router.post("/session/start", verifyCenterToken, (req, res) => {
  const { sessionId, StudentID, PatientName, ClassID, ClassName, mode, deviceId, currentActivity } = req.body;
  if (!sessionId) return res.status(400).send({ success: false, errors: { message: "sessionId required" } });
  startSession({
    SessionID: sessionId,
    CenterID: req.centerData.CenterID,
    PatientID: StudentID || null,
    PatientName: PatientName || null,
    ClassID: ClassID || null,
    ClassName: ClassName || null,
    SessionMode: mode || null,
    DeviceID: deviceId || null,
    CurrentActivity: currentActivity || null,
  }, (error, result) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: result });
  });
});

router.post("/session/heartbeat", verifyCenterToken, (req, res) => {
  const { sessionId, currentActivity } = req.body;
  if (!sessionId) return res.status(400).send({ success: false, errors: { message: "sessionId required" } });
  heartbeatSession(sessionId, req.centerData.CenterID, currentActivity, (error) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true });
  });
});

router.post("/session/end", verifyCenterToken, (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).send({ success: false, errors: { message: "sessionId required" } });
  endSession(sessionId, req.centerData.CenterID, (error) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// PATIENT ACTIVITY  (center JWT)
// POST /api/v1/external/patient-activity
// ══════════════════════════════════════════════════════════════════════════════
router.post("/patient-activity", verifyCenterToken, (req, res) => {
  const { sessionId, StudentID, ClassID, mode, eventType, data = {} } = req.body;
  if (!eventType) return res.status(400).send({ success: false, errors: { message: "eventType required" } });

  logActivity({
    CenterID: req.centerData.CenterID,
    SessionID: sessionId || null,
    PatientID: StudentID || null,
    ClassID: ClassID || null,
    SessionMode: mode || (StudentID ? "individual" : "class"),
    EventType: eventType,
    X: data.x, Y: data.y,
    ScreenWidth: data.screenWidth, ScreenHeight: data.screenHeight,
    ScenarioID: data.scenarioId, CompletionPct: data.completionPct,
    DurationMs: data.durationMs, GameKey: data.gameKey, Label: data.label,
  }, (error) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// BLUEROOM ANALYTICS  (center JWT)
// ══════════════════════════════════════════════════════════════════════════════
router.get("/blueroom/activity", verifyCenterToken, (req, res) => {
  getActivitySummary(req.centerData.CenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.get("/blueroom/heatmap", verifyCenterToken, (req, res) => {
  getHeatmapData(req.centerData.CenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

router.get("/blueroom/timeseries", verifyCenterToken, (req, res) => {
  getCompletionTimeSeries(req.centerData.CenterID, req.query, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { data: rows } });
  });
});

module.exports = router;
