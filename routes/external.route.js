const router = require("express").Router();
const { verify, sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { getCenterByApiKey } = require("../services/center.service");
const { getUserByEmailId } = require("../services/users.service");
const {
  registerDevice, checkDevice, touchDevice,
  getClasses, createClass, deleteClass,
  verifyClassPassword, getClassStudents, addStudentToClass, removeStudentFromClass,
  logActivity, getActivitySummary, getHeatmapData, getCompletionTimeSeries,
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
    if (error === "CONFLICT") return res.status(409).send({ success: false, errors: { message: "This center or device is already bound to another machine." } });
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
// OPERATOR LOGIN  (center JWT required)
// POST /api/v1/external/login   body: { username, password }
// ══════════════════════════════════════════════════════════════════════════════
router.post("/login", verifyCenterToken, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ success: false, errors: { message: "username and password required" } });

  getUserByEmailId(username, (error, results) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    if (!results || !results.length) return res.status(401).send({ success: false, errors: { message: "Invalid credentials" } });

    const user = results[0];
    compare(password, user.Password, (err, match) => {
      if (err || !match) return res.status(401).send({ success: false, errors: { message: "Invalid credentials" } });
      return res.status(200).send({
        success: true,
        results: { operator: { UserID: user.UserID, UserName: user.UserName, EmailId: user.EmailId, RoleId: user.RoleId } }
      });
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// CLASSES  (center JWT required)
// GET    /api/v1/external/classes
// POST   /api/v1/external/classes              body: { ClassName, password }
// DELETE /api/v1/external/classes/:classId
// POST   /api/v1/external/classes/verify       body: { ClassID, password }
// ══════════════════════════════════════════════════════════════════════════════
router.get("/classes", verifyCenterToken, (req, res) => {
  getClasses(req.centerData.CenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: rows });
  });
});

router.post("/classes", verifyCenterToken, (req, res) => {
  const { ClassName, password } = req.body;
  if (!ClassName || !password) return res.status(400).send({ success: false, errors: { message: "ClassName and password required" } });
  createClass(req.centerData.CenterID, ClassName, password, (error, result) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(201).send({ success: true, results: result });
  });
});

router.delete("/classes/:classId", verifyCenterToken, (req, res) => {
  deleteClass(req.params.classId, req.centerData.CenterID, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

router.post("/classes/verify", verifyCenterToken, (req, res) => {
  const { ClassID, password } = req.body;
  if (!ClassID || !password) return res.status(400).send({ success: false, errors: { message: "ClassID and password required" } });
  verifyClassPassword(ClassID, req.centerData.CenterID, password, (error, match, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    if (!match) return res.status(401).send({ success: false, errors: { message: "Wrong class password" } });
    return res.status(200).send({ success: true, results: { message: "ok" } });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// CLASS STUDENTS  (center JWT required)
// GET    /api/v1/external/classes/:classId/students
// POST   /api/v1/external/classes/:classId/students  body: { PatientID, PatientName }
// DELETE /api/v1/external/classes/:classId/students/:patientId
// ══════════════════════════════════════════════════════════════════════════════
router.get("/classes/:classId/students", verifyCenterToken, (req, res) => {
  getClassStudents(req.params.classId, req.centerData.CenterID, (error, rows) => {
    if (error) return res.status(500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: rows });
  });
});

router.post("/classes/:classId/students", verifyCenterToken, (req, res) => {
  const { PatientID, PatientName } = req.body;
  if (!PatientID || !PatientName) return res.status(400).send({ success: false, errors: { message: "PatientID and PatientName required" } });
  addStudentToClass(req.params.classId, req.centerData.CenterID, PatientID, PatientName, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

router.delete("/classes/:classId/students/:patientId", verifyCenterToken, (req, res) => {
  removeStudentFromClass(req.params.classId, req.centerData.CenterID, req.params.patientId, (error, msg, status) => {
    if (error) return res.status(status || 500).send({ success: false, errors: { message: error } });
    return res.status(200).send({ success: true, results: { message: msg } });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// PATIENT ACTIVITY  (center JWT — Electron fires these)
// POST /api/v1/external/patient-activity
// ══════════════════════════════════════════════════════════════════════════════
router.post("/patient-activity", verifyCenterToken, (req, res) => {
  const { StudentID, ClassID, eventType, data = {} } = req.body;
  if (!eventType) return res.status(400).send({ success: false, errors: { message: "eventType required" } });

  logActivity({
    CenterID: req.centerData.CenterID,
    PatientID: StudentID || null,
    ClassID: ClassID || null,
    SessionMode: StudentID ? "individual" : "class",
    EventType: eventType,
    X: data.x, Y: data.y,
    ScreenWidth: data.screenWidth, ScreenHeight: data.screenHeight,
    ScenarioID: data.scenarioId, CompletionPct: data.completionPct,
    DurationMs: data.durationMs, GameKey: data.gameKey,
  }, (error) => {
    if (error) {
      console.error("[blueroom-event]", error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// BLUEROOM ANALYTICS  (center JWT — Blueroom dashboard reads these)
// GET /api/v1/external/blueroom/activity    ?patientId&classId&from&to&limit
// GET /api/v1/external/blueroom/heatmap     ?patientId&classId&from&to
// GET /api/v1/external/blueroom/timeseries  ?patientId&classId&from&to
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
