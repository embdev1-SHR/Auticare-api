const db = require("../config/railway-db.config");
const { compare, hash } = require("bcrypt");

// ── Device registration ───────────────────────────────────────────────────────

exports.registerDevice = (centerId, deviceId, centerName, callBack) => {
  // Try to claim this center_id for this device_id.
  // UNIQUE on both columns: fails with 409 if either is already bound elsewhere.
  db.query(
    `INSERT INTO device_registrations (device_id, center_id, center_name, last_seen_at)
     VALUES (?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE
       last_seen_at = IF(center_id = VALUES(center_id), NOW(), (SELECT 1 FROM (SELECT 1) t))`,
    [deviceId, centerId, centerName],
    (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") return callBack("CONFLICT");
        return callBack(error.message);
      }
      return callBack(null, "ok");
    }
  );
};

exports.checkDevice = (deviceId, callBack) => {
  db.query(
    `SELECT center_id, center_name, activated_at FROM device_registrations WHERE device_id = ?`,
    [deviceId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows[0] || null);
    }
  );
};

exports.touchDevice = (deviceId) => {
  db.query(`UPDATE device_registrations SET last_seen_at = NOW() WHERE device_id = ?`, [deviceId]);
};

// ── Classes ──────────────────────────────────────────────────────────────────

exports.getClasses = (centerId, callBack) => {
  db.query(
    `SELECT id AS ClassID, class_name AS ClassName, created_at FROM classes WHERE center_id = ? ORDER BY class_name`,
    [centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.createClass = (centerId, className, password, callBack) => {
  hash(password, 10, (err, hashed) => {
    if (err) return callBack(err.message);
    db.query(
      `INSERT INTO classes (center_id, class_name, password) VALUES (?, ?, ?)`,
      [centerId, className, hashed],
      (error, result) => {
        if (error) return callBack(error.message);
        return callBack(null, { ClassID: result.insertId, ClassName: className });
      }
    );
  });
};

exports.deleteClass = (classId, centerId, callBack) => {
  db.query(
    `DELETE FROM classes WHERE id = ? AND center_id = ?`,
    [classId, centerId],
    (error, result) => {
      if (error) return callBack(error.message);
      if (result.affectedRows < 1) return callBack("Class not found", null, 404);
      return callBack(null, "Class deleted");
    }
  );
};

exports.verifyClassPassword = (classId, centerId, password, callBack) => {
  db.query(
    `SELECT password FROM classes WHERE id = ? AND center_id = ?`,
    [classId, centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Class not found", null, 404);
      compare(password, rows[0].password, (err, match) => {
        if (err) return callBack(err.message);
        return callBack(null, match);
      });
    }
  );
};

// ── Class students ────────────────────────────────────────────────────────────

exports.getClassStudents = (classId, centerId, callBack) => {
  db.query(
    `SELECT cp.patient_id AS StudentID, cp.patient_name AS StudentName, cp.added_at
     FROM class_patients cp
     INNER JOIN classes c ON c.id = cp.class_id
     WHERE cp.class_id = ? AND c.center_id = ?
     ORDER BY cp.patient_name`,
    [classId, centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.addStudentToClass = (classId, centerId, patientId, patientName, callBack) => {
  // Verify class belongs to this center first
  db.query(
    `SELECT id FROM classes WHERE id = ? AND center_id = ?`,
    [classId, centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Class not found", null, 404);
      db.query(
        `INSERT IGNORE INTO class_patients (class_id, patient_id, patient_name) VALUES (?, ?, ?)`,
        [classId, patientId, patientName],
        (error2) => {
          if (error2) return callBack(error2.message);
          return callBack(null, "Student added");
        }
      );
    }
  );
};

exports.removeStudentFromClass = (classId, centerId, patientId, callBack) => {
  db.query(
    `DELETE cp FROM class_patients cp
     INNER JOIN classes c ON c.id = cp.class_id
     WHERE cp.class_id = ? AND c.center_id = ? AND cp.patient_id = ?`,
    [classId, centerId, patientId],
    (error, result) => {
      if (error) return callBack(error.message);
      if (result.affectedRows < 1) return callBack("Student not found in class", null, 404);
      return callBack(null, "Student removed");
    }
  );
};

// ── Activity logging ──────────────────────────────────────────────────────────

exports.logActivity = (payload, callBack) => {
  const {
    CenterID, PatientID, ClassID, SessionMode,
    EventType, X, Y, ScreenWidth, ScreenHeight,
    ScenarioID, CompletionPct, DurationMs, GameKey
  } = payload;

  db.query(
    `INSERT INTO blueroom_events
       (center_id, patient_id, class_id, session_mode, event_type,
        x, y, screen_width, screen_height, scenario_id,
        completion_pct, duration_ms, game_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [CenterID, PatientID || null, ClassID || null, SessionMode || "individual",
     EventType, X || null, Y || null, ScreenWidth || null, ScreenHeight || null,
     ScenarioID || null, CompletionPct || null, DurationMs || null, GameKey || null],
    (error, result) => {
      if (error) return callBack(error.message);
      return callBack(null, { id: result.insertId });
    }
  );
};

// ── Activity queries (for Blueroom dashboard) ─────────────────────────────────

exports.getActivitySummary = (centerId, filters, callBack) => {
  const { patientId, classId, from, to, limit = 500 } = filters;
  let where = "WHERE center_id = ?";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }
  params.push(parseInt(limit, 10));

  db.query(
    `SELECT id, patient_id, class_id, session_mode, event_type,
            x, y, screen_width, screen_height, scenario_id,
            completion_pct, duration_ms, game_key, ts
     FROM blueroom_events ${where}
     ORDER BY ts DESC LIMIT ?`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.getHeatmapData = (centerId, filters, callBack) => {
  const { patientId, classId, from, to } = filters;
  let where = "WHERE center_id = ? AND event_type = 'touch' AND x IS NOT NULL";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }

  db.query(
    `SELECT x, y, screen_width, screen_height FROM blueroom_events ${where} LIMIT 5000`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.getCompletionTimeSeries = (centerId, filters, callBack) => {
  const { patientId, classId, from, to } = filters;
  let where = "WHERE center_id = ? AND event_type = 'scenario_complete'";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }

  db.query(
    `SELECT scenario_id, game_key, patient_id, completion_pct, duration_ms, ts
     FROM blueroom_events ${where}
     ORDER BY ts ASC LIMIT 2000`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};
